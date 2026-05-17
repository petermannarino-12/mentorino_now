import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/programs", 
    "/faq",
    "/apply",
    "/auth(.*)",
    "/reset-password",
    "/api/webhooks/(.*)",
    "/api/applications",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};