module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
};

// images: {
//   // remotePatterns: ["https://img.clerk.com/*", "https://utfs.io/*"],
//   domains: ["img.clerk.com", "utfs.io"],
// },
