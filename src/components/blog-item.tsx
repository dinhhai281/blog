import React, { FC } from 'react';
import { Link } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import dayjs from 'dayjs';

export interface BlogItemProps {
  source: {
    id: string;
    frontmatter: {
      date: string;
      path: string;
      title: string;
    };
    excerpt: string;
  };
}

const BlogItem: FC<BlogItemProps> = ({ source: { frontmatter, excerpt } }) => {
  const { locale, formatMessage } = useIntl();
  return (
    <div className='grid grid-cols-1'>
      <Link
        data-testid='title'
        className='text-pink-700 text-xl md:text-2xl font-semibold'
        to={`/${locale}${frontmatter.path}`}
      >
        {frontmatter.title}
      </Link>
      <div className='text-sm text-pink-700 text-opacity-75'>
        {dayjs(frontmatter.date)
          .locale(locale)
          .format(formatMessage({ id: 'date_format' }))}
      </div>
      <div className='pt-3'>{excerpt}</div>
    </div>
  );
};

export default BlogItem;
