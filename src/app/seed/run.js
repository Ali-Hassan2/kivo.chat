const path = require('path')
const Module = require('module')
const originalResolveFilename = Module._resolveFilename

// Register path alias resolver
Module._resolveFilename = function (request, parent, isMain) {
  if (request.startsWith('@/')) {
    const aliasPath = path.join(__dirname, '..', request.replace('@/', ''))
    return originalResolveFilename.call(this, aliasPath, parent, isMain)
  }
  return originalResolveFilename.call(this, request, parent, isMain)
}

// Now run ts-node
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
  paths: {
    '@/*': ['./src/*'],
  },
})

require('./dev-user.seed.ts')
