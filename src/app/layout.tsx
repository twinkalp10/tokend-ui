import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shell/theme-provider";

export const metadata: Metadata = {
  title: "TOKEND · Proof you can build",
  description: "One workspace for your courses, engineering assessments, and the projects that prove your skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--surface-0)] text-[var(--text-strong)] antialiased transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
