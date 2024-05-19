import { Metadata } from "next";
import { ReactNode } from "react";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: "Login | ainime Platforms Starter Kit",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
    <div className="flex m
    in-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <body>
         
          <main>
            {children}
          </main>
        </body>
      {/* {children} */}
    </div>
    </ClerkProvider>
  );
}
