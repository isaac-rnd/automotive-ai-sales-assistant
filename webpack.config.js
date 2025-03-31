const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // ... other webpack configurations ...
  target: 'node', // Important: Target Node.js environment
  externals: [nodeExternals({
    allowlist: [/^langchain/]
  })],
  resolve: {
    fallback: {
      "async_hooks": false,
      "fs": false,
      "path": false
    }
  },

};
