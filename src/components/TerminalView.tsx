import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Trash2 } from 'lucide-react';
import { FileId, ProfileData, ThemeMode } from '../types';

interface TerminalViewProps {
  data: ProfileData;
  onClose: () => void;
  onSelectFile: (fileId: FileId) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenCms: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  data,
  onClose,
  onSelectFile,
  onThemeChange,
  onOpenCms
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init',
      command: 'shrikrishna --info',
      output: (
        <div style={{ color: 'var(--text-keyword)' }}>
          <div>Shri Krishna S Bhat IDE Terminal Shell v1.0.0</div>
          <div>Type <span style={{ color: '#27c93f', fontWeight: 600 }}>help</span> to see list of available commands.</div>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    let response: React.ReactNode = null;

    if (lowerCmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (lowerCmd === 'help') {
      response = (
        <div style={{ lineHeight: 1.6 }}>
          <div style={{ color: '#ffa116', fontWeight: 600 }}>Available Commands:</div>
          <div><span style={{ color: '#27c93f' }}>ls</span> - List workspace files</div>
          <div><span style={{ color: '#27c93f' }}>projects</span> - View all projects</div>
          <div><span style={{ color: '#27c93f' }}>certs</span> - View certifications</div>
          <div><span style={{ color: '#27c93f' }}>contact</span> - Display contact details</div>
          <div><span style={{ color: '#27c93f' }}>cat about.html</span> - Read bio</div>
          <div><span style={{ color: '#27c93f' }}>theme quantum</span> / <span style={{ color: '#27c93f' }}>theme emerald</span> / <span style={{ color: '#27c93f' }}>theme sunset</span> / <span style={{ color: '#27c93f' }}>theme light</span></div>
          <div><span style={{ color: '#27c93f' }}>edit</span> - Open portfolio CMS editor drawer</div>
          <div><span style={{ color: '#27c93f' }}>sudo hire</span> - Direct contact shortcut</div>
          <div><span style={{ color: '#27c93f' }}>clear</span> - Clear terminal log</div>
        </div>
      );
    } else if (lowerCmd === 'ls') {
      response = (
        <div style={{ color: 'var(--text-variable)' }}>
          home.tsx   about.html   projects.jsx   certificates.md   achievements.json   leetcode.ts   github.rs   contact.css   resume.pdf
        </div>
      );
    } else if (lowerCmd === 'projects') {
      onSelectFile('projects.jsx');
      response = <div style={{ color: '#27c93f' }}>Opening projects.jsx in workspace editor...</div>;
    } else if (lowerCmd === 'certs') {
      onSelectFile('certificates.md');
      response = <div style={{ color: '#27c93f' }}>Opening certificates.md in workspace editor...</div>;
    } else if (lowerCmd === 'contact') {
      onSelectFile('contact.css');
      response = (
        <div>
          <div>Email: {data.email}</div>
          <div>Phone: {data.phone}</div>
          <div>Location: {data.location}</div>
        </div>
      );
    } else if (lowerCmd.startsWith('cat')) {
      onSelectFile('about.html');
      response = <div style={{ color: '#61afef' }}>{data.bio}</div>;
    } else if (lowerCmd === 'edit') {
      onOpenCms();
      response = <div style={{ color: '#007acc' }}>Opening CMS / Edit drawer...</div>;
    } else if (lowerCmd.startsWith('theme')) {
      if (lowerCmd.includes('quantum')) onThemeChange('quantum');
      else if (lowerCmd.includes('emerald')) onThemeChange('emerald');
      else if (lowerCmd.includes('sunset')) onThemeChange('sunset');
      else if (lowerCmd.includes('light')) onThemeChange('vs-light');
      else onThemeChange('vs-dark');
      response = <div style={{ color: '#27c93f' }}>Theme updated!</div>;
    } else if (lowerCmd === 'sudo hire') {
      response = (
        <div style={{ color: '#27c93f', fontWeight: 'bold' }}>
          🎉 Permission Granted! Contact Shri Krishna at {data.email} or {data.phone}!
        </div>
      );
    } else {
      response = <div style={{ color: '#ff5f56' }}>Command not found: {cmd}. Type 'help' for commands.</div>;
    }

    setLogs(prev => [...prev, { id: Date.now().toString(), command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TerminalIcon size={14} color="#007acc" />
          <span style={{ fontWeight: 600, color: 'var(--text-bright)' }}>TERMINAL — bash</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span title="Clear Log" onClick={() => setLogs([])} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Trash2 size={13} style={{ color: 'var(--text-muted)' }} />
          </span>
          <span title="Close Terminal" onClick={onClose} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={14} style={{ color: 'var(--text-muted)' }} />
          </span>
        </div>
      </div>

      <div className="terminal-body">
        {logs.map((log) => (
          <div key={log.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px', color: 'var(--text-bright)' }}>
              <span style={{ color: '#27c93f' }}>shrikrishna@portfolio-ide:~$</span>
              <span>{log.command}</span>
            </div>
            <div style={{ paddingLeft: '14px', marginTop: '2px' }}>
              {log.output}
            </div>
          </div>
        ))}

        <form onSubmit={handleCommand} className="terminal-input-row">
          <span style={{ color: '#27c93f' }}>shrikrishna@portfolio-ide:~$</span>
          <input
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
