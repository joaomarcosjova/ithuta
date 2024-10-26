import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Route matchers for specific paths
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isPublicRoute = createRouteMatcher(['/', '/buttons']);

// Main Clerk middleware with custom route protection
export default clerkMiddleware(
  (auth, req) => {
    if (isPublicRoute(req)) return; // Public routes require no auth

    if (isAdminRoute(req)) {
      // Restrict admin route to users with 'org:admin' role
      auth().protect({ role: 'org:admin' });
    } else {
      auth().protect(); // Require auth for all other routes
    }
  },
  { debug: process.env.NODE_ENV !== 'production' }
);

// Configuration for matching routes where middleware is applied
export const config = {
  matcher: [
    // Run middleware on all routes except static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',                     // Root path
    '/(api|trpc)(.*)',       // API and TRPC routes
  ],
};
