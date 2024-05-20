/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ["app.https://platforms-tutnyals-projects.vercel.app"],
    },
  },
  images: {
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "vercel_blob_rw_ysxhmUi9FNvwFISU_3RAQR6BkRv5a1AXNMdf9m4CABPLcZ6" },
      { hostname: "ysxhmui9fnvwfisu.public.blob.vercel-storage.com" },
      { hostname: "app.ainime.me" },
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
