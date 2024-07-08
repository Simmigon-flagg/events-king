export { default } from "next-auth/middleware"
export const config = {
    // Add paths that require login
    matcher: ["/registration/:path*","/eventDetails/:path*","/topicDetails/:path*","/events/:path*", "/topics/:path*","/products/:path*"]
}