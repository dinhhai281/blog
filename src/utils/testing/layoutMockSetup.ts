import { useStaticQuery } from 'gatsby';

export const layoutMockSetup = () => {
  (useStaticQuery as jest.Mock).mockImplementation(() => ({
    site: {
      siteMetadata: {
        author: 'author',
        githubUrl: 'githubUrl',
        title: 'title',
        siteUrl: 'siteUrl',
        description: 'description',
        keywords: ['key 1', 'key 2'],
        tags: [{ key: 'JAVASCRIPT', className: 'tag-ts' }],
      },
    },
  }));
};
