import React from 'react';
import BlogItem from './BlogItem';
import { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onDelete, onEdit }) => (
  <div>
    {posts.map(post => (
      <BlogItem
        key={post.id}
        post={post}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default BlogList;