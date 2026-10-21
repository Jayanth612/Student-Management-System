// src/components/Toast.js
import React, { useEffect } from "react";
import "./Toast.css";

function Toast({ toasts, removeToast }) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((toast) =>
        setTimeout(() => {
          removeToast(toast.id);
        }, 3000) // auto dismiss after 3 seconds
      );

      // cleanup timers on unmount or re-render
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
        >
          <span>{toast.message}</span>
          
        </div>
      ))}
    </div>
  );
}

export default Toast;
