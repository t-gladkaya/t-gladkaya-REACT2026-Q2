import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}


const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled'));
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedButtonRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedButtonRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(modalRef.current);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };  

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lastFocusedButtonRef.current?.focus();
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      >
      <div 
        ref={modalRef}
        className="relative bg-white p-40 rounded-lg shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Form modal"
        onClick={(e) => e.stopPropagation()}
        >
        <button
          type="button"
          className="absolute top-2 right-2 rounded focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          ref={closeButtonRef}
          onClick={onClose}
        >
          <img src="/close.svg" alt="Close" className="w-6 h-6 hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out " />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
