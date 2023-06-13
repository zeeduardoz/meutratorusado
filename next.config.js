const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    AUTHORIZATION_TOKEN: '56265883-0bd9-4623-a532-bee66946449a',
    BASE_API: 'https://redetratorusado.com.br'
  },
  images: {
    domains: ['i.imgur.com']
  }
}
