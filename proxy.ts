import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = ["/dashboard", "/profile", "/mytransaction"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
