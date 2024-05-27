import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Link from "next/link";


const title =
  "Ainime Platforms Starter Kit – The all-in-one starter kit for building your own anime.";
const description =
  "An easy to use, drag & drop site builder, with AI support. Built with ComfyUI, ComfyDeploy, and Noval - in Vercel.";
// const image = "https://vercel.pub/thumbnail.png";
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
    creator: "@vercel",
  },
  metadataBase: new URL("https://www.ainime.me/"),
};

// function Header() {
//   return (
//     <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
//     <button
   
//    className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
//  > Ainime </button>
//  <button
   
//    className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
//  > 
//    <SignedIn>
//        {/* Mount the UserButton component */}
//        <UserButton />
//      </SignedIn>
//      <SignedOut>
//        {/* Signed out users get sign in button */}
//        <SignInButton/>
//      </SignedOut>
//      </button>
     
//    </header>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      
    <ClerkProvider>
    {/* <Header /> */}
    <body className={cn(cal.variable, inter.variable)}>
      <Providers>
        {children}
        <Analytics />
      </Providers>
      </body>
    </ClerkProvider>
    </html>
    
  //   <ClerkProvider>
  //   <html lang='en' suppressHydrationWarning>
  //     <body className={cn(cal.variable, inter.variable)}>
  //       <SignedOut>
  //         <SignInButton />
  //       </SignedOut>
  //       <SignedIn>
  //         <UserButton />
  //       </SignedIn>
  //       {children}
  //       <Analytics />
  //     </body>
  //   </html>
  // </ClerkProvider>


  );
  


}
