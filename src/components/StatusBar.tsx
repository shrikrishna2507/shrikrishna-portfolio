import React from 'react';
import { GitBranch, CheckCheck, Bell, Terminal, AlertCircle, Sparkles } from 'lucide-react';
import { FileId } from '../types';

interface StatusBarProps {
  activeFile: FileId;
  onToggleTerminal: () => void;
  onToggleCms: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeFile,
  onToggleTerminal,
  onToggleCms
}) => {
  return (
    <footer className="statusbar">
      <div className="statusbar-left">
        <div className="statusbar-item" title="Git Branch">
          <GitBranch size={12} />
          <span>main</span>
        </div>

        <div className="statusbar-item" onClick={onToggleTerminal} title="Zero Errors">
          <AlertCircle size={12} />
          <span>0 errors, 0 warnings</span>
        </div>
      </div>

      <div className="statusbar-right">
        <div className="statusbar-item" onClick={onToggleCms} style={{ color: '#ffffff', fontWeight: 600 }}>
          <Sparkles size={12} />
          <span>CMS Edit Mode</span>
        </div>

        <div className="statusbar-item">
          <span>Ln 1, Col 1</span>
        </div>

        <div className="statusbar-item">
          <span>UTF-8</span>
        </div>

        <div className="statusbar-item" style={{ textTransform: 'uppercase' }}>
          <span>{activeFile.split('.').pop() || 'TypeScript'}</span>
        </div>

        <div className="statusbar-item" title="Prettier Formatting Enabled">
          <CheckCheck size={12} color="#27c93f" />
          <span>Prettier</span>
        </div>

        <div className="statusbar-item" onClick={onToggleTerminal} title="Notifications">
          <Bell size={12} />
        </div>
      </div>
    </footer>
  );
};
