import React from 'react';
import { 
  Files, 
  Github, 
  Code2, 
  Award, 
  Trophy, 
  Mail, 
  UserCheck, 
  Terminal, 
  Edit3, 
  Settings,
  Flame
} from 'lucide-react';
import { FileId } from '../types';

interface SidebarProps {
  activeFile: FileId;
  onSelectFile: (fileId: FileId) => void;
  onToggleCms: () => void;
  onToggleTerminal: () => void;
  explorerOpen: boolean;
  onToggleExplorer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeFile,
  onSelectFile,
  onToggleCms,
  onToggleTerminal,
  explorerOpen,
  onToggleExplorer
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div 
          className={`sidebar-icon ${explorerOpen ? 'active' : ''}`}
          onClick={onToggleExplorer}
          title="Explorer (Files)"
        >
          <Files size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'home.tsx' ? 'active' : ''}`}
          onClick={() => onSelectFile('home.tsx')}
          title="Home (home.tsx)"
        >
          <UserCheck size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'projects.jsx' ? 'active' : ''}`}
          onClick={() => onSelectFile('projects.jsx')}
          title="Projects (projects.jsx)"
        >
          <Code2 size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'certificates.md' ? 'active' : ''}`}
          onClick={() => onSelectFile('certificates.md')}
          title="Certifications (certificates.md)"
        >
          <Award size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'achievements.json' ? 'active' : ''}`}
          onClick={() => onSelectFile('achievements.json')}
          title="Achievements (achievements.json)"
        >
          <Trophy size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'leetcode.ts' ? 'active' : ''}`}
          onClick={() => onSelectFile('leetcode.ts')}
          title="LeetCode Stats (leetcode.ts)"
        >
          <Flame size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'github.rs' ? 'active' : ''}`}
          onClick={() => onSelectFile('github.rs')}
          title="GitHub Repos (github.rs)"
        >
          <Github size={20} />
        </div>

        <div 
          className={`sidebar-icon ${activeFile === 'contact.css' ? 'active' : ''}`}
          onClick={() => onSelectFile('contact.css')}
          title="Contact Me (contact.css)"
        >
          <Mail size={20} />
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-icon" onClick={onToggleCms} title="Edit / CMS Mode">
          <Edit3 size={20} style={{ color: '#007acc' }} />
        </div>
        <div className="sidebar-icon" onClick={onToggleTerminal} title="Toggle Terminal">
          <Terminal size={20} />
        </div>
      </div>
    </aside>
  );
};
