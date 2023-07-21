"use client";

// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    // <ToastContainer
    //   position="top-right"
    //   autoClose={14000}
    //   limit={5}
    //   hideProgressBar={false}
    //   newestOnTop={false}
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    //   theme="dark"
    // />
    <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      style: {
        background: 'black',
        color: '#fff',
      },
    }}
    />
  );
};

export default ToastProvider;
