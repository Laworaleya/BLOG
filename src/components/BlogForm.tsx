import React, { useState } from 'react';

interface BlogFormProps {
  onSubmit: (post: { title: string; text: string }) => void;
  initialData?: { title: string; text: string };
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [text, setText] = useState(initialData?.text || '');

  const handleSubmit = () => {
    onSubmit({ title, text });
    setTitle('');
    setText('');
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Текст записи"
      />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
};

export default BlogForm;