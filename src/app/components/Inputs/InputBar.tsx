"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";
import styles from "./InputBar.module.css";
import type { UrlInputBarProps } from "./InputBar.types";

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

function isLikelyUrl(value: string): boolean {
  if (!value.trim()) return false;
  try {
    const url = new URL(normalizeUrl(value));
    return Boolean(url.hostname && url.hostname.includes("."));
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

  const valid = isLikelyUrl(value);
  const showError = touched && value.trim().length > 0 && !valid;

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    if (disabled) return;

    if (!valid) {
      setTouched(true);
      return;
    }

    onSubmit(normalizeUrl(value));
    setValue("");
    setTouched(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit} aria-label="Send a URL">
      <div
        className={styles.bar}
        data-invalid={showError || undefined}
        data-disabled={disabled || undefined}
      >
        <span className={styles.linkIcon} aria-hidden="true">
          <Link2 size={16} strokeWidth={1.5} />
        </span>

        <input
          ref={inputRef}
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            setValue(event.target.value);
            if (touched) setTouched(false);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          aria-describedby={showError ? "url-input-error" : undefined}
        />

        <button
          type="submit"
          className={styles.sendButton}
          disabled={disabled}
          aria-label="Send URL"
        >
          <ArrowUpRight size={16} strokeWidth={1.5} />
          <span className={styles.sendLabel}>{disabled ? "Loading" : "Scan"}</span>
        </button>
      </div>

      {showError && (
        <span id="url-input-error" className={styles.errorText} role="alert">
          Enter a valid domain, for example example.com
        </span>
      )}
    </form>
  );
}
