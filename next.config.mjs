// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "maps.googleapis.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**"
            }
        ],
    },
};

export default nextConfig;
