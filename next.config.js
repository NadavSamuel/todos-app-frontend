// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '//localhost:3030/api/',
            destination: '//localhost:3000/',
          },
        ]
      },
  };