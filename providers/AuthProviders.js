"use client"
import { SessionProvider } from "next-auth/react"

export const AuthProvider = ({ childern }) => {
    return <SessionProvider>{childern}</SessionProvider>
}