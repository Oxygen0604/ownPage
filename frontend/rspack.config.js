const path = require("path");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  plugins: [new ReactRefreshPlugin()],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "builtin:swc-loader",
        exclude: /node_modules/,
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
                refresh: true,
                development: true,
              },
            },
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource", // Webpack 5 推荐
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "public"),
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
