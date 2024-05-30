export { default } from "next-auth/middleware"
export const config = {
    // Add paths that require login
    matcher: ["/events/:path*", "/topics/:path*","/products/:path*"]
}