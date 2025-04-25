import React, { useState } from 'react';
import { Pagination, Card, Empty } from 'antd'; // Используем Empty для отображения пустого состояния
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import { BlogPost } from '../types/blog';
import { showNotification } from '../components/Notification';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

  // Фильтр для отображения только не удалённых постов
  const visiblePosts = posts.filter(post => !post.deleted);
  const paginatedPosts = visiblePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Добавление поста
  const handleAddPost = (post: Omit<BlogPost, 'id' | 'deleted'>) => {
    const newPost: BlogPost = {
      id: Date.now(),
      ...post,
      deleted: false,
    };
    setPosts([...posts, newPost]);
    showNotification('success', `Пост "${post.title}" успешно добавлен!`);
  };

  // Удаление или восстановление поста
  const handleDeletePost = (id: number) => {
    const post = posts.find(post => post.id === id);
    if (!post) {
      showNotification('error', `Пост с ID ${id} не найден.`);
      return;
    }

    setPosts(posts.map(post =>
      post.id === id ? { ...post, deleted: !post.deleted } : post
    ));

    const action = post.deleted ? 'восстановлен' : 'удалён';
    showNotification('info', `Пост "${post.title}" был ${action}.`);
  };

  // Редактирование поста
  const handleEditPost = (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => {
    const post = posts.find(post => post.id === id);
    if (!post) {
      showNotification('error', `Пост с ID ${id} не найден.`);
      return;
    }

    setPosts(posts.map(post =>
      post.id === id ? { ...post, ...updatedPost } : post
    ));

    showNotification('success', `Пост "${updatedPost.title}" успешно обновлён!`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Мой блог</h1>

      {/* Форма для добавления новых постов */}
      <Card style={{ marginBottom: '20px', padding: '15px' }}>
        <BlogForm onSubmit={handleAddPost} />
      </Card>

      {/* Список постов или пустое состояние */}
      {paginatedPosts.length > 0 ? (
        <BlogList
          posts={paginatedPosts}
          onDelete={handleDeletePost}
          onEdit={handleEditPost}
        />
      ) : (
        <Empty description="Записей пока нет" />
      )}

      {/* Пагинация */}
      <Pagination
        current={currentPage}
        pageSize={postsPerPage}
        total={visiblePosts.length}
        onChange={page => setCurrentPage(page)}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default BlogPage;