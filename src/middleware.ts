import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  locales,
  defaultLocale: "ru",
});

export const config = {
  matcher: ["/((?!swagger|api|_next|_vercel|.*\\..*).*)"],
};
