/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn0.fahasa.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '**',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/:path*`,
      },
    ]
  },
}


export default nextConfig
