import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar/Navbar"
import Footer from "../app/components/Footer/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVENTS King",
  description: "Events King app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <CssBaseline />
          <Navbar />
          <Container fixed style={{ fontSize: 30 }} sx={{ height: "100vh" }} >
            {children}
          </Container>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
