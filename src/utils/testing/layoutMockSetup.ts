import { useStaticQuery } from 'gatsby';

export const layoutMockSetup = () => {
  (useStaticQuery as jest.Mock).mockImplementationOnce(() => ({
    site: {
      siteMetadata: {
        title: 'title',
      },
    },
  }));
};
