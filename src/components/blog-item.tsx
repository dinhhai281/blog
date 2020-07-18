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
  const intl = useIntl();
  return (
    <div className='grid grid-cols-1 row-gap-1'>
      <Link className='text-pink-700 text-2xl font-semibold' to={`/${intl.locale}${frontmatter.path}`}>
        {frontmatter.title}
      </Link>
      <div className='text-sm text-pink-700 text-opacity-75'>{dayjs(frontmatter.date).format('MMMM D, YYYY')}</div>
      <div>{excerpt}</div>
    </div>
  );
};

export default BlogItem;
