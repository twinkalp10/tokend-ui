import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "neutral" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[var(--primary-100)] text-[var(--primary-700)] border-[var(--primary-200)]",
    neutral: "bg-[var(--surface-sunken)] text-[var(--text-sub)] border-[var(--surface-border)]",
    warning: "bg-[#fbf1dc] text-[#8a6217] border-[#ebd39a]",
    danger: "bg-[#fce5e2] text-[#8c1f19] border-[#f2b8b3]",
    outline: "bg-transparent text-[var(--text-strong)] border-[var(--surface-border)]",
  }[variant];

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full border transition-colors",
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full shrink-0",
            variant === "primary" && "bg-[var(--primary-600)] animate-pulse",
            variant === "neutral" && "bg-[#93908a]",
            variant === "warning" && "bg-[#d9a441]",
            variant === "danger" && "bg-[#d8392f]"
          )}
        />
      )}
      {children}
    </div>
  );
}
