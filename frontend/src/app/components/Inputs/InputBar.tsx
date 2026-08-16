"use client";

import { useState, useRef, KeyboardEvent, FormEvent } from "react";
import styles from "./InputBar.module.css";
import { UrlInputBarProps } from "./InputBar.types";

function isLikelyUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const url = new URL(withProtocol);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function InputBar({
  onSubmit,
  placeholder = "Paste a URL...",
  disabled = false,
}: UrlInputBarProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedValue = value.trim();
  const valid = isLikelyUrl(trimmedValue);
  const showError = touched && trimmedValue.length > 0 && !valid;

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!valid || disabled) {
      setTouched(true);
      return;
    }
    const normalized = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmedValue)
      ? trimmedValue
      : `https://${trimmedValue}`;
    onSubmit(normalized);
    setValue("");
    setTouched(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit}
      aria-label="Send a URL"
    >
      <div
        className={styles.bar}
        data-invalid={showError || undefined}
        data-disabled={disabled || undefined}
      >
        <span className={styles.linkIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6.5 9.5L9.5 6.5M6.75 4.25L7.4 3.6C8.508 2.492 10.302 2.492 11.41 3.6C12.518 4.708 12.518 6.502 11.41 7.61L10.76 8.26M9.25 11.75L8.6 12.4C7.492 13.508 5.698 13.508 4.59 12.4C3.482 11.292 3.482 9.498 4.59 8.39L5.24 7.74"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          inputMode="url"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          aria-describedby={showError ? "url-input-error" : undefined}
        />

        <button
          type="submit"
          className={styles.sendButton}
          disabled={disabled || !valid}
          aria-label="Send URL"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 2.5L2.5 6.75L7.25 8.75M13.5 2.5L9.25 13.5L7.25 8.75M13.5 2.5L7.25 8.75"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.sendLabel}>Send</span>
        </button>
      </div>

      {showError && (
        <span id="url-input-error" className={styles.errorText} role="alert">
          Enter a valid URL, like example.com/page
        </span>
      )}
    </form>
  );
}
