import { Toaster as HotToaster } from 'react-hot-toast';

const Toaster = () => {
  return (
    <HotToaster 
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
        // Default options for specific types
        success: {
          duration: 4000,
          style: {
            background: 'green',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: 'red',
            color: '#fff',
          },
        },
      }}
    />
  );
};

export default Toaster;
