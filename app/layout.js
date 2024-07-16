import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer2 from "./components/Footer/Footer2";
import UsersContextProvider from "@/context/UsersContext";
import AllUsersContextProvider from "@/context/AllUsersContext";
import AllEventsContextProvider from "@/context/AllEvents";
import AllTopicsContextProvider from "@/context/AllTopics";
import SpeakersContextProvider from "@/context/SpeakersContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVENTS King",
  description: "Events King app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <UsersContextProvider>
          <AllUsersContextProvider>
            <AllEventsContextProvider>
              <AllTopicsContextProvider>
                <SpeakersContextProvider>

                  <body className={inter.className} style={{ display: "flex", flexDirection: "column", gap: 100 }}>
                    <CssBaseline />
                    {/* <Navbar /> */}
                    {children}
                    {/* <Footer2 /> */}

                  </body>

                </SpeakersContextProvider>
              </AllTopicsContextProvider>
            </AllEventsContextProvider>
          </AllUsersContextProvider>
        </UsersContextProvider>
      </ThemeProvider>
    </html>
  );
}
