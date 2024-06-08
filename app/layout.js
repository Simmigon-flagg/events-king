import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { ThemeProvider } from '@/context/ThemeContext';
import { AttendeesProvider } from "../context/AttendeesContext";
import { TopicsProvider } from "@/context/TopicsContext";
import { getSession } from "next-auth/react";


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
                 

            {/* <TopicsProvider> */}
              {/* <AttendeesProvider> */}
                
                  {children}
                
              {/* </AttendeesProvider> */}
            {/* </TopicsProvider> */}
            

            <Footer />
    
        </body>
      </ThemeProvider>
    </html>
  );
}
