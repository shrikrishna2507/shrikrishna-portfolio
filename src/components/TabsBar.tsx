import React from 'react';
import { X } from 'lucide-react';
import { FileId } from '../types';
import { fileList } from './Explorer';

interface TabsBarProps {
  openTabs: FileId[];
  activeFile: FileId;
  onSelectFile: (fileId: FileId) => void;
  onCloseTab: (fileId: FileId) => void;
}

export const TabsBar: React.FC<TabsBarProps> = ({
  openTabs,
  activeFile,
  onSelectFile,
  onCloseTab
}) => {
  return (
    <div className="tabs-bar">
      {openTabs.map((fileId) => {
        const fileInfo = fileList.find(f => f.id === fileId);
        if (!fileInfo) return null;

        const isActive = activeFile === fileId;

        return (
          <div
            key={fileId}
            className={`tab-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectFile(fileId)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: fileInfo.color, display: 'flex', alignItems: 'center' }}>
                {fileInfo.icon}
              </span>
              <span>{fileInfo.name}</span>
            </div>

            {openTabs.length > 1 && (
              <span 
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(fileId);
                }}
                title="Close Tab"
              >
                <X size={12} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
