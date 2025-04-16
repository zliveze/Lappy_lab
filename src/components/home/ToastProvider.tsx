import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'rgb(54, 211, 153)',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'rgb(239, 68, 68)',
              color: 'white',
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider; 