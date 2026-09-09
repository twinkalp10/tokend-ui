'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/auth/password-input';
import { cn } from '@/lib/utils';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail =
    searchParams.get('email') || 'alex@example.com';

  const [email] = React.useState(initialEmail);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmTouched, setConfirmTouched] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Mismatch error check
  const isMismatch =
    confirmTouched &&
    confirmPassword.length > 0 &&
    newPassword !== confirmPassword;

  const isFormValid =
    newPassword.length >= 6 &&
    confirmPassword.length >= 6 &&
    newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmTouched(true);
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/auth/login');
    }, 1800);
  };

  return (
    <div className="w-full space-y-5">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="reset-form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                Set new password
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                Choose a strong password for your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5.5"
            >
              {/* Email Address (Autofilled / Read-only) */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-strong)] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  tabIndex={-1}
                  className="flex h-10 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-sunken)] px-3.5 py-2 text-sm text-[var(--text-sub)] cursor-not-allowed opacity-80 shadow-xs focus:outline-none select-none"
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-xs font-medium text-[var(--text-strong)] mb-1.5"
                >
                  New password
                </label>
                <PasswordInput
                  id="new-password"
                  placeholder="Enter new password (min. 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showStrength
                  autoFocus
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirm-password"
                  className="block text-xs font-medium text-[var(--text-strong)] mb-1.5"
                >
                  Confirm password
                </label>
                <PasswordInput
                  id="confirm-password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (!confirmTouched) setConfirmTouched(true);
                  }}
                  onBlur={() => setConfirmTouched(true)}
                  className={cn(
                    isMismatch &&
                      'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100',
                  )}
                  autoComplete="new-password"
                  aria-invalid={isMismatch}
                />
                {/* Zero Layout Shift Error */}
                <AnimatePresence>
                  {isMismatch && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-3 top-[calc(100%+4px)] text-[11px] text-red-500 font-medium leading-none pointer-events-none"
                    >
                      Passwords do not match
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset Password Button — Always enabled, validates on click */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 rounded-xl bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-medium text-sm transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="size-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Updating password...</span>
                  </>
                ) : (
                  <span>Reset password</span>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          /* ── SUCCESS STATE ── */
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 text-center py-4"
          >
            <div className="size-12 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] flex items-center justify-center border border-[var(--primary-200)] mx-auto">
              <CheckCircle2 className="size-6" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                Password reset successful!
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                Your password has been securely updated. Redirecting
                you to login...
              </p>
            </div>

            <Button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="w-full h-10 rounded-xl bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-medium text-sm transition-all cursor-pointer shadow-xs"
            >
              Go to login
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full space-y-4 animate-pulse">
          <div className="h-4 w-24 bg-[var(--surface-sunken)] rounded" />
          <div className="h-8 w-48 bg-[var(--surface-sunken)] rounded" />
          <div className="h-10 w-full bg-[var(--surface-sunken)] rounded-xl" />
          <div className="h-10 w-full bg-[var(--surface-sunken)] rounded-xl" />
        </div>
      }
    >
      <ResetPasswordForm />
    </React.Suspense>
  );
}
