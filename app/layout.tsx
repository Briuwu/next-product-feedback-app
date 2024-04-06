import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/nav/navbar";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App",
  description: "A product feedback app built with Next.js, Clerk and NeonDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Navbar />
          <main className="">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
