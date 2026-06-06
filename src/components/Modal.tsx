import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white p-40 rounded-lg shadow-lg">
        <button
          type="button"
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          <img src="/close.svg" alt="Close" className="w-6 h-6 hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out " />
        </button>
        {children}
      </div>
    </div>
  );
}
