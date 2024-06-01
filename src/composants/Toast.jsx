import React, { useState, useEffect } from 'react';
import './Toast.scss';

export default function Toast({ message, isVisible, setIsVisible }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsVisible(false);
      }, 4000); // 4 secondes avant de masquer le toast
    }
  }, [isVisible, setIsVisible]);
  

  return (
    <div className={`Toast ${showToast ? 'show' : ''}`}>
      <span className="message">{message}</span>
    </div>
  );
}
