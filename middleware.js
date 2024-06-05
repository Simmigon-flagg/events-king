export { default } from "next-auth/middleware"
export const config = {
    // Add paths that require login
    matcher: ["/eventDetails/:path*","/topicDetails/:path*","/events/:path*", "/topics/:path*","/products/:path*"]
}