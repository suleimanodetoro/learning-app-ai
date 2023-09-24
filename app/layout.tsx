import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Journey",
  description:
    "An app to automatically genrate a structured course for you with the aid of artifically intelligence, Suleiman Odetoro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* using shadcn styling tools, & lexend style from next font  */}
      <body
        className={cn(
          lexend.className,
          "antialiased min-h-screen pt-16" //pt-16 will be for navbar
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
