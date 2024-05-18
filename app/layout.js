import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar/Navbar"
import Hero from "../app/components/Hero/Hero"
import Footer from "../app/components/Footer/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "USANA EVENTS",
  description: "Events App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <Navbar />
        <Hero />
        <Container fixed style={{ fontSize: 30 }} sx={{ height: "100vh" }} >
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
