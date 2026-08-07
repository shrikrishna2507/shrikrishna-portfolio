import React from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileCode, 
  FileText, 
  FileType2, 
  FileJson, 
  Flame, 
  Github, 
  Mail, 
  FileDown
} from 'lucide-react';
import { FileId } from '../types';

interface ExplorerProps {
  activeFile: FileId;
  onSelectFile: (fileId: FileId) => void;
}

export const fileList: { id: FileId; name: string; icon: React.ReactNode; color: string }[] = [
  { id: 'home.tsx', name: 'home.tsx', icon: <FileCode size={14} />, color: '#61dafb' },
  { id: 'about.html', name: 'about.html', icon: <FileType2 size={14} />, color: '#e34c26' },
  { id: 'projects.jsx', name: 'projects.jsx', icon: <FileCode size={14} />, color: '#f7df1e' },
  { id: 'certificates.md', name: 'certificates.md', icon: <FileText size={14} />, color: '#42a5f5' },
  { id: 'achievements.json', name: 'achievements.json', icon: <FileJson size={14} />, color: '#cbd5e1' },
  { id: 'hobbies.ts', name: 'hobbies.ts', icon: <FileCode size={14} />, color: '#00ff9d' },
  { id: 'leetcode.ts', name: 'leetcode.ts', icon: <Flame size={14} />, color: '#ffa116' },
  { id: 'github.rs', name: 'github.rs', icon: <Github size={14} />, color: '#dea584' },
  { id: 'contact.css', name: 'contact.css', icon: <FileCode size={14} />, color: '#264de4' },
  { id: 'resume.pdf', name: 'resume.pdf', icon: <FileDown size={14} />, color: '#ff4081' }
];

export const Explorer: React.FC<ExplorerProps> = ({ activeFile, onSelectFile }) => {
  const [folderOpen, setFolderOpen] = React.useState(true);

  return (
    <div className="explorer">
      <div className="explorer-header">
        <span>EXPLORER</span>
        <span style={{ fontSize: '10px', opacity: 0.7 }}>PORTFOLIO</span>
      </div>

      <div 
        className="explorer-folder"
        onClick={() => setFolderOpen(!folderOpen)}
      >
        {folderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span>SHRIKRISHNA-PORTFOLIO</span>
      </div>

      {folderOpen && (
        <div className="explorer-files">
          {fileList.map((file) => (
            <div
              key={file.id}
              className={`explorer-file ${activeFile === file.id ? 'active' : ''}`}
              onClick={() => onSelectFile(file.id)}
            >
              <span style={{ color: file.color, display: 'flex', alignItems: 'center' }}>
                {file.icon}
              </span>
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
