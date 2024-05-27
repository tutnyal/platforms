/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: {
<<<<<<< HEAD
      allowedOrigins: ["https://app.ainime.me/*"],
=======
      allowedOrigins: ["app.ainime.me"],
>>>>>>> 78faa7e20bff667a2beb006029f24665ed301e9f
    },
  },
  images: {
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "vercel_blob_rw_ysxhmUi9FNvwFISU_3RAQR6BkRv5a1AXNMdf9m4CABPLcZ6" },
      { hostname: "ysxhmui9fnvwfisu.public.blob.vercel-storage.com" },
<<<<<<< HEAD
      { hostname: "img.clerk.com" },
=======
>>>>>>> 78faa7e20bff667a2beb006029f24665ed301e9f
      // { hostname: "app.ainime.me" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
    ]
  },
};
