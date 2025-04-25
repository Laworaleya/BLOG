import React from 'react';
import { useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { BlogPost } from '../types/blog';

interface BlogDetailsPageProps {
  posts: BlogPost[];
  onEdit: (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => void;
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({ posts, onEdit }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(post => post.id === Number(id));

  if (!post) {
    return <p>Запись не найдена</p>;
  }

  const handleEdit = (updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => {
    onEdit(post.id, updatedPost);
  };

  return (
    <div>
      <h1>Редактирование записи</h1>
      <BlogForm onSubmit={handleEdit} initialData={{ title: post.title, text: post.text }} />
    </div>
  );
};

export default BlogDetailsPage;