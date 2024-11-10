import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard/(.*)",
  "/api/payment/(.*)",
  "/payment/(.*)",
  "!/auth/sign-in(.*)"  // Exclude sign-in route and its children
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
   
    // @ts-expect-error // TODO: check this
    auth().protect(); 
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
