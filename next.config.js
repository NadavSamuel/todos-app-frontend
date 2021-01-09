module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://todos-next-js.vercel.app/:path*'
          },
        ]
      },
  };