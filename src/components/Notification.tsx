import { message } from 'antd';

export const showNotification = (type: 'success' | 'error' | 'info', content: string) => {
  if (type === 'success') {
    message.success(content);
  } else if (type === 'error') {
    message.error(content);
  } else if (type === 'info') {
    message.info(content);
  }
};