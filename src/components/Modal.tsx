import type { ReactNode } from 'react';
import { Icon } from './Icon';

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <header><h3>{title}</h3><button className="icon-button" onClick={onClose} aria-label="Yopish"><Icon name="close" /></button></header>
        {children}
      </section>
    </div>
  );
}
