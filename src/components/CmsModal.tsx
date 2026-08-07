import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Image as ImageIcon,
  Edit3,
  Trash2,
  Sparkles
} from 'lucide-react';
import { ProfileData, ProjectItem, CertificationItem, AchievementItem } from '../types';

interface CmsModalProps {
  data: ProfileData;
  onClose: () => void;
  onUpdateData: (newData: ProfileData) => void;
  onResetData: () => void;
  initialTab?: 'project' | 'cert' | 'ach' | 'profile';
}

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
];

export const CmsModal: React.FC<CmsModalProps> = ({
  data,
  onClose,
  onUpdateData,
  onResetData,
  initialTab = 'profile'
}) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'project' | 'cert' | 'ach'>(initialTab);

  // Profile state
  const [profileForm, setProfileForm] = useState({ ...data });

  // Projects list state
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([...data.projects]);

  // Certs list state
  const [certsList, setCertsList] = useState<CertificationItem[]>([...data.certifications]);

  // Achievements list state
  const [achList, setAchList] = useState<AchievementItem[]>([...data.achievements]);

  // Form state for adding new project
  const [newProj, setNewProj] = useState({
    title: '',
    subtitle: '',
    description: '',
    tech: '',
    team: 'Individual Project',
    status: 'Completed' as 'In Progress' | 'Completed',
    date: '2026',
    image: '',
    githubUrl: ''
  });

  // Form state for adding new cert
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: '2026',
    score: '',
    details: '',
    image: ''
  });

  // Form state for adding new achievement
  const [newAch, setNewAch] = useState({
    title: '',
    category: 'Other' as 'Scouting' | 'Hackathon' | 'Music & Arts' | 'Language' | 'Other',
    rank: '',
    description: '',
    year: '2026',
    image: ''
  });

  // Base64 File Upload Reader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    onUpdateData({
      ...data,
      ...profileForm,
      projects: projectsList,
      certifications: certsList,
      achievements: achList
    });
    alert('Portfolio saved successfully!');
  };

  const handleUpdateProjectImage = (id: string, imageUrl: string) => {
    const updated = projectsList.map(p => p.id === id ? { ...p, image: imageUrl } : p);
    setProjectsList(updated);
    onUpdateData({ ...data, projects: updated });
  };

  const handleUpdateCertImage = (id: string, imageUrl: string) => {
    const updated = certsList.map(c => c.id === id ? { ...c, image: imageUrl } : c);
    setCertsList(updated);
    onUpdateData({ ...data, certifications: updated });
  };

  const handleUpdateAchImage = (id: string, imageUrl: string) => {
    const updated = achList.map(a => a.id === id ? { ...a, image: imageUrl } : a);
    setAchList(updated);
    onUpdateData({ ...data, achievements: updated });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title) return alert('Please enter project title!');
    const proj: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: newProj.title,
      subtitle: newProj.subtitle || 'Software Project',
      description: newProj.description,
      tech: newProj.tech ? newProj.tech.split(',').map(s => s.trim()) : ['React.js'],
      team: newProj.team,
      status: newProj.status,
      date: newProj.date,
      image: newProj.image || PRESET_IMAGES[0],
      githubUrl: newProj.githubUrl
    };
    const updated = [proj, ...projectsList];
    setProjectsList(updated);
    onUpdateData({ ...data, projects: updated });
    setNewProj({ title: '', subtitle: '', description: '', tech: '', team: 'Individual Project', status: 'Completed', date: '2026', image: '', githubUrl: '' });
    alert('Project added successfully!');
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title) return alert('Please enter certification title!');
    const cert: CertificationItem = {
      id: 'cert-' + Date.now(),
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date,
      score: newCert.score,
      details: newCert.details,
      image: newCert.image
    };
    const updated = [cert, ...certsList];
    setCertsList(updated);
    onUpdateData({ ...data, certifications: updated });
    setNewCert({ title: '', issuer: '', date: '2026', score: '', details: '', image: '' });
    alert('Certification added successfully!');
  };

  const handleAddAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAch.title) return alert('Please enter achievement title!');
    const ach: AchievementItem = {
      id: 'ach-' + Date.now(),
      title: newAch.title,
      category: newAch.category,
      rank: newAch.rank,
      description: newAch.description,
      year: newAch.year,
      image: newAch.image
    };
    const updated = [ach, ...achList];
    setAchList(updated);
    onUpdateData({ ...data, achievements: updated });
    setNewAch({ title: '', category: 'Other', rank: '', description: '', year: '2026', image: '' });
    alert('Achievement added successfully!');
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shrikrishna_portfolio_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Edit3 size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-bright)' }}>
                Portfolio Content & Image Manager
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Edit info, attach images via File Upload or URL, and manage items.
              </div>
            </div>
          </div>
          <X size={22} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose} />
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-titlebar)' }}>
          {(['profile', 'project', 'cert', 'ach'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              style={{
                flex: 1,
                padding: '12px 4px',
                border: 'none',
                background: activeSection === sec ? 'var(--bg-page)' : 'transparent',
                color: activeSection === sec ? 'var(--accent-color)' : 'var(--text-muted)',
                fontWeight: activeSection === sec ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                borderBottom: activeSection === sec ? '2px solid var(--accent-color)' : 'none',
                textTransform: 'capitalize'
              }}
            >
              {sec === 'profile' ? 'Profile Info' : sec === 'project' ? 'Projects & Images' : sec === 'cert' ? 'Certificates' : 'Achievements'}
            </button>
          ))}
        </div>

        <div className="modal-body">
          {activeSection === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input 
                  type="text" 
                  value={profileForm.name} 
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Academic Record / CGPA Headline</label>
                <input 
                  type="text" 
                  value={profileForm.cgpa} 
                  onChange={(e) => setProfileForm({ ...profileForm, cgpa: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Profile Photo (Upload Local File or Paste URL)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
                  {profileForm.profilePic && (
                    <img 
                      src={profileForm.profilePic} 
                      alt="Preview" 
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-color)' }}
                    />
                  )}
                  <input 
                    type="text" 
                    value={profileForm.profilePic} 
                    onChange={(e) => setProfileForm({ ...profileForm, profilePic: e.target.value })}
                    placeholder="/profile.jpg or https://..."
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label className="cms-btn" style={{ padding: '6px 12px', display: 'inline-flex', cursor: 'pointer', fontSize: '12px' }}>
                    <Upload size={14} />
                    <span>Upload Profile Image File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, (url) => setProfileForm({ ...profileForm, profilePic: url }))}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Headline / Role</label>
                <input 
                  type="text" 
                  value={profileForm.role} 
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Summary Bio</label>
                <textarea 
                  value={profileForm.bio} 
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  style={{ ...inputStyle, height: '90px', resize: 'vertical' }}
                />
              </div>

              <button className="cms-btn" onClick={saveProfile} style={{ marginTop: '12px', justifyContent: 'center', padding: '10px' }}>
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}

          {activeSection === 'project' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Form to add new project */}
              <form onSubmit={handleAddProject} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-card)' }}>
                <h4 style={{ color: 'var(--text-bright)', fontSize: '15px' }}>+ Add New Project with Image</h4>

                <div>
                  <label style={labelStyle}>Project Title *</label>
                  <input 
                    type="text" 
                    value={newProj.title} 
                    onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                    placeholder="Project Name"
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea 
                    value={newProj.description} 
                    onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    placeholder="Project features & description..."
                    style={{ ...inputStyle, height: '65px' }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Tech Stack (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={newProj.tech} 
                    onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })}
                    placeholder="React.js, Node.js, Python, OpenCV"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Project Cover Image (Paste URL or Upload File)</label>
                  <input 
                    type="text" 
                    value={newProj.image} 
                    onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... or data:image/..."
                    style={inputStyle}
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px', alignItems: 'center' }}>
                    <label className="cms-btn" style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>
                      <Upload size={14} />
                      <span>Upload Local Image File</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, (url) => setNewProj({ ...newProj, image: url }))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {/* Preset Cover Selector */}
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Or Select Preset Cover Image:</div>
                    <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {PRESET_IMAGES.map((imgUrl, idx) => (
                        <img 
                          key={idx}
                          src={imgUrl} 
                          alt={`Preset ${idx}`} 
                          onClick={() => setNewProj({ ...newProj, image: imgUrl })}
                          style={{
                            width: '44px',
                            height: '34px',
                            borderRadius: '4px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            border: newProj.image === imgUrl ? '2px solid var(--accent-color)' : '1px solid var(--border-color)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>GitHub Repository URL</label>
                  <input 
                    type="text" 
                    value={newProj.githubUrl} 
                    onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
                    placeholder="https://github.com/shrikrishna2507/your-repo"
                    style={inputStyle}
                  />
                </div>

                <button type="submit" className="cms-btn" style={{ justifyContent: 'center', padding: '9px' }}>
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </form>

              {/* Manage Existing Projects & Image Attachments */}
              <div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '12px', fontSize: '15px' }}>
                  Manage Existing Projects & Attach Images
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {projectsList.map((p) => (
                    <div key={p.id} className="card" style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-bright)', fontSize: '14px', marginBottom: '8px' }}>
                        {p.title}
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {p.image && (
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            style={{ width: '60px', height: '45px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <input 
                            type="text" 
                            value={p.image || ''} 
                            onChange={(e) => handleUpdateProjectImage(p.id, e.target.value)}
                            placeholder="Image URL or Base64..."
                            style={{ ...inputStyle, fontSize: '12px', padding: '6px' }}
                          />
                        </div>
                        <label className="cms-btn" style={{ padding: '6px 10px', fontSize: '11px', cursor: 'pointer' }}>
                          <Upload size={12} />
                          <span>File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, (url) => handleUpdateProjectImage(p.id, url))}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'cert' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <form onSubmit={handleAddCert} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: 'var(--text-bright)', fontSize: '15px' }}>+ Add New Certification</h4>

                <div>
                  <label style={labelStyle}>Title *</label>
                  <input 
                    type="text" 
                    value={newCert.title} 
                    onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                    placeholder="e.g. AWS Certified Developer"
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Issuer</label>
                  <input 
                    type="text" 
                    value={newCert.issuer} 
                    onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                    placeholder="NPTEL / Infosys Springboard"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Certificate Image (URL or Upload File)</label>
                  <input 
                    type="text" 
                    value={newCert.image} 
                    onChange={(e) => setNewCert({ ...newCert, image: e.target.value })}
                    placeholder="Image URL or Base64..."
                    style={inputStyle}
                  />
                  <div style={{ marginTop: '6px' }}>
                    <label className="cms-btn" style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>
                      <Upload size={14} />
                      <span>Upload Certificate Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, (url) => setNewCert({ ...newCert, image: url }))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <button type="submit" className="cms-btn" style={{ justifyContent: 'center', padding: '9px' }}>
                  <Plus size={16} />
                  <span>Add Certification</span>
                </button>
              </form>

              <div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '12px', fontSize: '15px' }}>
                  Manage Certification Images
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {certsList.map((c) => (
                    <div key={c.id} className="card" style={{ padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)' }}>{c.title}</div>
                      <input 
                        type="text" 
                        value={c.image || ''} 
                        onChange={(e) => handleUpdateCertImage(c.id, e.target.value)}
                        placeholder="Image URL..."
                        style={{ ...inputStyle, width: '180px', fontSize: '11px', padding: '5px' }}
                      />
                      <label className="cms-btn" style={{ padding: '5px 10px', fontSize: '11px', cursor: 'pointer' }}>
                        <Upload size={12} />
                        <span>Upload</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, (url) => handleUpdateCertImage(c.id, url))}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ach' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <form onSubmit={handleAddAch} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: 'var(--text-bright)', fontSize: '15px' }}>+ Add New Achievement</h4>

                <div>
                  <label style={labelStyle}>Title *</label>
                  <input 
                    type="text" 
                    value={newAch.title} 
                    onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                    placeholder="e.g. 1st Rank Hackathon"
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Achievement Photo (URL or Upload File)</label>
                  <input 
                    type="text" 
                    value={newAch.image} 
                    onChange={(e) => setNewAch({ ...newAch, image: e.target.value })}
                    placeholder="Image URL or upload"
                    style={inputStyle}
                  />
                  <div style={{ marginTop: '6px' }}>
                    <label className="cms-btn" style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>
                      <Upload size={14} />
                      <span>Upload Achievement Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, (url) => setNewAch({ ...newAch, image: url }))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                <button type="submit" className="cms-btn" style={{ justifyContent: 'center', padding: '9px' }}>
                  <Plus size={16} />
                  <span>Add Achievement</span>
                </button>
              </form>

              <div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '12px', fontSize: '15px' }}>
                  Manage Achievement Photos
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {achList.map((a) => (
                    <div key={a.id} className="card" style={{ padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)' }}>{a.title}</div>
                      <input 
                        type="text" 
                        value={a.image || ''} 
                        onChange={(e) => handleUpdateAchImage(a.id, e.target.value)}
                        placeholder="Image URL..."
                        style={{ ...inputStyle, width: '180px', fontSize: '11px', padding: '5px' }}
                      />
                      <label className="cms-btn" style={{ padding: '5px 10px', fontSize: '11px', cursor: 'pointer' }}>
                        <Upload size={12} />
                        <span>Upload</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, (url) => handleUpdateAchImage(a.id, url))}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Backup Footer */}
          <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              onClick={exportJSON}
              style={{ flex: 1, padding: '9px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-bright)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Download size={14} />
              <span>Export Portfolio JSON</span>
            </button>
            <button 
              onClick={() => {
                if (confirm('Reset all portfolio content to original default values?')) {
                  onResetData();
                  alert('Portfolio data reset to default!');
                }
              }}
              style={{ padding: '9px 14px', background: 'rgba(255,95,86,0.1)', border: '1px solid rgba(255,95,86,0.3)', borderRadius: '6px', color: '#ff5f56', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--text-muted)'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  color: 'var(--text-bright)',
  fontSize: '13px',
  marginTop: '4px',
  outline: 'none'
};
