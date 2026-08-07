import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '0',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}
          >
            <span>Open Original</span>
            <ExternalLink size={14} />
          </a>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <img src={src} alt="Preview" className="lightbox-img" />
      </div>
    </div>
  );
};
