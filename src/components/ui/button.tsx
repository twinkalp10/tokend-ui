import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ink" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      loading = false,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-3.5 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5 font-medium",
    }[size];

    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
      ink: "btn-ink",
      danger: "btn-danger",
    }[variant];

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "btn-face font-sans font-medium",
          sizeClasses,
          variantClasses,
          loading && "cursor-wait opacity-80",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin shrink-0" />
        ) : (
          icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>
        )}
        {children && <span className="inline-flex items-center gap-1.5">{children}</span>}
        {!loading && iconRight && (
          <span className="shrink-0 flex items-center justify-center">{iconRight}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
