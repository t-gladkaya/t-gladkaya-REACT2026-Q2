import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-40 rounded-lg shadow-lg">
        <button
          type="button"
          className="absolute top-2 right-2 text-white hover:bg-slate-700"
          onClick={onClose}
        >
          ← Back
        </button>
        {children}
      </div>
    </div>
  );
}