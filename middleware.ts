import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/api/users(.*)', '/api/applications(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:js|css|json|ico|png|jpg|webp|svg|woff|woff2)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}