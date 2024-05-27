import { clerkMiddleware, createRouteMatcher, currentUser} from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import { RedirectToSignIn } from '@clerk/nextjs';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};


// export default authMiddleware({
export default clerkMiddleware((auth, req) => {

  //We want these pages to require login
  // const isProtectedRoute = createRouteMatcher([
  //   '/app(.*)'
  // ]);

  // if (isProtectedRoute(req)) auth().protect();  
  const url = req.nextUrl;

  
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log('req.header:', req.headers.get("host")!);

  // special case for Vercel preview deployment URLs
  if (hostname.includes("---") && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  console.log('hostanme:', hostname);

  // rewrites for app pages
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = auth();
    
    if (!userId && path !== "/login") {
      // const prefix = process.env.NODE_ENV === "development" ? "http://" : "https://";
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (userId && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
  }

  // special case for `vercel.pub` domain
  if (hostname === "ainime.me") {
    return NextResponse.redirect(
      "/home",
    );
  }
  // https://vercel.com/blog/platforms-starter-kit
  
  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN 
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  if (
    hostname === "www.ainime.me" ||"ainime.me" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}