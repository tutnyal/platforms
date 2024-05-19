import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
// import { ClerkProvider } from '@clerk/nextjs'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const title =
  "Ainime Platforms Starter Kit – Make Animated Videos with AI for Free.";
const description =
  "AInimate is an online AI animation generator and video maker that brings studio quality video content within everyone's reach. Animated Videos, Done Right!";
const image = "";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://www.ainime.io/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@KingNyalTut",
  },
  metadataBase: new URL("https://www.ainime.io/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <Providers>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        
          <main>
          {children}
          <Analytics />
          </main>    
          
        
        
          {/* {children}
          <Analytics /> */}
        
      </body>
    </html>
    </Providers>
    
  );
}
