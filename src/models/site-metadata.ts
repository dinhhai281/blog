import { Tag } from './tag';

export interface SiteMetadata {
  author: string;
  githubUrl: string;
  title: string;
  siteUrl: string;
  description: string;
  keywords: string[];
  tags: Tag[];
}
