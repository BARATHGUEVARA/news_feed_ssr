process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.NODE_PATH = "src";

require("ignore-styles");

require("@babel/register")({
    babelrc: false,
    ignore: [ /\/(build|node_modules)\// ],
    presets: [ "@babel/preset-env", "@babel/preset-react" ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "dynamic-import-node",
      "react-loadable/babel",
      "@babel/plugin-proposal-class-properties"
    ]
  });
  require("@babel/polyfill");
  
  // load up the server entry point
  require("./server");