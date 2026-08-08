import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  if (!src) return null;

  const isPdf = src.toLowerCase().endsWith('.pdf') || src.toLowerCase().includes('.pdf');

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={isPdf ? { width: '90vw', maxWidth: '1000px', height: '85vh', padding: '0', display: 'flex', flexDirection: 'column' } : {}}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '0',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          zIndex: 999
        }}>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '6px' }}
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

        {isPdf ? (
          <iframe 
            src={src} 
            title="Resume Document Preview"
            style={{ width: '100%', height: '100%', borderRadius: '12px', border: 'none', background: '#ffffff' }} 
          />
        ) : (
          <img src={src} alt="Preview" className="lightbox-img" />
        )}
      </div>
    </div>
  );
};
