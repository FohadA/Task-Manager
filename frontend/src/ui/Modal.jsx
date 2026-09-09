import { useEffect, useRef } from 'react';

export const Modal = ({
  labelledBy,
  onClose,
  locked = false,
  className = 'w-[min(92vw,400px)]',
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  const dismiss = () => {
    if (!locked) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) dismiss();
      }}
    >
      <div className={`rounded-card border border-line bg-surface text-left shadow-pop ${className}`}>
        {children}
      </div>
    </dialog>
  );
};
