import { Frontmatter, Tag } from '@models';
import dayjs from 'dayjs';
import { Link } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import React, { FC } from 'react';

export interface BlogItemProps {
  frontmatter: Frontmatter;
  excerpt: string;
  tags: Tag[];
}

const BlogItem: FC<BlogItemProps> = ({ frontmatter, excerpt, tags }) => {
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
      <div className='flex flex-col text-sm text-pink-700 text-opacity-75'>
        <div className='mb-2 sm:mb-0 mr-3'>
          {dayjs(frontmatter.date)
            .locale(locale)
            .format(formatMessage({ id: 'date_format' }))}
        </div>
        <div className='flex flex-row flex-wrap'>
          {tags.map(tag => (
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
