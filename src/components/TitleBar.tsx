import React from 'react';
import { Edit3, Terminal, Moon, Sun, Layers, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface TitleBarProps {
  activeFile: string;
  onToggleCms: () => void;
  onToggleTerminal: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  activeFile,
  onToggleCms,
  onToggleTerminal,
  theme,
  onThemeChange
}) => {
  return (
    <header className="titlebar">
      <div className="titlebar-left">
        <div className="window-dots">
          <span className="dot dot-red" title="Close"></span>
          <span className="dot dot-yellow" title="Minimize"></span>
          <span className="dot dot-green" title="Maximize"></span>
        </div>
        <div className="titlebar-menu">
          <span>File</span>
          <span onClick={onToggleCms}>Edit</span>
          <span onClick={onToggleTerminal}>View</span>
          <span>Go</span>
          <span>Run</span>
          <span onClick={onToggleTerminal}>Terminal</span>
          <span onClick={() => alert('Shri Krishna S Bhat IDE - Portfolio v1.0. Click Edit button to modify items!')}>Help</span>
        </div>
      </div>

      <div className="titlebar-center">
        <Sparkles size={14} style={{ color: '#007acc' }} />
        <span>Shri Krishna S Bhat - Portfolio IDE — {activeFile}</span>
      </div>

      <div className="titlebar-right">
        {/* Theme Picker Dropdown */}
        <select 
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as ThemeMode)}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-bright)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="vs-dark">🌌 Cyber Neon (Default)</option>
          <option value="quantum">💜 Quantum Nebula</option>
          <option value="emerald">🌿 Emerald Matrix</option>
          <option value="sunset">🌅 Sunset Amber</option>
          <option value="vs-light">☀️ Pearl Light</option>
        </select>

        <button className="cms-btn" onClick={onToggleCms} title="Edit Portfolio Items">
          <Edit3 size={13} />
          <span>Edit / CMS</span>
        </button>
      </div>
    </header>
  );
};
