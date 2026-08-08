import React, { useState } from 'react';
import { 
  FileId, 
  ProfileData 
} from '../types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Download, 
  Sparkles, 
  Trophy, 
  Code2, 
  Flame, 
  Trash2, 
  PlusCircle, 
  Maximize2,
  Layers,
  GraduationCap,
  Award,
  ChevronRight,
  ShieldCheck,
  Heart,
  Car,
  Music,
  Utensils,
  Sprout,
  Compass,
  Search,
  Volume2,
  Play,
  CheckCircle2,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditorViewProps {
  activeFile: FileId;
  data: ProfileData;
  isAdmin?: boolean;
  onOpenCms: (section?: 'project' | 'cert' | 'ach') => void;
  onOpenImageModal: (src: string) => void;
  onSelectFile: (fileId: FileId) => void;
  onDeleteProject: (id: string) => void;
  onDeleteCert: (id: string) => void;
  onDeleteAch: (id: string) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  activeFile,
  data,
  isAdmin = false,
  onOpenCms,
  onOpenImageModal,
  onSelectFile,
  onDeleteProject,
  onDeleteCert,
  onDeleteAch
}) => {
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [certSearch, setCertSearch] = useState<string>('');
  const [activeTaal, setActiveTaal] = useState<string | null>(null);

  const [hobbyTab, setHobbyTab] = useState<'car' | 'tabla' | 'cook' | 'garden' | 'scout'>('car');
  const [rpmGauge, setRpmGauge] = useState<number>(3200);
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [isSizzling, setIsSizzling] = useState<boolean>(false);
  const [plantStage, setPlantStage] = useState<number>(3);
  const [compassAngle, setCompassAngle] = useState<number>(45);
  const [cookingStep, setCookingStep] = useState<number>(1);
  const [isDriving, setIsDriving] = useState<boolean>(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const playTablaSound = (type: 'dha' | 'dhin' | 'tin' | 'na' | 'ge' | 'kat') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.9, now);
      masterGain.connect(ctx.destination);

      if (type === 'dha' || type === 'ge') {
        // --- BAYAN DEEP BASS MEEND (GLIDE) ---
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(145, now);
        bassOsc.frequency.exponentialRampToValueAtTime(42, now + 0.42);

        bassGain.gain.setValueAtTime(1.0, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        bassOsc.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.45);

        // Dayan resonant skin ring
        const trebleOsc = ctx.createOscillator();
        const trebleGain = ctx.createGain();
        trebleOsc.type = 'sine';
        trebleOsc.frequency.setValueAtTime(293.66, now);
        trebleOsc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

        trebleGain.gain.setValueAtTime(0.65, now);
        trebleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        trebleOsc.connect(trebleGain);
        trebleGain.connect(masterGain);
        trebleOsc.start(now);
        trebleOsc.stop(now + 0.28);
      } else if (type === 'dhin') {
        // --- DHIN TUNED RESONANCE ---
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(175, now);
        bassOsc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

        bassGain.gain.setValueAtTime(0.85, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        bassOsc.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.38);

        const syahiOsc = ctx.createOscillator();
        const syahiGain = ctx.createGain();
        syahiOsc.type = 'sine';
        syahiOsc.frequency.setValueAtTime(329.63, now);
        syahiOsc.frequency.exponentialRampToValueAtTime(260, now + 0.22);

        syahiGain.gain.setValueAtTime(0.6, now);
        syahiGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        syahiOsc.connect(syahiGain);
        syahiGain.connect(masterGain);
        syahiOsc.start(now);
        syahiOsc.stop(now + 0.25);
      } else if (type === 'tin' || type === 'na') {
        // --- DAYAN TREBLE BELL (CHANTI) ---
        const chantiOsc = ctx.createOscillator();
        const chantiGain = ctx.createGain();
        chantiOsc.type = 'sine';
        chantiOsc.frequency.setValueAtTime(392.00, now);
        chantiOsc.frequency.exponentialRampToValueAtTime(330, now + 0.18);

        chantiGain.gain.setValueAtTime(0.75, now);
        chantiGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        chantiOsc.connect(chantiGain);
        chantiGain.connect(masterGain);
        chantiOsc.start(now);
        chantiOsc.stop(now + 0.2);
      } else if (type === 'kat') {
        // --- KAT DRY SLAP ---
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.45, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        whiteNoise.connect(noiseGain);
        noiseGain.connect(masterGain);
        whiteNoise.start(now);
      }
    } catch (e) {
      console.log('Web Audio error:', e);
    }
  };

  const playTanpuraDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const freqs = [130.81, 196.00, 261.63, 392.00];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.15);
        gain.gain.setValueAtTime(0, now + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.15 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + 3.5);
      });
    } catch (e) {}
  };

  const playRhythmBeat = (taalName: string) => {
    setActiveTaal(taalName);
    triggerConfetti();
    playTanpuraDrone();

    const patternMap: Record<string, { tempo: number; sequence: Array<'dha' | 'dhin' | 'tin' | 'na' | 'ge' | 'kat'> }> = {
      '⚡ Carnatic Rock Fusion Groove': {
        tempo: 175,
        sequence: ['dha', 'dhin', 'dha', 'kat', 'dhin', 'dha', 'ge', 'na', 'dha', 'dhin', 'dhin', 'dha', 'kat', 'tin', 'na', 'dha']
      },
      '🥁 Fast Drut Teental (Solo)': {
        tempo: 160,
        sequence: ['dha', 'dhin', 'dhin', 'dha', 'dha', 'dhin', 'dhin', 'dha', 'dha', 'tin', 'tin', 'na', 'na', 'dhin', 'dhin', 'dha']
      },
      '🎸 Agam-Style Keherwa Rock': {
        tempo: 200,
        sequence: ['dha', 'ge', 'na', 'tin', 'na', 'ge', 'dhin', 'na']
      },
      '🎼 Classical Jhaptal (10 Beats)': {
        tempo: 210,
        sequence: ['dhin', 'na', 'dhin', 'dhin', 'na', 'tin', 'na', 'dhin', 'dhin', 'na']
      },
      '🌺 Rupak Classical (7 Beats)': {
        tempo: 220,
        sequence: ['tin', 'tin', 'na', 'dhin', 'na', 'dhin', 'na']
      }
    };

    const config = patternMap[taalName] || { tempo: 200, sequence: ['dha', 'dhin', 'tin', 'na'] };
    config.sequence.forEach((stroke, idx) => {
      setTimeout(() => {
        playTablaSound(stroke);
      }, idx * config.tempo);
    });

    setTimeout(() => setActiveTaal(null), config.sequence.length * config.tempo + 600);
  };

  const playEngineRevSound = () => {
    try {
      setIsRevving(true);
      setRpmGauge(7600);
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(85, now);
      osc1.frequency.exponentialRampToValueAtTime(390, now + 0.45);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 1.2);

      osc2.frequency.setValueAtTime(42, now);
      osc2.frequency.exponentialRampToValueAtTime(195, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(55, now + 1.2);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.linearRampToValueAtTime(0.85, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);

      setTimeout(() => {
        setIsRevving(false);
        setRpmGauge(3200);
      }, 1200);
    } catch (e) {}
  };

  const playSizzleSound = () => {
    try {
      setIsSizzling(true);
      triggerConfetti();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400;
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);

      setTimeout(() => setIsSizzling(false), 1500);
    } catch (e) {}
  };

  const playGardenChime = () => {
    try {
      setPlantStage(prev => (prev >= 4 ? 1 : prev + 1));
      triggerConfetti();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.12);
        gain.gain.setValueAtTime(0.35, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.6);
      });
    } catch (e) {}
  };

  const playScoutChime = () => {
    try {
      setCompassAngle(prev => prev + 90);
      triggerConfetti();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.1);
        gain.gain.setValueAtTime(0.45, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.7);
      });
    } catch (e) {}
  };

  const filteredProjects = (data?.projects || []).filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          (p.tech || []).some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
    if (!matchesSearch) return false;

    if (projectFilter === 'All') return true;
    if (projectFilter === 'ML & AI') return (p.tech || []).some(t => t.includes('Machine Learning') || t.includes('Computer Vision') || t.includes('OpenCV'));
    if (projectFilter === 'Full-Stack') return (p.tech || []).some(t => t.includes('React') || t.includes('Express') || t.includes('Node') || t.includes('HTML'));
    if (projectFilter === 'Python & Logic') return (p.tech || []).some(t => t.includes('Python') || t.includes('Algorithmic'));
    if (projectFilter === 'IoT') return (p.tech || []).some(t => t.includes('Arduino') || t.includes('Sensors'));
    return true;
  });

  const filteredCerts = (data?.certifications || []).filter(c => 
    c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
    (c.details && c.details.toLowerCase().includes(certSearch.toLowerCase()))
  );

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car size={26} color="var(--accent-color)" />;
      case 'Music': return <Music size={26} color="#c084fc" />;
      case 'Utensils': return <Utensils size={26} color="#ff8c00" />;
      case 'Sprout': return <Sprout size={26} color="#34d399" />;
      case 'Compass': return <Compass size={26} color="#f472b6" />;
      default: return <Heart size={26} color="var(--accent-color)" />;
    }
  };

  switch (activeFile) {
    case 'home.tsx':
      return (
        <div className="home-view" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Executive Hero Banner Card */}
          <div className="card" style={{
            padding: '40px',
            marginBottom: '36px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '36px',
              alignItems: 'center'
            }}>
              <div style={{ flex: '1 1 440px' }}>


                <h1 style={{ 
                  fontSize: '44px', 
                  fontWeight: 900, 
                  lineHeight: 1.1, 
                  marginBottom: '12px', 
                  letterSpacing: '-0.5px',
                  color: 'var(--text-bright)'
                }}>
                  {data.name}
                </h1>
                
                <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '16px' }}>
                  {data.role}
                </h2>

                <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '28px' }}>
                  {data.tagline}
                </p>

                <div className="home-hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={() => onSelectFile('projects.jsx')}
                    className="cms-btn"
                    style={{
                      padding: '11px 22px',
                      fontSize: '14px',
                      borderRadius: '10px'
                    }}
                  >
                    <Code2 size={18} />
                    <span>Explore {data.projects.length} Projects</span>
                  </button>

                  <button
                    onClick={() => onSelectFile('about.html')}
                    style={{
                      background: 'var(--bg-hover)',
                      color: 'var(--text-bright)',
                      border: '1px solid var(--border-color)',
                      padding: '11px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>About & Education</span>
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => onOpenImageModal('/assets/Shrikrishna_Resume.pdf')}
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-bright)',
                      border: '1px solid var(--border-color)',
                      padding: '11px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Maximize2 size={16} color="var(--accent-color)" />
                    <span>View Resume PDF</span>
                  </button>

                  <a
                    href="/assets/Shrikrishna_Resume.pdf"
                    download="Shrikrishna_S_Bhat_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={triggerConfetti}
                    style={{
                      background: 'transparent',
                      color: 'var(--accent-color)',
                      border: '1px solid var(--accent-color)',
                      padding: '11px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none'
                    }}
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Centered Circular Profile Photo */}
              <div style={{ position: 'relative', flex: '0 0 220px', margin: '0 auto' }}>
                <div 
                  style={{
                    width: '210px',
                    height: '210px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid var(--accent-color)',
                    boxShadow: '0 0 35px var(--accent-glow)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => onOpenImageModal(data.profilePic)}
                >
                  <img 
                    src={data.profilePic} 
                    alt={data.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s ease'
                  }}
                  className="img-hover-overlay"
                  >
                    <Maximize2 size={26} color="#ffffff" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={28} color="var(--accent-color)" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>MITE CSE Academic (Till 6th Sem)</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-bright)' }}>9.05 CGPA</div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(251, 191, 36, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={28} color="#fbbf24" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Projects Built</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-bright)' }}>{data.projects.length} Repositories</div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(244, 114, 182, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={28} color="#f472b6" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>LeetCode Solved</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-bright)' }}>75+ Problems</div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={28} color="#34d399" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>State Scouting Award</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-bright)' }}>Rajya Puraskar</div>
              </div>
            </div>
          </div>

          {/* Technical Competencies */}
          <div className="card" style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={22} color="var(--accent-color)" />
              <span>Technical Competencies</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-keyword)', fontWeight: 700, marginBottom: '10px' }}>Core Languages</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(data?.skills?.languages || []).map((sk, i) => <span key={i} className="badge">{sk}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-keyword)', fontWeight: 700, marginBottom: '10px' }}>Web Technologies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(data?.skills?.webDev || []).map((sk, i) => <span key={i} className="badge">{sk}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-keyword)', fontWeight: 700, marginBottom: '10px' }}>Machine Learning & Databases</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[...(data?.skills?.mlAi || []), ...(data?.skills?.databases || [])].map((sk, i) => <span key={i} className="badge">{sk}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'about.html':
      return (
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', color: 'var(--text-bright)', marginBottom: '6px' }}>
            About Shri Krishna S Bhat
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            {data.role} • {data.location}
          </p>

          <div className="card" style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '19px', color: 'var(--accent-color)', marginBottom: '14px' }}>
              Biography
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.75 }}>
              {data.bio}
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--text-bright)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={24} color="var(--accent-color)" />
              <span>Educational Roadmap</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(data?.education || []).map((edu) => (
                <div key={edu.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', fontWeight: 800 }}>
                        {edu.degree}
                      </h3>
                      <div style={{ fontSize: '14.5px', color: 'var(--accent-color)', marginTop: '4px' }}>
                        {edu.institution}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-success" style={{ fontSize: '13.5px', padding: '5px 12px' }}>{edu.score}</span>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{edu.years}</div>
                    </div>
                  </div>
                  <ul style={{ marginTop: '16px', paddingLeft: '22px', color: 'var(--text-main)', fontSize: '14.5px', lineHeight: 1.65 }}>
                    {edu.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'projects.jsx':
      return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '26px' }}>
            <div>
              <h1 style={{ fontSize: '30px', color: 'var(--text-bright)' }}>Featured Engineering Projects ({filteredProjects.length})</h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Full-stack web platforms, computer vision apparel engines, and embedded microcontrollers.
              </p>
            </div>
            {isAdmin && (
              <button 
                className="cms-btn"
                onClick={() => onOpenCms('project')}
              >
                <PlusCircle size={15} />
                <span>Add Project</span>
              </button>
            )}
          </div>

          {/* Interactive Search & Filter Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '26px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['All', 'Full-Stack', 'ML & AI', 'Python & Logic', 'IoT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  style={{
                    background: projectFilter === cat ? 'var(--accent-color)' : 'var(--bg-card)',
                    color: projectFilter === cat ? 'var(--status-text)' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '7px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Real-Time Live Search Input */}
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 34px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  color: 'var(--text-bright)',
                  fontSize: '12.5px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '24px' }}>
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                {proj.image && (
                  <div 
                    style={{ height: '185px', width: '100%', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                    onClick={() => onOpenImageModal(proj.image!)}
                  >
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <span className={`badge ${proj.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                        {proj.status}
                      </span>
                    </div>
                  </div>
                )}
                
                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', fontWeight: 800 }}>
                      {proj.title}
                    </h3>
                    {isAdmin && (
                      <button 
                        onClick={() => onDeleteProject(proj.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ff5f56', cursor: 'pointer', padding: '2px' }}
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: 700, marginBottom: '12px' }}>
                    {proj.subtitle} • {proj.team}
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '18px', flex: 1 }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
                    {proj.tech.map((t, i) => (
                      <span key={i} className="badge" style={{ fontSize: '11.5px' }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          fontSize: '13px', 
                          fontWeight: 700,
                          color: 'var(--accent-color)', 
                          textDecoration: 'none',
                          background: 'var(--accent-glow)',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <Github size={16} />
                        <span>Source Code Repository</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'certificates.md':
      return (
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '30px', color: 'var(--text-bright)' }}>Official Certifications & Diplomas ({filteredCerts.length})</h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Converted certificate documents with click-to-expand lightbox view.
              </p>
            </div>
            {isAdmin && (
              <button 
                className="cms-btn"
                onClick={() => onOpenCms('cert')}
              >
                <PlusCircle size={15} />
                <span>Add Certification</span>
              </button>
            )}
          </div>

          {/* Certificate Live Search Bar */}
          <div style={{ position: 'relative', width: '280px', marginBottom: '26px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search certificates by issuer or title..."
              value={certSearch}
              onChange={(e) => setCertSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                color: 'var(--text-bright)',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '24px' }}>
            {filteredCerts.map((cert) => (
              <div key={cert.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                {cert.image && (
                  <div 
                    style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative', cursor: 'pointer', background: '#000' }}
                    onClick={() => onOpenImageModal(cert.image!)}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease'
                    }}
                    className="img-hover-overlay"
                    >
                      <span className="badge" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Maximize2 size={16} /> View Certificate Document
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', fontWeight: 800, marginBottom: '4px' }}>
                      {cert.title}
                    </h3>
                    {isAdmin && (
                      <button 
                        onClick={() => onDeleteCert(cert.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ff5f56', cursor: 'pointer' }}
                        title="Delete Certification"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ fontSize: '13.5px', color: 'var(--accent-color)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} />
                    <span>{cert.issuer} {cert.score ? `• ${cert.score}` : ''}</span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Issued: {cert.date}
                  </div>

                  {cert.details && (
                    <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, flex: 1 }}>
                      {cert.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'achievements.json':
      return (
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontSize: '30px', color: 'var(--text-bright)' }}>Honors, Scouting & Official Awards ({data.achievements.length})</h1>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Rajya Puraskar Governor Scouting Award, Classical Tabla Udupi District Rank 9th, Hindi Prachar Sabha (Prathama & Madhyama).
              </p>
            </div>
            {isAdmin && (
              <button 
                className="cms-btn"
                onClick={() => onOpenCms('ach')}
              >
                <PlusCircle size={15} />
                <span>Add Achievement</span>
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '24px' }}>
            {data.achievements.map((ach) => (
              <div key={ach.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                {ach.image && (
                  <div style={{ display: 'flex', gap: '2px', background: '#000' }}>
                    <div 
                      style={{ height: '220px', flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                      onClick={() => onOpenImageModal(ach.image!)}
                    >
                      <img 
                        src={ach.image} 
                        alt={`${ach.title} Document`} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                      <div className="img-hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
                        <span className="badge" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <Maximize2 size={14} /> Official Certificate Document
                        </span>
                      </div>
                    </div>
                    {ach.secondaryImage && (
                      <div 
                        style={{ height: '220px', flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer', borderLeft: '1px solid var(--border-color)' }}
                        onClick={() => onOpenImageModal(ach.secondaryImage!)}
                      >
                        <img 
                          src={ach.secondaryImage} 
                          alt={`${ach.title} Folder Cover`} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                        <div className="img-hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
                          <span className="badge" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <Maximize2 size={14} /> Certificate Folder Cover
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '18.5px', color: 'var(--text-bright)', fontWeight: 800 }}>
                        {ach.title}
                      </h3>
                      {ach.rank && (
                        <span className="badge badge-success" style={{ marginTop: '6px' }}>
                          <Award size={14} /> {ach.rank}
                        </span>
                      )}
                    </div>
                    {isAdmin && (
                      <button 
                        onClick={() => onDeleteAch(ach.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ff5f56', cursor: 'pointer' }}
                        title="Delete Achievement"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '12px', lineHeight: 1.6, flex: 1 }}>
                    {ach.description}
                  </p>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                    Category: {ach.category} • Year: {ach.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'hobbies.ts':
      return (
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', color: 'var(--text-bright)', marginBottom: '8px' }}>
            Hobbies & Personal Interests
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Automotive vehicle research, classical & fusion music, culinary arts, gardening, and outdoor exploration.
          </p>

          {/* 1. Hobby Description Cards First */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px', marginBottom: '36px' }}>
            {data.hobbies?.map((hob) => (
              <div key={hob.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getHobbyIcon(hob.iconName)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', color: 'var(--text-bright)', fontWeight: 800 }}>
                      {hob.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--accent-color)', fontWeight: 600 }}>
                      {hob.category}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, flex: 1 }}>
                  {hob.description}
                </p>
              </div>
            ))}
          </div>

          {/* 2. Interactive Multimedia Animation Hub Second */}
          <div className="card" style={{
            marginBottom: '36px',
            background: 'linear-gradient(135deg, rgba(13, 19, 33, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            padding: '28px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--text-bright)', fontWeight: 800, marginBottom: '4px' }}>
                🎮 Interactive Hobbies Animation & Multimedia Studio
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                Select any hobby below to trigger interactive audio visualizers, gauge sweeps, sizzlers, plant blooms, and compass rotators!
              </p>
            </div>

            {/* Hobby Selection Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              {[
                { id: 'car', label: '🏎️ Automotive Research', color: '#ff8c00' },
                { id: 'tabla', label: '🥁 Classical Tabla & Beats', color: '#c084fc' },
                { id: 'cook', label: '🍳 Culinary Arts & Cooking', color: '#ff5f56' },
                { id: 'garden', label: '🌿 Gardening & Greenery', color: '#34d399' },
                { id: 'scout', label: '🧭 Scouting & Trekking', color: '#38bdf8' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setHobbyTab(tab.id as any)}
                  style={{
                    background: hobbyTab === tab.id ? tab.color : 'var(--bg-editor)',
                    color: hobbyTab === tab.id ? '#ffffff' : 'var(--text-bright)',
                    border: '1px solid var(--border-color)',
                    padding: '9px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: hobbyTab === tab.id ? `0 0 15px ${tab.color}66` : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* STAGE 1: AUTOMOTIVE RESEARCH & MOVING CAR ANIMATION */}
            {hobbyTab === 'car' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h3 style={{ fontSize: '20px', color: '#ff8c00', fontWeight: 800, marginBottom: '6px' }}>
                  🏎️ Moving Car & V8 Engine Speedometer
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Watch the car drive along the animated highway track and tap Rev Engine for V8 motor exhaust sound!
                </p>

                {/* Animated Highway Track with Moving Stripes */}
                <div style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: '110px',
                  margin: '0 auto 20px',
                  borderRadius: '16px',
                  background: '#090d16',
                  border: '2px solid #ff8c00',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 25px rgba(255, 140, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {/* Road Center Stripes */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '4px',
                    borderTop: '3px dashed #ff8c00',
                    opacity: 0.6,
                    transform: 'translateY(-50%)'
                  }} />

                  {/* Moving Sports Car Container */}
                  <div style={{
                    fontSize: '46px',
                    position: 'absolute',
                    left: isDriving ? '75%' : '20%',
                    transition: 'left 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    filter: 'drop-shadow(0 0 12px #ff8c00)'
                  }}>
                    🏎️
                  </div>

                  {/* Headlight Beam Effect */}
                  <div style={{
                    position: 'absolute',
                    left: isDriving ? '85%' : '30%',
                    width: '60px',
                    height: '40px',
                    background: 'radial-gradient(ellipse at left, rgba(255, 230, 0, 0.5) 0%, rgba(255, 230, 0, 0) 70%)',
                    transition: 'left 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }} />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={playEngineRevSound}
                    className="cms-btn"
                    style={{
                      background: 'linear-gradient(90deg, #ff8c00, #ff5f56)',
                      padding: '11px 24px',
                      fontSize: '13.5px'
                    }}
                  >
                    <Play size={15} fill="currentColor" />
                    <span>{isRevving ? '🔥 V8 Twin-Turbo Revving!' : '🚀 Rev V8 Engine & Sweep Gauge'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDriving(!isDriving);
                      playEngineRevSound();
                    }}
                    className="cms-btn"
                    style={{
                      background: 'var(--bg-editor)',
                      color: 'var(--text-bright)',
                      border: '1px solid var(--border-color)',
                      padding: '11px 20px',
                      fontSize: '13.5px'
                    }}
                  >
                    <span>{isDriving ? '🛑 Brake & Park Car' : '🏎️ Drive Car Down Highway Track'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: CLASSICAL TABLA & BEATS (SINGLE SIGNATURE TUNE) */}
            {hobbyTab === 'tabla' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', color: '#c084fc', fontWeight: 800, marginBottom: '6px' }}>
                    🥁 Classical Tabla (District Rank 9th Distinction)
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    Tap drum heads directly for Bayan Meend bass & Dayan syahi ring, or play Shri Krishna's signature Classical Tabla rhythm!
                  </p>
                </div>

                {/* Dual Interactive Drum Heads */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
                  {/* Bayan Left Drum */}
                  <div
                    onClick={() => playTablaSound('dha')}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #38bdf8 0%, #0284c7 60%, #0369a1 100%)',
                      border: '6px solid #0f172a',
                      boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.1s ease'
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <div style={{ textAlign: 'center', color: '#ffffff', fontWeight: 900 }}>
                      <div style={{ fontSize: '18px' }}>BAYAN</div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>Deep Bass "Dha"</div>
                    </div>
                  </div>

                  {/* Dayan Right Drum */}
                  <div
                    onClick={() => playTablaSound('na')}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #c084fc 0%, #a855f7 60%, #7e22ce 100%)',
                      border: '6px solid #0f172a',
                      boxShadow: '0 0 25px rgba(192, 132, 252, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.1s ease',
                      marginTop: '10px'
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <div style={{ textAlign: 'center', color: '#ffffff', fontWeight: 900 }}>
                      <div style={{ fontSize: '16px' }}>DAYAN</div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>Tuned "Na/Tin"</div>
                    </div>
                  </div>
                </div>

                {/* Single Signature Tabla Tune Button */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => playRhythmBeat('⚡ Carnatic Rock Fusion Groove')}
                    style={{
                      background: 'linear-gradient(90deg, #c084fc, #38bdf8)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '24px',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 0 25px rgba(192, 132, 252, 0.5)'
                    }}
                  >
                    <Play size={16} fill="#ffffff" />
                    <span>🥁 Play Signature Classical Fusion Tabla Beat (With Tanpura Drone)</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: CULINARY ARTS & FULL COOKING PREPARATION GUIDE */}
            {hobbyTab === 'cook' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h3 style={{ fontSize: '20px', color: '#ff5f56', fontWeight: 800, marginBottom: '6px' }}>
                  🍳 Culinary Arts & South Canara Gourmet Cooking Guide
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Shri Krishna's Signature Recipe: "South Canara Spiced Ghee Roast Paneer" (Step-by-Step Preparation Guide)
                </p>

                {/* Step Progress Tracker */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                  {[1, 2, 3, 4].map(s => (
                    <div
                      key={s}
                      onClick={() => { setCookingStep(s); playSizzleSound(); }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: cookingStep === s ? '#ff5f56' : 'var(--bg-editor)',
                        color: cookingStep === s ? '#ffffff' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      Step {s}
                    </div>
                  ))}
                </div>

                {/* Interactive Cooking Card */}
                <div className="card" style={{ maxWidth: '520px', margin: '0 auto 20px', textAlign: 'left', border: '1px solid #ff5f56' }}>
                  {cookingStep === 1 && (
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff5f56', marginBottom: '6px' }}>
                        🔪 Step 1: Ingredient Prep & Whole Spices Roast
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        Dice fresh cottage cheese (Paneer) into even cubes. Dry roast whole spices: Kashmiri red chilies, coriander seeds, cumin, black pepper, cinnamon, and cloves until aromatic.
                      </p>
                    </div>
                  )}

                  {cookingStep === 2 && (
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff5f56', marginBottom: '6px' }}>
                        🧄 Step 2: Signature Spice Paste & Marination
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        Grind roasted spices with fresh garlic, ginger, tamarind pulp, and lemon juice into a velvety red spice paste. Coat paneer cubes thoroughly and rest for 15 minutes.
                      </p>
                    </div>
                  )}

                  {cookingStep === 3 && (
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff5f56', marginBottom: '6px' }}>
                        🥘 Step 3: Skillet Pan Ghee Sizzle & Saute
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        Melt pure cow ghee on a heavy cast iron skillet. Add fresh curry leaves and toss marinated paneer cubes on high flame until caramelized & rich in aroma.
                      </p>
                    </div>
                  )}

                  {cookingStep === 4 && (
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>
                        🍽️ Step 4: Garnish, Plating & Serving
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        Garnish with golden toasted cashews, finely chopped fresh coriander leaves, and a squeeze of lime. Serve piping hot with Neer Dosa or Rotis!
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setCookingStep(prev => (prev >= 4 ? 1 : prev + 1));
                    playSizzleSound();
                  }}
                  className="cms-btn"
                  style={{
                    background: 'linear-gradient(90deg, #ff5f56, #ff8c00)',
                    padding: '12px 28px',
                    fontSize: '14px',
                    margin: '0 auto'
                  }}
                >
                  <Play size={15} fill="currentColor" />
                  <span>{cookingStep === 4 ? '🔄 Restart Recipe Guide' : `➡️ Advance To Step ${cookingStep + 1} (With Sizzle Sound)`}</span>
                </button>
              </div>
            )}

            {/* STAGE 4: GARDENING & AGRICULTURE (NATURAL GROWTH) */}
            {hobbyTab === 'garden' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h3 style={{ fontSize: '20px', color: '#34d399', fontWeight: 800, marginBottom: '6px' }}>
                  🌿 Gardening & Natural Organic Plant Growth
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Observe organic natural growth progression from seed in soil to vibrant full bloom!
                </p>

                <div style={{
                  width: '160px',
                  height: '160px',
                  margin: '0 auto 20px',
                  borderRadius: '24px',
                  background: 'rgba(52, 211, 153, 0.1)',
                  border: '2px solid #34d399',
                  boxShadow: '0 0 25px rgba(52, 211, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px'
                }}>
                  {plantStage === 1 && '🫘'}
                  {plantStage === 2 && '🌱'}
                  {plantStage === 3 && '🌿'}
                  {plantStage === 4 && '🌻'}
                </div>

                <div style={{ fontSize: '14px', color: '#34d399', fontWeight: 700, marginBottom: '20px' }}>
                  Stage {plantStage} of 4: {['Organic Seed in Soil', 'Green Sprout & Roots', 'Branching Foliage', 'Full Natural Bloom & Harvest'][plantStage - 1]}
                </div>

                <button
                  onClick={playGardenChime}
                  className="cms-btn"
                  style={{
                    background: 'linear-gradient(90deg, #34d399, #059669)',
                    padding: '12px 28px',
                    fontSize: '14px',
                    margin: '0 auto'
                  }}
                >
                  <Play size={15} fill="currentColor" />
                  <span>💧 Water Plant & Bloom Next Natural Stage (Audio)</span>
                </button>
              </div>
            )}

            {/* STAGE 5: SCOUTING & TREKKING */}
            {hobbyTab === 'scout' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h3 style={{ fontSize: '20px', color: '#38bdf8', fontWeight: 800, marginBottom: '6px' }}>
                  🧭 Rajya Puraskar Governor Scout Award & Outdoor Trekking
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Tap below to rotate the magnetic compass needle and trigger the Governor Award triumph chime!
                </p>

                <div style={{
                  width: '150px',
                  height: '150px',
                  margin: '0 auto 20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #0284c7 0%, #0c4a6e 100%)',
                  border: '4px solid #38bdf8',
                  boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '48px',
                    transform: `rotate(${compassAngle}deg)`,
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    🧭
                  </div>
                </div>

                <div style={{ fontSize: '13.5px', color: '#38bdf8', fontWeight: 700, marginBottom: '20px' }}>
                  Heading Angle: {compassAngle % 360}° North-East • Rajya Puraskar Governor Scout
                </div>

                <button
                  onClick={playScoutChime}
                  className="cms-btn"
                  style={{
                    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                    padding: '12px 28px',
                    fontSize: '14px',
                    margin: '0 auto'
                  }}
                >
                  <Play size={15} fill="currentColor" />
                  <span>🧭 Rotate Compass & Trigger Triumph Chime</span>
                </button>
              </div>
            )}
          </div>
        </div>
      );

    case 'leetcode.ts':
      return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', color: 'var(--text-bright)', marginBottom: '8px' }}>
            LeetCode Algorithmic Dashboard
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '36px' }}>
            Data Structures & Algorithms problem solver (Arrays, Strings, Trees, Dynamic Programming).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="card">
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Total Problems Solved</div>
              <div style={{ fontSize: '38px', fontWeight: 900, color: '#fbbf24' }}>
                75
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                135+ Submissions
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '12.5px', color: '#34d399' }}>Easy Solved</div>
              <div style={{ fontSize: '34px', fontWeight: 800, color: '#34d399' }}>
                38
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Arrays, Strings, Two Pointers</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '12.5px', color: '#ff8c00' }}>Medium Solved</div>
              <div style={{ fontSize: '34px', fontWeight: 800, color: '#ff8c00' }}>
                31
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Trees, Graphs, Hashing</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '12.5px', color: '#f472b6' }}>Hard Solved</div>
              <div style={{ fontSize: '34px', fontWeight: 800, color: '#f472b6' }}>
                6
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Dynamic Programming</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px' }}>
            <div>
              <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                Official LeetCode Profile
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>{data.leetcode}</p>
            </div>
            <a 
              href={data.leetcode} 
              target="_blank" 
              rel="noreferrer"
              className="cms-btn"
              style={{ padding: '10px 20px', fontSize: '13.5px', textDecoration: 'none' }}
            >
              <span>Open LeetCode Profile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      );

    case 'github.rs':
      return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', color: 'var(--text-bright)', marginBottom: '8px' }}>
            GitHub Repositories & Activity
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '36px' }}>
            {data.github}
          </p>

          <div className="card" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Github size={36} color="var(--text-bright)" />
              <div>
                <h3 style={{ fontSize: '19px', color: 'var(--text-bright)', fontWeight: 800 }}>
                  github.com/shrikrishna2507
                </h3>
                <div style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                  Full-stack codebases, machine learning projects & computer vision repos
                </div>
              </div>
            </div>
            <a 
              href={data.github} 
              target="_blank" 
              rel="noreferrer"
              className="cms-btn"
              style={{ padding: '11px 22px', fontSize: '14px', textDecoration: 'none' }}
            >
              <span>Open GitHub Profile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      );

    case 'contact.css':
      return (
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '30px', color: 'var(--text-bright)', marginBottom: '8px' }}>
            Get in Touch & Career Profiles
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '36px' }}>
            Reach out directly for software engineering positions, hackathons, or technical discussions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {/* Personal Email */}
            <a href={`mailto:${data.email}`} className="card" style={{ textDecoration: 'none' }}>
              <Mail size={28} color="var(--accent-color)" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Personal Email</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-bright)', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                {data.email}
              </div>
            </a>

            {/* MITE College Email */}
            <a href={`mailto:${data.collegeEmail || '4mt23cs194@mite.ac.in'}`} className="card" style={{ textDecoration: 'none' }}>
              <GraduationCap size={28} color="#c084fc" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>MITE Institutional Email</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-bright)', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                {data.collegeEmail || '4mt23cs194@mite.ac.in'}
              </div>
            </a>

            {/* Phone */}
            <a href={`tel:${data.phone}`} className="card" style={{ textDecoration: 'none' }}>
              <Phone size={28} color="#34d399" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Phone Number</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-bright)', marginTop: '2px' }}>
                {data.phone}
              </div>
            </a>

            {/* LinkedIn */}
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="card" style={{ textDecoration: 'none' }}>
              <Linkedin size={28} color="#38bdf8" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>LinkedIn Profile</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-bright)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>shri-krishna-bhat</span>
                <ExternalLink size={14} color="#38bdf8" />
              </div>
            </a>

            {/* Naukri Job Portal */}
            <a href={data.naukri || 'https://www.naukri.com'} target="_blank" rel="noreferrer" className="card" style={{ textDecoration: 'none' }}>
              <Sparkles size={28} color="#ff8c00" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Naukri Candidate Profile</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-bright)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Naukri Profile</span>
                <ExternalLink size={14} color="#ff8c00" />
              </div>
            </a>

            {/* Location */}
            <div className="card">
              <MapPin size={28} color="#fbbf24" />
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Location</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-bright)', marginTop: '2px' }}>
                {data.location}
              </div>
            </div>
          </div>
        </div>
      );

    case 'resume.pdf':
      return (
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingTop: '36px' }}>
          <h1 style={{ fontSize: '32px', color: 'var(--text-bright)', marginBottom: '12px' }}>
            Shri Krishna S Bhat — Official Resume
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Download official PDF resume featuring MITE 9.05 CGPA (Till 6th Sem), PCMB 90.16%, ML & Full-Stack Projects, Certifications, and Awards.
          </p>

          <div className="card" style={{ padding: '52px', display: 'inline-block', maxWidth: '540px' }}>
            <Download size={56} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '21px', color: 'var(--text-bright)', marginBottom: '12px' }}>Shrikrishna_S_Bhat_Resume.pdf</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Comprehensive engineering resume tailored for Full-Stack, Software Development & Machine Learning positions.
            </p>
            <a
              href="/assets/Shrikrishna_Resume.pdf"
              download="Shrikrishna_S_Bhat_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={triggerConfetti}
              className="cms-btn"
              style={{ padding: '14px 32px', fontSize: '15.5px', textDecoration: 'none', display: 'inline-flex' }}
            >
              <span>Download Official Resume PDF</span>
            </a>
          </div>
        </div>
      );

    default:
      return null;
  }
};
