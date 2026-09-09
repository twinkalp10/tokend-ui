'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/auth/password-input';
import { cn } from '@/lib/utils';

/* ── Social SVG Icons ── */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [fullName, setFullName] = React.useState('');
  const [nameTouched, setNameTouched] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const [inviteCode, setInviteCode] = React.useState('');
  const [showCodeHelp, setShowCodeHelp] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] =
    React.useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = React.useState(false);

  /* Validation */
  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const nameError =
    nameTouched && fullName.trim().length === 0 ? 'Full name is required' : '';
  const emailError =
    emailTouched && email.trim().length > 0 && !isEmailValid
      ? 'Please enter a valid email address (e.g. name@college.edu)'
      : emailTouched && email.trim().length === 0
        ? 'Email address is required'
        : '';
  const passwordError =
    passwordTouched && password.length === 0
      ? 'Password is required'
      : passwordTouched && password.length < 6
        ? 'Password must be at least 6 characters'
        : '';

  const isStep1Valid =
    fullName.trim().length > 0 &&
    isEmailValid &&
    password.length >= 6;

  /* Form submission — handles Enter key navigation automatically */
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!isStep1Valid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 450);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  const handleJoinWaitlist = () => {
    setIsWaitlistSubmitting(true);
    setTimeout(() => {
      setIsWaitlistSubmitting(false);
      setWaitlistSuccess(true);
    }, 600);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
          {step === 1 ? 'Create your account' : 'Almost there!'}
        </h2>
        <p className="text-sm text-[var(--text-sub)]">
          {step === 1
            ? 'Start building, start sharing.'
            : 'Enter your invitation code to join a workspace.'}
        </p>
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Social login buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 h-10 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-1)] hover:bg-[var(--surface-sunken)] flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-strong)] transition-all cursor-pointer hover:border-[var(--neutral-300)]"
              >
                <GoogleIcon className="size-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex-1 h-10 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-1)] hover:bg-[var(--surface-sunken)] flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-strong)] transition-all cursor-pointer hover:border-[var(--neutral-300)]"
              >
                <GitHubIcon className="size-4" />
                <span>GitHub</span>
              </button>
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--surface-border)]" />
              <span className="text-[11px] font-medium text-[var(--text-soft)] uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-[var(--surface-border)]" />
            </div>

            {/* Email/password form — Keyboard Enter advances to Step 2 */}
            <form onSubmit={handleSignUp} className="space-y-5.5">
              {/* Full name */}
              <div className="relative">
                <label
                  htmlFor="register-name"
                  className="text-xs font-medium text-[var(--text-strong)] block mb-1.5"
                >
                  Full name
                </label>
                <Input
                  id="register-name"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (!nameTouched) setNameTouched(true);
                  }}
                  onBlur={() => setNameTouched(true)}
                  className={cn(
                    'h-10 rounded-xl',
                    nameError &&
                      'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100',
                  )}
                  autoComplete="name"
                />
                <AnimatePresence>
                  {nameError && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.15 }}
                      id="name-error"
                      className="absolute left-3 top-[calc(100%+4px)] text-[11px] text-red-500 font-medium leading-none pointer-events-none"
                    >
                      {nameError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email with Instant Client-side Validation & Zero Layout Shift */}
              <div className="relative">
                <label
                  htmlFor="register-email"
                  className="text-xs font-medium text-[var(--text-strong)] block mb-1.5"
                >
                  Email address
                </label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@college.edu"
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
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={
                    emailError ? 'email-error' : undefined
                  }
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.15 }}
                      id="email-error"
                      className="absolute left-3 top-[calc(100%+4px)] text-[11px] text-red-500 font-medium leading-none pointer-events-none"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="register-password"
                  className="text-xs font-medium text-[var(--text-strong)] block mb-1.5"
                >
                  Password
                </label>
                <PasswordInput
                  id="register-password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!passwordTouched) setPasswordTouched(true);
                  }}
                  onBlur={() => setPasswordTouched(true)}
                  showStrength
                  autoComplete="new-password"
                  className={cn(
                    passwordError &&
                      'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100',
                  )}
                />
                <AnimatePresence>
                  {passwordError && password.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.15 }}
                      id="register-password-error"
                      className="absolute left-3 top-[calc(100%+4px)] text-[11px] text-red-500 font-medium leading-none pointer-events-none"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign up button — Always enabled, validates on click */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-11 text-sm rounded-xl cursor-pointer"
                loading={isSubmitting}
              >
                Sign up
              </Button>
            </form>

            {/* Sign in link */}
            <p className="text-center text-xs text-[var(--text-sub)] pt-1">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-[var(--text-strong)] hover:text-[var(--primary-600)] transition-colors underline underline-offset-2"
              >
                Login
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Back link */}
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setWaitlistSuccess(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-sub)] hover:text-[var(--text-strong)] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to details
            </button>

            {/* User summary pill */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--surface-border-subtle)]">
              <div className="flex items-center justify-center size-9 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] shrink-0 font-bold text-xs">
                {fullName.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--text-strong)] truncate">
                  {fullName}
                </p>
                <p className="text-[11px] text-[var(--text-soft)] truncate">
                  {email}
                </p>
              </div>
            </div>

            {waitlistSuccess ? (
              /* Waitlist Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-xl bg-[var(--primary-100)]/60 border border-[var(--primary-200)] text-center space-y-3"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-[var(--primary-600)] text-white mx-auto shadow-sm">
                  <CheckCircle2 className="size-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[var(--text-strong)]">
                    You&apos;re on the waitlist!
                  </h3>
                  <p className="text-xs text-[var(--text-sub)] max-w-xs mx-auto leading-relaxed">
                    We reserved a spot for{' '}
                    <strong className="text-[var(--text-strong)] font-semibold">
                      {email}
                    </strong>
                    . We&apos;ll email your workspace invite code as
                    soon as a seat opens.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWaitlistSuccess(false)}
                  className="text-xs font-semibold text-[var(--primary-600)] hover:text-[var(--primary-700)] hover:underline pt-1 cursor-pointer block mx-auto"
                >
                  I have an invitation code now
                </button>
              </motion.div>
            ) : (
              /* Step 2 Form with Enter key navigation */
              <form onSubmit={handleContinue} className="space-y-4">
                {/* Invitation code */}
                <div>
                  <label
                    htmlFor="register-invite"
                    className="text-xs font-medium text-[var(--text-strong)] block mb-1.5"
                  >
                    Invitation code
                  </label>
                  <Input
                    id="register-invite"
                    placeholder="Paste your invitation code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="h-10 rounded-xl"
                    autoFocus
                  />
                </div>

                {/* How to get a code toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowCodeHelp(!showCodeHelp)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary-600)] hover:text-[var(--primary-700)] transition-colors cursor-pointer"
                  >
                    <HelpCircle className="size-3.5" />
                    How to get a code?
                  </button>

                  <AnimatePresence>
                    {showCodeHelp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--surface-border-subtle)] text-xs text-[var(--text-sub)] leading-relaxed"
                      >
                        Invitation codes are provided by participating
                        colleges, bootcamps, and partner instructors.
                        If you don&apos;t have one yet, click{' '}
                        <strong className="text-[var(--text-strong)]">
                          &ldquo;Join Waitlist&rdquo;
                        </strong>{' '}
                        below!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary Continue button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-11 text-sm rounded-xl"
                  disabled={!inviteCode.trim()}
                  loading={isSubmitting}
                  iconRight={
                    !isSubmitting ? (
                      <ArrowRight className="size-4" />
                    ) : undefined
                  }
                >
                  Continue to onboarding
                </Button>

                {/* Divider */}
                <div className="relative flex items-center justify-center pt-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--surface-border-subtle)]" />
                  </div>
                  <span className="relative px-2 text-[10px] uppercase font-medium text-[var(--text-soft)] bg-[var(--surface-0)]">
                    Don&apos;t have a code?
                  </span>
                </div>

                {/* Secondary CTA: Join Waitlist */}
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  icon={
                    <Sparkles className="size-4 text-[var(--primary-600)]" />
                  }
                  onClick={handleJoinWaitlist}
                  loading={isWaitlistSubmitting}
                  className="w-full h-10 rounded-xl bg-[var(--surface-1)] hover:bg-[var(--surface-sunken)] hover:border-[var(--neutral-300)] text-xs font-medium text-[var(--text-strong)] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  Join Waitlist with this Email
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
