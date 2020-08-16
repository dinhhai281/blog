import dayjs from 'dayjs';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import React, { FC, useCallback } from 'react';
import { Tag } from '@models';

export interface BlogItemProps {
  source: {
    id: string;
    frontmatter: {
      date: string;
      path: string;
      title: string;
      tags: string;
    };
    excerpt: string;
  };
}

export interface BlogItemData {
  site: {
    siteMetadata: {
      tags: Tag[];
    };
  };
}

const BlogItem: FC<BlogItemProps> = ({ source: { frontmatter, excerpt } }) => {
  const { locale, formatMessage } = useIntl();
  const data = useStaticQuery<BlogItemData>(
    graphql`
      query {
        site {
          siteMetadata {
            tags {
              key
              className
            }
          }
        }
      }
    `
  );
  const getTags = useCallback(
    (data: BlogItemData) => data.site.siteMetadata.tags.filter(tag => frontmatter.tags.split(',').includes(tag.key)),
    [data]
  );

  return (
    <div className='grid grid-cols-1'>
      <Link
        data-testid='title'
        className='text-pink-700 text-xl md:text-2xl font-semibold'
        to={`/${locale}${frontmatter.path}`}
      >
        {frontmatter.title}
      </Link>
      <div className='flex flex-col text-sm text-pink-700 text-opacity-75'>
        <div className='mb-2 sm:mb-0 mr-3'>
          {dayjs(frontmatter.date)
            .locale(locale)
            .format(formatMessage({ id: 'date_format' }))}
        </div>
        <div className='flex flex-row flex-wrap'>
          {getTags(data).map(tag => (
            <div key={tag.key} className={`tag ${tag.className}`}>
              {formatMessage({ id: tag.key })}
            </div>
          ))}
        </div>
      </div>
      <div className='pt-1'>{excerpt}</div>
    </div>
  );
};

export default BlogItem;
