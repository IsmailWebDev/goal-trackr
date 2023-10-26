import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanstackProvider from "./components/providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goal Tracker",
  description:
    "A dedicated web application designed to track and display player's goals and statistics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-main"}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
