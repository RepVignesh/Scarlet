"use client";

import { useState, useRef, KeyboardEvent, FormEvent } from "react";
import { Link2, ArrowUpRight } from "lucide-react";
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
          <Link2 size={16} strokeWidth={1.4} />
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
          <ArrowUpRight size={16} strokeWidth={1.4} />
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
