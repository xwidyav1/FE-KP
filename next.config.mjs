/** @type {import('next').NextConfig} */
const nextConfig = {images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '8000', // Sesuaikan dengan port backend Anda
      pathname: '/api/storage/images/**',
    },
  ],
    domains: ['localhost'],  // Tambahkan hostname di sini
  },
};

export default nextConfig;
