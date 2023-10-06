const esbuild = require('esbuild')
const cssModulesPlugin = require('esbuild-css-modules-plugin')
const config = require('./src/config')

console.clear()

const developmentMode = process.env.NODE_ENV === 'development'

const buildConfig = {
  entryPoints: ['./src/index.tsx'],
  outfile: './public/index.js',
  minify: !developmentMode,
  bundle: true,
  plugins: [
    cssModulesPlugin({
      localsConvention: 'camelCase'
    })
  ]
}

const httpServerConfig = {
  host: config.DEV_SERVER_HOST,
  port: config.DEV_SERVER_PORT,
  servedir: './public',
  fallback: './public/index.html'
}

// Development server
if(developmentMode) {
  let buildContext
  esbuild.context(buildConfig)
    .then((_buildContext) => {

      buildContext = _buildContext

      return buildContext.watch()
    })
    .then(() => {
      return buildContext.serve(httpServerConfig)
    })
    .then((data) => {
      console.log(`✅ Project running at http://${data.host}:${data.port}`)
    })
    .catch(() => {})
}

// Production build
else {
  console.log('⌛ Building....')

  esbuild.build(buildConfig).then((buildResults) => {

    if(buildResults.errors.length) {
      for(const error of buildResults.errors) {
        console.error(error)
      }
    }

    else if(buildResults.warnings.length) {
      for(const warning of buildResults.warnings) {
        console.warn(warning)
      }
    }

    else {
      console.log('✅ Project is successfully built')
    }
  })
}
