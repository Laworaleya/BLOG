import React, { useState } from 'react';
import { BlogPost } from '../types/blog';
import { message } from 'antd';

interface BlogItemProps {
  post: BlogPost;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedPost: Omit<BlogPost, 'id' | 'deleted'>) => void;
}

const BlogItem: React.FC<BlogItemProps> = ({ post, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
  const [editedTitle, setEditedTitle] = useState(post.title); // Input for title
  const [editedText, setEditedText] = useState(post.text); // Input for text

  const handleSave = () => {
    onEdit(post.id, { title: editedTitle, text: editedText });
    message.success(`Запись "${editedTitle}" успешно отредактирована!`);
    setIsEditing(false); // Exit edit mode after saving
  };

  const handleDelete = () => {
    onDelete(post.id);
    message.info(`Запись "${post.title}" была удалена.`);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Введите новый заголовок"
          />
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Введите новый текст"
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default BlogItem;