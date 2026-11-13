import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { isKnownPath } from "./content/routes";
import { localePrefix, routing, type AppLocale } from "./i18n/routing";

// Next.js 16: "middleware" is now called "proxy".
const handleI18nRouting = createMiddleware(routing);

/** Internal path that no route matches → handled by [locale]/[...rest] → 404. */
const NOT_FOUND_SEGMENT = "__not-found";

function parseLocale(pathname: string): { locale: AppLocale; rest: string[] } | null {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  const locale = routing.locales.find((l) => localePrefix(l) === `/${first}`);
  return locale ? { locale, rest } : null;
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [first, ...restSegments] = pathname.split("/").filter(Boolean);

  // "/sq/..." is not a public prefix (Albanian is served under "/al").
  if (first === "sq") {
    return NextResponse.redirect(new URL(`/al/${restSegments.join("/")}${search}`, request.url), 308);
  }

  const parsed = parseLocale(pathname);
  if (parsed) {
    const { locale, rest } = parsed;
    const prefix = localePrefix(locale);

    // The lead doctor has a dedicated page.
    if (rest.join("/") === "clinic/team/dr-donela-dede") {
      return NextResponse.redirect(new URL(`${prefix}/clinic/dr-donela-dede`, request.url), 308);
    }

    // Internal route segment is the locale code ("sq"), not the public prefix ("/al").
    if (!isKnownPath(rest)) {
      return NextResponse.rewrite(new URL(`/${locale}/${NOT_FOUND_SEGMENT}`, request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Everything except API routes, Next internals, metadata files and static files.
  matcher: "/((?!api|_next|_vercel|sitemap.xml|robots.txt|.*\\..*).*)",
};
