const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsConfigPathsPlugin()],
    },
  });
};

// exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
//   if (node.internal.type === 'MarkdownRemark') {
//     const slug = createFilePath({ node, getNode, basePath: 'pages' });
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug,
//     });
//   }
// };

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        mdpath: node.frontmatter.path,
      },
    });
  });
};
