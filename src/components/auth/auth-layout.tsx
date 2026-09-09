'use client';

import * as React from 'react';
import { BookOpen, Code2, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const features = [
  {
    num: '01',
    icon: BookOpen,
    title: 'Learn with purpose',
    desc: 'Short lessons. Clear outcomes.',
  },
  {
    num: '02',
    icon: Code2,
    title: 'Build something real',
    desc: 'Your code, your preview, your decisions.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Show your work',
    desc: 'Evidence and feedback, not just a score.',
  },
];

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isFocusedAuth =
    pathname === '/auth/login' ||
    pathname?.startsWith('/auth/forgot-password') ||
    pathname?.startsWith('/auth/recover') ||
    pathname?.startsWith('/auth/reset-password') ||
    pathname?.startsWith('/reset-password');

  return (
    <div className="relative flex h-screen overflow-hidden bg-[var(--surface-0)]">
      {/* ── Main / Form Panel ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Form Content — Stable Optical Alignment (eliminates vertical jumping between steps) */}
        <div
          className={cn(
            "flex-1 flex justify-center px-8 overflow-y-auto",
            isFocusedAuth
              ? "pt-[14vh] md:pt-[16vh] pb-12"
              : "items-center py-6"
          )}
        >
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>

      {/* ── Right: Info / Hero Panel (Solid Deep Brand Green, no gradient) ── */}
      {!isFocusedAuth && (
        <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] flex-col p-10 xl:p-14 relative overflow-hidden bg-[var(--primary-700)] border-l border-[var(--primary-800)]/40 text-white">
          {/* Top: Tagline */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-white">
                TOKEND
              </span>
              <span className="text-xs text-emerald-200/80">
                Proof you can build
              </span>
            </div>
          </div>

          {/* Center: Hero Content */}
          <div className="relative z-10 space-y-8 my-auto">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] text-emerald-300 uppercase mb-5">
                Learn. Build. Prove.
              </p>
              <h1 className="text-3xl xl:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.1]">
                Turn what you learn
                <br />
                into what you build.
              </h1>
            </div>

            <p className="text-sm text-emerald-100/85 max-w-md leading-relaxed">
              One workspace for your courses, engineering assessments,
              and the projects that prove your skills.
            </p>

            {/* Feature List */}
            <div className="space-y-5 pt-2">
              {features.map((f) => (
                <div
                  key={f.num}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex items-center justify-center size-10 rounded-xl bg-white/10 text-emerald-300 border border-white/15 shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:bg-white/15">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300/70 block mb-0.5">
                      {f.num}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {f.title}
                    </h3>
                    <p className="text-xs text-emerald-100/75 mt-0.5">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
