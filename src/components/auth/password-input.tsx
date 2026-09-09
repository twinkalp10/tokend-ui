"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

function getStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrength?: boolean;
}

export function PasswordInput({
  className,
  showStrength = false,
  value,
  onChange,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");

  const currentValue = (value as string) ?? internalValue;
  const strength = getStrength(currentValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const isStrong = currentValue.length >= 6 && strength >= 3;

  return (
    <div className="w-full space-y-1.5">
      <div className="relative flex items-center w-full">
        <input
          type={visible ? "text" : "password"}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "flex h-10 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-1)] px-3.5 pr-10 py-2 text-sm text-[var(--text-strong)] shadow-xs transition-all duration-200 placeholder:text-[var(--text-soft)] focus-visible:outline-none focus-visible:border-[var(--primary-600)] focus-visible:ring-2 focus-visible:ring-[var(--primary-100)] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 text-[var(--text-soft)] hover:text-[var(--text-body)] transition-colors cursor-pointer p-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-600)]"
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      {showStrength && currentValue.length > 0 && (
        <div className="px-0.5 pt-0.5">
          {currentValue.length < 6 ? (
            <p className="text-[11px] text-red-500 font-medium leading-none">
              Password must be at least 6 characters
            </p>
          ) : !isStrong ? (
            <p className="text-[11px] text-red-500 font-medium leading-none">
              Password is weak
            </p>
          ) : (
            <p className="text-[11px] text-[var(--primary-600)] font-medium leading-none">
              Password is strong
            </p>
          )}
        </div>
      )}
    </div>
  );
}
