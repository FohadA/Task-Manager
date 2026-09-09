import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { iconProps } from './iconProps';

export const Pagination = ({ page, totalPages, total, onChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
    <p className="text-[12.5px] text-ink-400 tabular">
      Página {page} de {totalPages} · {total} en total
    </p>
    <div className="flex items-center gap-2">
      <Button variant="secondary" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>
        <ChevronLeft size={15} {...iconProps} />
        Anterior
      </Button>
      <Button
        variant="secondary"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Siguiente
        <ChevronRight size={15} {...iconProps} />
      </Button>
    </div>
  </div>
);
