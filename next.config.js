/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LOGIN_ROUTE: process.env.LOGIN_ROUTE,
  },

  images: {
    domains: [
      "loremflickr.com",
      "picsum.photos",
      "nikearprod.vtexassets.com",
      "static.nike.com",
      "static.wikia.nocookie.net",
      "assets.adidas.com",
    ],
  },
};

module.exports = nextConfig;
