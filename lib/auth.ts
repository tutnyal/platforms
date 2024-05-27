// import { getServerSession, type NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
// Get the userId from auth() -- if null, the user is not signed in
// const user = await currentUser()

// if (!user) {
//   redirect("/login");
// }
// export const authOptions = {
//   user: {
//     id: user.id,
//       name: user.fullName || user.username,
//       username: user.username,
//       email: user.emailAddresses[0]?.emailAddress,
//       image: user.imageUrl,
//   },
//   // [
//   //   GitHubProvider({
//   //     clientId: process.env.AUTH_GITHUB_ID as string,
//   //     clientSecret: process.env.AUTH_GITHUB_SECRET as string,
//   //     profile(profile) {
//   //       return {
//   //         id: profile.id.toString(),
//   //         name: profile.name || profile.login,
//   //         gh_username: profile.login,
//   //         email: profile.email,
//   //         image: profile.avatar_url,
//   //       };
//   //     },
//   //   }),     
//   // ],
//   pages: {
//     signIn: `/login`,
//     verifyRequest: `/login`,
//     error: "/login", // Error code passed in query string as ?error=
//   },
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   cookies: {
//     sessionToken: {
//       name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
//         domain: VERCEL_DEPLOYMENT
//           ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
//           : undefined,
//         secure: VERCEL_DEPLOYMENT,
//       },
//     },
//   },
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       session.user = {
//         ...session.user,
//         // @ts-expect-error
//         id: token.sub,
//         // @ts-expect-error
//         username: token?.user?.username || token?.user?.gh_username,
//       };
//       return session;
//     },
//   },
//   debug: true,
// };




export async function getSession() {
   // Get the userId from auth() -- if null, the user is not signed in
   const user = await currentUser()

   if (!user) {
     redirect("/login");
   }

  // Map Clerk user to your Prisma User model fields
  const prismaUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {
      name: user.fullName || user.username,
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
      image: user.imageUrl,
    },
    create: {
      id: user.id,
      name: user.fullName || user.username,
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
      image: user.imageUrl,
    },
  });
  return {
    user: {
      id: prismaUser.id,
      name: prismaUser.name,
      username: prismaUser.username,
      email: prismaUser.email,
      image: prismaUser.image,
    },
  };

  //  return {
  //   user: {
  //     id: user.id,
  //     name: user.fullName || user.username,
  //     username: user.username,
  //     email: user.emailAddresses[0].emailAddress,
  //     image: user.imageUrl,
  //   },
  // };
   
  
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }

    return action(formData, post, key);
  };
}
