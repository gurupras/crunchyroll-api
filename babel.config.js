module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: false,
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      }
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true
    }]
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-env'
      ]
    }
  }
}
