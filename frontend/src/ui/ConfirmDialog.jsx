import { TriangleAlert } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { iconProps } from './iconProps';

export const ConfirmDialog = ({
  title,
  description,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <Modal labelledBy="confirm-dialog-title" onClose={onCancel} locked={loading}>
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
      <Button type="button" variant="secondary" onClick={onCancel} disabled={loading} autoFocus>
        {cancelLabel}
      </Button>
      <Button type="button" variant="danger" onClick={onConfirm} loading={loading} disabled={loading}>
        {loading ? 'Eliminando' : confirmLabel}
      </Button>
    </div>
  </Modal>
);
