const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*';
    // Update the page.
    createPage(page);
  }

};
