import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface QueryData {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
      author: string;
      description: string;
      keywords: string[];
    };
  };
}

interface SEOProps {
  title?: string;
}

const SEO: FC<SEOProps> = ({ title }) => {
  const { site } = useStaticQuery<QueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
          description
          keywords
        }
      }
    }
  `);

  return (
    <Helmet
      defer={false}
      title={title ?? site.siteMetadata.author}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      htmlAttributes={{
        lang: 'vi',
      }}
      meta={[
        {
          name: 'description',
          content: site.siteMetadata.description,
        },
        {
          name: 'keywords',
          content: site.siteMetadata.keywords.join(','),
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    ></Helmet>
  );
};

export default SEO;
