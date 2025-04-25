import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes';
import { BlogPost } from './types/blog';

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    { id: 1, title: 'Первая запись', text: 'Это пример текста', deleted: false },
  ]);

  const handleEditPost = (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
  };

  return (
    <BrowserRouter>
      <RoutesConfig posts={posts} onEdit={handleEditPost} />
    </BrowserRouter>
  );
};

export default App;