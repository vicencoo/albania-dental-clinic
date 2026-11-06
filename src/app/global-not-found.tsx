import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 | Albania Dental Clinic",
  robots: { index: false },
};

/** Used for URLs that match no route at all (outside a locale). */
export default function GlobalNotFound() {
  return (
    <html lang="sq" className={fontVariables}>
      <body className="flex min-h-screen items-center justify-center bg-brand-porcelain p-6 text-center">
        <main>
          <h1 className="font-heading text-4xl">404</h1>
          <p className="mt-4">Faqja nuk u gjet · Pagina non trovata · Page not found</p>
          <p className="mt-6 font-label text-sm tracking-widest">
            <Link href="/al">AL</Link> · <Link href="/it">IT</Link> · <Link href="/en">EN</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
