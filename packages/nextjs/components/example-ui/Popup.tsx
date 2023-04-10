import React, { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
}

export const Popup = ({ message, onClose }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${isVisible ? "fixed" : "hidden"} inset-0 flex items-center justify-center`}>
      <div className="w-1/3 bg-red-300 rounded-lg border border-gray-900 text-center text-5xl font-sans shadow-lg p-4">
        <p>{message}</p>
      </div>
    </div>
  );
};
