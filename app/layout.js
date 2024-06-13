import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import CssBaseline from '@mui/material/CssBaseline';
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

        <body className={inter.className} style={{ display: "flex", flexDirection: "column" }}>
          <CssBaseline />
            <Navbar />                
                  {children}                      
            <Footer />
  
        </body>
      </ThemeProvider>
    </html>
  );
}
