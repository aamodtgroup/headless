/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["headless-demo.accelr.dev", "localhost"],
    },
};

module.exports = nextConfig;
