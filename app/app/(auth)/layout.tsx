import { Metadata } from "next";
import { ReactNode } from "react";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: "Login | ainime: Platform to create your own manga & anime",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>


  //   <ClerkProvider>
  //   <div className="flex m
  //   in-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
  //     <body>
  //       {children}
  //       <main>
  //         {children}
  //       </main>
  //     </body>      
  //   </div>
  //   </ClerkProvider>
  );
}
