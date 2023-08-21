import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { marketingConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Replicate - Playground",
  description: "Replicate examples playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="flex min-h-screen flex-col">
          <header className="container z-40 bg-background border-b">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={marketingConfig.mainNav} />
              <nav>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            <section className="space-y-6 py-10">
              <div className="container gap-4">{children}</div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
