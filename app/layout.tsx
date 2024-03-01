import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { dark } from "@clerk/themes";
import {Toaster} from "sonner";

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
          <Toaster theme="light" position="bottom-center" />
            
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
