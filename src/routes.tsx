import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import FakeApiPage from './pages/FakeApiPage';
import { BlogPost } from './types/blog';

interface RoutesProps {
  posts: BlogPost[];
  onEdit: (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => void;
}

const RoutesConfig: React.FC<RoutesProps> = ({ posts, onEdit }) => {
  const routes: RouteObject[] = [
    { path: '/', element: <BlogPage /> },
    {
      path: '/blog/:id',
      element: <BlogDetailsPage posts={posts} onEdit={onEdit} />,
    },
    { path: '/fake-api', element: <FakeApiPage /> },
  ];

  return <>{routes.map(route => route.element)}</>;
};

export default RoutesConfig;