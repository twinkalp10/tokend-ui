'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getInboxInfo(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  if (
    domain.includes('gmail.com') ||
    domain.includes('googlemail.com')
  ) {
    return { name: 'Open Gmail', url: 'https://mail.google.com' };
  }
  if (
    domain.includes('outlook.com') ||
    domain.includes('hotmail.com') ||
    domain.includes('live.com')
  ) {
    return { name: 'Open Outlook', url: 'https://outlook.live.com' };
  }
  if (domain.includes('yahoo.com')) {
    return { name: 'Open Yahoo Mail', url: 'https://mail.yahoo.com' };
  }
  if (domain.includes('icloud.com')) {
    return {
      name: 'Open iCloud Mail',
      url: 'https://www.icloud.com/mail',
    };
  }
  return { name: 'Open mail app', url: `mailto:${email}` };
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [linkSent, setLinkSent] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  // Email format validation (instant client-side)
  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const emailError =
    emailTouched && email.trim().length > 0 && !isEmailValid
      ? 'Please enter a valid email address (e.g. name@college.edu)'
      : emailTouched && email.trim().length === 0
        ? 'Email address is required'
        : '';

  // Resend cooldown timer
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(
      () => setResendCooldown((prev) => prev - 1),
      1000,
    );
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!isEmailValid || isSending) return;

    setIsSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSending(false);
    setLinkSent(true);
    setResendCooldown(30);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
  };

  const inbox = getInboxInfo(email);

  return (
    <div className="w-full space-y-5">
      {/* ── Top Navigation: Back to login Icon above Email Address ── */}
      <div>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-sub)] hover:text-[var(--text-strong)] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to login</span>
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {!linkSent ? (
          /* ── STEP 1: Enter Email & Send Reset Link ── */
          <motion.div
            key="request-form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                Reset password
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                Enter your email and we’ll send you a reset link.
              </p>
            </div>

            <form
              onSubmit={handleSendLink}
              noValidate
              className="space-y-5.5"
            >
              {/* Email Address */}
              <div className="relative">
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-medium text-[var(--text-strong)] mb-1.5"
                >
                  Email address
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  onBlur={() => setEmailTouched(true)}
                  className={cn(
                    'h-10 rounded-xl',
                    emailError &&
                      'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100',
                  )}
                  autoComplete="email"
                  autoFocus
                  aria-invalid={Boolean(emailError)}
                />
                {/* Zero Layout Shift Error */}
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-3 top-[calc(100%+4px)] text-[11px] text-red-500 font-medium leading-none pointer-events-none"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Send Reset Link Button — Always enabled, validates on click */}
              <Button
                type="submit"
                disabled={isSending}
                className="w-full h-10 rounded-xl bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-medium text-sm transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {isSending ? (
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
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <span>Send reset link</span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          /* ── STEP 2: Link Sent Confirmation + Email Shortcut ── */
          <motion.div
            key="sent-confirmation"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Success Badge & Header */}
            <div className="space-y-2 text-center">
              <div className="size-11 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] flex items-center justify-center border border-[var(--primary-200)] mb-1 mx-auto">
                <Mail className="size-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
                Check your email
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                We&apos;ve sent a password reset link to{' '}
                <span className="font-semibold text-[var(--text-strong)]">
                  {email}
                </span>
                .
              </p>
            </div>

            {/* Email Inbox Shortcut Button */}
            <div className="space-y-3">
              <a
                href={inbox.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-1)] hover:bg-[var(--surface-sunken)] text-sm font-medium text-[var(--text-strong)] transition-all cursor-pointer shadow-xs"
              >
                <ExternalLink className="size-4 text-[var(--text-sub)]" />
                <span>{inbox.name}</span>
              </a>
            </div>

            {/* Resend Action with countdown */}
            <div className="text-center text-xs text-[var(--text-sub)] pt-1">
              Didn&apos;t receive the email?{' '}
              {resendCooldown > 0 ? (
                <span className="text-[var(--text-soft)] font-medium">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[var(--primary-600)] font-medium hover:underline cursor-pointer"
                >
                  Click to resend
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
