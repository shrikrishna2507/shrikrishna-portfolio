import React, { useState, useEffect } from 'react';
import { initialProfileData } from './data/initialData';
import { FileId, ProfileData, ThemeMode } from './types';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { Explorer } from './components/Explorer';
import { TabsBar } from './components/TabsBar';
import { EditorView } from './components/EditorView';
import { TerminalView } from './components/TerminalView';
import { CmsModal } from './components/CmsModal';
import { StatusBar } from './components/StatusBar';
import { ImageModal } from './components/ImageModal';
import { 
  Sparkles, 
  Edit3, 
  Code2, 
  Terminal as TerminalIcon, 
  Download, 
  User, 
  Award, 
  GraduationCap, 
  Heart, 
  Flame, 
  Mail, 
  FolderGit2,
  ShieldCheck,
  Image as ImageIcon,
  Upload,
  Settings,
  Palette,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './styles/index.css';

const LOCAL_STORAGE_KEY = 'shrikrishna_portfolio_data_v16';

const BACKGROUND_WALLPAPERS = [
  { id: 'classic', label: '⚜️ Classic Dark Amber (Default)', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80' },
  { id: 'quantum', label: '💫 Quantum Space Nebula', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80' },
  { id: 'matrix', label: '🏙️ Matrix Cyberpunk Grid', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80' },
  { id: 'wave', label: '🌊 Midnight Blue Wave', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80' },
  { id: 'sunset', label: '🌅 Sunset Amber Horizon', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80' },
  { id: 'abstract', label: '🎨 Luxury Abstract Glass', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80' }
];

export function App() {
  const [data, setData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved profile data', e);
    }
    return initialProfileData;
  });

  const [activeSection, setActiveSection] = useState<FileId>('home.tsx');
  const [viewMode, setViewMode] = useState<'website' | 'ide'>('website');
  const [theme, setTheme] = useState<ThemeMode>('glossy-glass');
  const [bgWallpaper, setBgWallpaper] = useState<string>('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80');
  const [customBgInput, setCustomBgInput] = useState<string>('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bgModalOpen, setBgModalOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [cmsSection, setCmsSection] = useState<'project' | 'cert' | 'ach' | 'profile'>('profile');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [imageModalSrc, setImageModalSrc] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(() => localStorage.getItem('shrikrishna_admin_email'));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('shrikrishnas2005@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const isAdmin = adminEmail === 'shrikrishnas2005@gmail.com' || adminEmail === '4mt23cs194@mite.ac.in';

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if ((cleanEmail === 'shrikrishnas2005@gmail.com' || cleanEmail === '4mt23cs194@mite.ac.in') && cleanPass === 'Shri0725@') {
      setAdminEmail(cleanEmail);
      localStorage.setItem('shrikrishna_admin_email', cleanEmail);
      setLoginModalOpen(false);
      setLoginMsg('');
      setPasswordInput('');
    } else {
      setLoginMsg('Invalid Email or Password. Only shrikrishnas2005@gmail.com with master password can unlock CMS.');
    }
  };

  const handleLogout = () => {
    setAdminEmail(null);
    localStorage.removeItem('shrikrishna_admin_email');
    setCmsOpen(false);
  };
  const [openTabs, setOpenTabs] = useState<FileId[]>([
    'home.tsx', 'about.html', 'projects.jsx', 'certificates.md', 'achievements.json', 'hobbies.ts', 'leetcode.ts', 'contact.css'
  ]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Close settings dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.settings-dropdown-container')) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [settingsOpen]);

  const handleSelectFile = (fileId: FileId) => {
    setActiveSection(fileId);
    if (!openTabs.includes(fileId)) {
      setOpenTabs([...openTabs, fileId]);
    }
  };

  const handleCloseTab = (fileId: FileId) => {
    const nextTabs = openTabs.filter((id) => id !== fileId);
    setOpenTabs(nextTabs);
    if (activeSection === fileId && nextTabs.length > 0) {
      setActiveSection(nextTabs[nextTabs.length - 1]);
    }
  };

  const handleUpdateData = (newData: ProfileData) => setData(newData);
  const handleResetData = () => {
    if (confirm('Reset portfolio to original authentic data?')) {
      setData(initialProfileData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Delete this project?')) {
      setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    }
  };

  const handleDeleteCert = (id: string) => {
    if (confirm('Delete this certification?')) {
      setData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
    }
  };

  const handleDeleteAch = (id: string) => {
    if (confirm('Delete this achievement?')) {
      setData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
    }
  };

  const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgWallpaper(reader.result as string);
        setBgModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems: { id: FileId; label: string; icon: React.ReactNode }[] = [
    { id: 'home.tsx', label: 'Overview', icon: <User size={15} /> },
    { id: 'about.html', label: 'About & Education', icon: <GraduationCap size={15} /> },
    { id: 'projects.jsx', label: 'Projects (7)', icon: <FolderGit2 size={15} /> },
    { id: 'certificates.md', label: 'Certificates (7)', icon: <ShieldCheck size={15} /> },
    { id: 'achievements.json', label: 'Awards (5)', icon: <Award size={15} /> },
    { id: 'hobbies.ts', label: 'Hobbies', icon: <Heart size={15} /> },
    { id: 'leetcode.ts', label: 'LeetCode (75)', icon: <Flame size={15} /> },
    { id: 'contact.css', label: 'Contact', icon: <Mail size={15} /> }
  ];

  return (
    <>
      {/* Background Image Container */}
      <div 
        className="outer-background"
        style={bgWallpaper ? {
          backgroundImage: `linear-gradient(180deg, rgba(15, 20, 29, 0.45) 0%, rgba(15, 20, 29, 0.75) 100%), url(${bgWallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <div className="grid-pattern" />
      </div>

      <div className="app-container">
        {/* EXECUTIVE WEBSITE MODE */}
        {viewMode === 'website' && (
          <div className="ide-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Classic Aesthetic Header Navigation */}
            <header className="titlebar" style={{ height: '62px', padding: '0 28px', overflow: 'visible', zIndex: 50, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={data.profilePic} 
                  alt={data.name} 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    objectPosition: 'center 15%', 
                    border: '2px solid var(--accent-color)',
                    boxShadow: '0 0 12px var(--accent-glow)'
                  }} 
                />
                <div>
                  <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-bright)', letterSpacing: '0.3px', display: 'block', lineHeight: 1.1 }}>
                    {data.name}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: 600 }}>
                    MITE Computer Science • 9.05 CGPA
                  </span>
                </div>
              </div>

              <nav style={{ display: 'flex', gap: '4px' }}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    style={{
                      background: activeSection === item.id ? 'var(--accent-glow)' : 'transparent',
                      color: activeSection === item.id ? 'var(--accent-color)' : 'var(--text-main)',
                      border: activeSection === item.id ? '1px solid var(--border-color)' : '1px solid transparent',
                      padding: '7px 13px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: activeSection === item.id ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Settings Dropdown Button */}
                <div className="settings-dropdown-container" style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-bright)',
                      border: '1px solid var(--border-color)',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Website Settings & Wallpaper"
                  >
                    <Settings size={15} color="var(--accent-color)" />
                    <span>Settings</span>
                    <ChevronDown size={14} />
                  </button>

                  {/* Settings Dropdown Menu */}
                  {settingsOpen && (
                    <div 
                      className="card" 
                      style={{ 
                        position: 'absolute', 
                        top: '48px', 
                        right: 0, 
                        width: '260px', 
                        padding: '16px', 
                        zIndex: 99999,
                        background: 'rgba(13, 19, 33, 0.96)',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 20px rgba(56,189,248,0.15)',
                        backdropFilter: 'blur(30px) saturate(200%)'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>THEME PRESET</div>
                      <select 
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as ThemeMode)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-editor)',
                          color: 'var(--text-bright)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          padding: '7px 10px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          outline: 'none',
                          marginBottom: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="glossy-glass">💎 Glossy Frosted Glass</option>
                        <option value="classic-aesthetic">⚜️ Classic Warm Luxury</option>
                        <option value="vs-dark">🌌 Cyber Neon</option>
                        <option value="quantum">💜 Quantum Violet</option>
                        <option value="emerald">🌿 Emerald Matrix</option>
                        <option value="sunset">🌅 Sunset Blaze</option>
                        <option value="vs-light">☀️ Crystal Pearl</option>
                      </select>

                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>BACKGROUND WALLPAPER</div>
                      <button 
                        onClick={() => { setSettingsOpen(false); setBgModalOpen(true); }}
                        style={{
                          width: '100%',
                          background: 'var(--bg-hover)',
                          color: 'var(--text-bright)',
                          border: '1px solid var(--border-color)',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '14px'
                        }}
                      >
                        <ImageIcon size={15} color="var(--accent-color)" />
                        <span>Change Background Image</span>
                      </button>

                      {isAdmin && (
                        <button 
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            background: 'rgba(255,95,86,0.1)',
                            color: '#ff5f56',
                            border: '1px solid rgba(255,95,86,0.3)',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px'
                          }}
                        >
                          <span>🔒 Log Out ({adminEmail})</span>
                        </button>
                      )}

                      <button 
                        onClick={handleResetData}
                        style={{
                          width: '100%',
                          background: 'var(--bg-hover)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                          padding: '7px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <RotateCcw size={14} />
                        <span>Reset Portfolio Data</span>
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setViewMode('ide')}
                  style={{
                    background: 'var(--bg-hover)',
                    color: 'var(--text-bright)',
                    border: '1px solid var(--border-color)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Switch to IDE Workstation Mode"
                >
                  <TerminalIcon size={15} />
                  <span>IDE Mode</span>
                </button>

                {isAdmin ? (
                  <button className="cms-btn" onClick={() => { setCmsSection('profile'); setCmsOpen(true); }}>
                    <Edit3 size={14} />
                    <span>Edit / CMS</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setLoginModalOpen(true)}
                    style={{
                      background: 'var(--accent-glow)',
                      color: 'var(--accent-color)',
                      border: '1px solid var(--border-color)',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Sign in with Gmail to enable portfolio editing"
                  >
                    <span>🔒 Owner Login</span>
                  </button>
                )}
              </div>
            </header>

            <main className="editor-window" style={{ padding: '40px 48px' }}>
              <EditorView 
                activeFile={activeSection}
                data={data}
                isAdmin={isAdmin}
                onOpenCms={(sec) => { setCmsSection(sec || 'profile'); setCmsOpen(true); }}
                onOpenImageModal={setImageModalSrc}
                onSelectFile={handleSelectFile}
                onDeleteProject={handleDeleteProject}
                onDeleteCert={handleDeleteCert}
                onDeleteAch={handleDeleteAch}
              />
            </main>
          </div>
        )}

        {/* IDE WORKSTATION MODE */}
        {viewMode === 'ide' && (
          <div className="ide-wrapper">
            <TitleBar 
              activeFile={activeSection}
              onToggleCms={() => setCmsOpen(!cmsOpen)}
              onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
              theme={theme}
              onThemeChange={setTheme}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-titlebar)', padding: '4px 16px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: 600 }}>IDE WORKSTATION MODE</span>
              <button 
                onClick={() => setViewMode('website')}
                style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-color)', color: 'var(--accent-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
              >
                Switch to Website View ➔
              </button>
            </div>

            <div className="main-body">
              <Sidebar 
                activeFile={activeSection}
                onSelectFile={handleSelectFile}
                onToggleCms={() => setCmsOpen(!cmsOpen)}
                onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
                explorerOpen={explorerOpen}
                onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
              />

              {explorerOpen && (
                <Explorer 
                  activeFile={activeSection}
                  onSelectFile={handleSelectFile}
                />
              )}

              <div className="workspace">
                <TabsBar 
                  openTabs={openTabs}
                  activeFile={activeSection}
                  onSelectFile={handleSelectFile}
                  onCloseTab={handleCloseTab}
                />

                <main className="editor-window">
                  <EditorView 
                    activeFile={activeSection}
                    data={data}
                    onOpenCms={(sec) => { setCmsSection(sec || 'profile'); setCmsOpen(true); }}
                    onOpenImageModal={setImageModalSrc}
                    onSelectFile={handleSelectFile}
                    onDeleteProject={handleDeleteProject}
                    onDeleteCert={handleDeleteCert}
                    onDeleteAch={handleDeleteAch}
                  />
                </main>

                {terminalOpen && (
                  <TerminalView 
                    data={data}
                    onClose={() => setTerminalOpen(false)}
                    onSelectFile={handleSelectFile}
                    onThemeChange={setTheme}
                    onOpenCms={() => setCmsOpen(true)}
                  />
                )}
              </div>
            </div>

            <StatusBar 
              activeFile={activeSection}
              onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
              onToggleCms={() => setCmsOpen(!cmsOpen)}
            />
          </div>
        )}

        {/* Settings Wallpaper Selection Modal */}
        {bgModalOpen && (
          <div className="lightbox-overlay" onClick={() => setBgModalOpen(false)}>
            <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={20} color="var(--accent-color)" />
                  <span>Choose Background Image</span>
                </h3>
                <button onClick={() => setBgModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {BACKGROUND_WALLPAPERS.map((wp) => (
                  <div
                    key={wp.id}
                    onClick={() => { setBgWallpaper(wp.url); setBgModalOpen(false); }}
                    style={{
                      border: bgWallpaper === wp.url ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      background: 'var(--bg-editor)',
                      textAlign: 'center'
                    }}
                  >
                    <img src={wp.url} alt={wp.label} style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '4px', marginBottom: '6px' }} />
                    <div style={{ fontSize: '11.5px', color: 'var(--text-bright)', fontWeight: 600 }}>{wp.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Or Upload / Paste Custom Image Wallpaper:</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..." 
                    value={customBgInput}
                    onChange={(e) => setCustomBgInput(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-editor)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-bright)', fontSize: '13px' }}
                  />
                  <button 
                    onClick={() => { if (customBgInput) { setBgWallpaper(customBgInput); setBgModalOpen(false); } }}
                    className="cms-btn"
                    style={{ padding: '8px 14px' }}
                  >
                    Apply URL
                  </button>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label className="cms-btn" style={{ padding: '8px 14px', cursor: 'pointer', display: 'inline-flex', gap: '6px' }}>
                    <Upload size={14} />
                    <span>Upload Local Background File</span>
                    <input type="file" accept="image/*" onChange={handleBgFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Owner Master Password Authentication Modal */}
        {loginModalOpen && (
          <div className="lightbox-overlay" onClick={() => setLoginModalOpen(false)}>
            <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', width: '90%', padding: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <User size={28} color="var(--accent-color)" />
                </div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-bright)', fontWeight: 800 }}>
                  Owner Portfolio Login
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                  Enter your owner email (<strong style={{ color: 'var(--accent-color)' }}>shrikrishnas2005@gmail.com</strong>) and password to unlock CMS live editing.
                </p>
              </div>

              <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Owner Gmail Account Email:</label>
                  <input 
                    type="email" 
                    placeholder="shrikrishnas2005@gmail.com" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-editor)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-bright)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Master Password:</label>
                  <input 
                    type="password" 
                    placeholder="Enter Master Password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-editor)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-bright)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                {loginMsg && (
                  <div style={{ fontSize: '12.5px', color: '#ff5f56', background: 'rgba(255,95,86,0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,95,86,0.3)' }}>
                    {loginMsg}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="cms-btn" style={{ flex: 1, padding: '10px', justifyContent: 'center' }}>
                    <span>Sign In & Unlock CMS</span>
                  </button>
                  <button type="button" onClick={() => setLoginModalOpen(false)} style={{ background: 'var(--bg-hover)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CMS Slide-Over Modal */}
        {cmsOpen && (
          <CmsModal 
            data={data}
            onClose={() => setCmsOpen(false)}
            onUpdateData={handleUpdateData}
            onResetData={handleResetData}
            initialTab={cmsSection}
          />
        )}

        {/* Lightbox Preview Modal */}
        <ImageModal 
          src={imageModalSrc}
          onClose={() => setImageModalSrc(null)}
        />
      </div>
    </>
  );
}

export default App;
