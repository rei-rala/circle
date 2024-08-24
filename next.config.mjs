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
                hostname: "lh5.googleusercontent.com",
                pathname: "/**"
            }
        ],
    },
};

export default nextConfig;
