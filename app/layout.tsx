import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { dark } from "@clerk/themes";
// import {Toaster} from "sonner";
import toast, { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Streamify",
  description: "A streaming platform for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="streamify-theme"
          >
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              toastOptions={{
                loading: {
                  style: {
                    // width: "80%",
                    maxWidth: "400px",
                    margin: "0 auto",
                  },
                },
                success: {
                  style: {
                    // width: "80%",
                    maxWidth: "400px",
                    margin: "0 auto",
                  },
                },
                error: {
                  style: {
                    // width: "80%",
                    maxWidth: "400px",
                    margin: "0 auto",
                  },
                },
              }}
            />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
