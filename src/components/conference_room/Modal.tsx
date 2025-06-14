import React, { useState, useEffect } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsMounted(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!isMounted) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50
        bg-black/40 dark:bg-black/80
        backdrop-filter backdrop-blur-xl
        transition-opacity duration-500 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        overflow-y-auto
        flex justify-center items-start py-10 md:py-20
      `}
      onClick={onClose}
    >
      <div 
        className="relative mt-5 w-full max-w-[95vw] md:max-w-[90vw] xl:max-w-[85vw]" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`
            absolute -top-12 md:-top-20 right-0
            w-10 h-10
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-full
            flex items-center justify-center
            shadow-md
            hover:scale-110 transition-transform
            cursor-pointer
            z-30
          `}
        >
          <span className="text-gray-600 dark:text-gray-300 font-bold select-none">
            ✕
          </span>
        </button>

        <div
          className={`
            bg-white dark:bg-gray-800
            rounded-2xl
            w-full
            h-auto max-h-[90vh] md:max-h-[95vh]
            overflow-y-auto
            p-4 md:p-6
            shadow-lg
            transform transition-transform duration-500 ease-out
            ${isVisible ? "scale-100" : "scale-95"}
            z-20
          `}
        >
          <div className="flex flex-col h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;