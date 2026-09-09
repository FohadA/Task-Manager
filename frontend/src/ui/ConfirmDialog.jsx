import { useEffect, useRef } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Button } from './Button';
import { iconProps } from './iconProps';

export const ConfirmDialog = ({
  title,
  description,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  loading = false,
  onConfirm,
  onCancel,
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

  const cancel = () => {
    if (!loading) onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="confirm-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        cancel();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) cancel();
      }}
    >
      <div className="w-[min(92vw,400px)] rounded-card border border-line bg-surface text-left shadow-pop">
        <div className="flex gap-3.5 px-5 pt-5 pb-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-field border border-danger/20 bg-danger-soft text-danger">
            <TriangleAlert size={17} {...iconProps} />
          </span>
          <div>
            <h2 id="confirm-dialog-title" className="text-[16px] font-semibold text-ink">
              {title}
            </h2>
            <div className="mt-1.5 text-[13.5px] leading-relaxed text-ink-600">{description}</div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-line-soft px-5 py-3.5">
          <Button type="button" variant="secondary" onClick={cancel} disabled={loading} autoFocus>
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} loading={loading} disabled={loading}>
            {loading ? 'Eliminando' : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
