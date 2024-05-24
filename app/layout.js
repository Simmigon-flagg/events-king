import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar/Navbar"
import Footer from "../app/components/Footer/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { ThemeProvider } from '@/context/ThemeContext';
import { AttendeesProvider } from "../context/AttendeesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVENTS King",
  description: "Events King app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AttendeesProvider>
        <body className={inter.className} style={{display: "flex",flexDirection: "column"}}>
          <CssBaseline />
          <Navbar />
          <Container fixed style={{ fontSize: 30 }} sx={{  }} >
            {children}
          </Container>
          <Footer />
        </body>
        </AttendeesProvider>
      </ThemeProvider>
    </html>
  );
}
