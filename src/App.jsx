import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Share2, MapPin, Flower2, Heart, ArrowDown, CalendarDays, Palette, ImagePlus, X, Download } from 'lucide-react';

const groom = { name: 'Rishi Jha', father: 'Ghuran Jha', mother: 'Shyam Kishori Jha', grandfather: 'Late Shri Rajendra Jha', address: 'Ramouli, Benipur, Darbhanga' };
const bride = { name: 'Nitu Jha', father: 'Sitaram Jha', mother: 'Sangita Devi', grandfather: 'Late Shri Mahaprasad Jha', address: 'Village Simra, Dumka, Jharkhand' };
const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease: [.22, 1, .36, 1] } } };
const themes = [
  { id: 'garden', name: 'Garden', color: '#314a3d' },
  { id: 'blush', name: 'Blush', color: '#9b5f62' },
  { id: 'royal', name: 'Royal', color: '#414878' },
];

function GaneshaArt({ className = '' }) {
  return <svg className={className} viewBox="0 0 160 160" role="img" aria-label="Animated illustration of Lord Ganesha">
    <circle className="ganesha-halo" cx="80" cy="80" r="70" fill="none" stroke="#e8c98d" strokeWidth="1" strokeDasharray="2 5"/>
    <path d="M80 12 85 25 98 20 98 34 112 36 105 48 117 57 105 66" fill="none" stroke="#e8c98d" strokeWidth="2" strokeLinecap="round"/>
    <path d="M80 12 75 25 62 20 62 34 48 36 55 48 43 57 55 66" fill="none" stroke="#e8c98d" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 58C43 49 28 52 25 67c-2 12 8 22 24 22M104 58c13-9 28-6 31 9 2 12-8 22-24 22" fill="#d99e70" stroke="#f3d7a8" strokeWidth="2"/>
    <path d="M54 51c0-19 11-31 26-31s26 12 26 31v28c0 18-11 30-26 30S54 97 54 79Z" fill="#d9a174" stroke="#f3d7a8" strokeWidth="2"/>
    <path d="M62 53c3-5 8-5 12 0M86 53c4-5 9-5 12 0" fill="none" stroke="#593d32" strokeWidth="3" strokeLinecap="round"/>
    <path d="M81 57c-1 11-5 17-3 24 2 7 10 7 13 2 2-4 0-8-3-9" fill="none" stroke="#f1d1a5" strokeWidth="7" strokeLinecap="round" className="ganesha-trunk"/>
    <path d="M74 42c2-9 10-9 12 0" fill="none" stroke="#a34d44" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="80" cy="38" r="3" fill="#e8c98d"/>
    <path d="M63 110c-10 7-16 18-18 30h70c-2-12-8-23-18-30-5 5-10 7-17 7s-12-2-17-7Z" fill="#a84e46" stroke="#e8c98d" strokeWidth="2"/>
    <path d="M67 114 80 138l13-24M80 117v23" fill="none" stroke="#f1d8a9" strokeWidth="2"/>
    <circle cx="49" cy="128" r="3" fill="#efc887"/><circle cx="111" cy="128" r="3" fill="#efc887"/>
  </svg>;
}

function WeddingMonogram({ className = '' }) {
  return <svg className={`wedding-monogram ${className}`} viewBox="0 0 120 84" role="img" aria-label="R and N wedding monogram">
    <path d="M60 5c-6 8-13 10-23 8 2 8-2 13-10 16 8 4 12 9 10 17 10-2 17 1 23 9 6-8 13-11 23-9-2-8 2-13 10-17-8-3-12-8-10-16-10 2-17 0-23-8Z" fill="none" stroke="currentColor" strokeWidth="1.1"/>
    <ellipse cx="60" cy="42" rx="25" ry="28" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".75"/>
    <text x="49" y="49" textAnchor="middle" className="monogram-letter">R</text>
    <text x="71" y="49" textAnchor="middle" className="monogram-letter">N</text>
    <text x="60" y="58" textAnchor="middle" className="monogram-amp">&amp;</text>
    <circle cx="60" cy="9" r="1.7" fill="currentColor"/><circle cx="60" cy="75" r="1.7" fill="currentColor"/>
  </svg>;
}

const videoAssets = {
  couple: '/illustration-traditional-indian-wedding-couple-groom-wears-off-white-illustration-traditional-indian-wedding-367711373.webp',
  ceremony: '/wedding-ceremony.jpg',
};

function loadGraphic(source) {
  return new Promise((resolve) => {
    if (!source) return resolve(null);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

function canvasLines(ctx, text, x, y, maxWidth, lineHeight) {
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else line = next;
  }
  if (line) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawInvitationFrame(ctx, elapsed, images, themeColor, ganesha) {
  const width = 720;
  const height = 1280;
  const slide = Math.min(5, Math.floor(elapsed / 6000));
  const local = (elapsed % 6000) / 6000;
  const fade = Math.min(1, local / .38, (1 - local) / .26);
  const darkSlides = [0, 2, 5].includes(slide);
  const ink = darkSlides ? '#fff7e8' : '#31483b';
  const gold = darkSlides ? '#e7c98f' : '#ac8753';
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, darkSlides ? themeColor : '#fffdf7');
  bg.addColorStop(1, darkSlides ? '#1f3029' : '#e9e5d8');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = `${gold}aa`;
  ctx.lineWidth = 2;
  ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.strokeRect(47, 47, width - 94, height - 94);
  ctx.globalAlpha = Math.max(.12, fade);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const center = width / 2;
  const title = (value, y, size = 62, color = ink, family = 'Georgia, serif') => {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${family}`;
    ctx.fillText(value, center, y, 650);
  };
  const small = (value, y, size = 22, color = gold, family = 'Arial, sans-serif') => {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${family}`;
    ctx.fillText(value, center, y, 640);
  };
  const photo = (image, y, box = 600) => {
    if (!image) return;
    const scale = Math.min(box / image.width, box / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.save();
    ctx.shadowColor = '#18251d44';
    ctx.shadowBlur = 24;
    ctx.drawImage(image, center - w / 2, y, w, h);
    ctx.restore();
  };

  if (slide === 0) {
    if (ganesha) photo(ganesha, 145, 230);
    small('श्री गणेशाय नमः', 440, 30, gold, 'serif');
    small('WITH THE BLESSINGS OF OUR FAMILIES', 510, 18);
    title('Rishi  &  Nitu', 665, 76);
    ctx.fillStyle = gold; ctx.fillRect(220, 710, 280, 2);
    small('ARE GETTING MARRIED', 790, 22, ink);
    small('11 DECEMBER 2026', 900, 26, gold);
    small('BENIPUR · DARBHANGA', 952, 19, ink);
    small('शुभ विवाह समारोह में सादर आमंत्रण', 1045, 28, gold, 'serif');
  } else if (slide === 1) {
    photo(images.couple, 150, 610);
    title('A new chapter', 865, 58);
    title('begins', 930, 58, gold);
    small('ईश्वर एवं परिवार के आशीर्वाद से', 1000, 26, gold, 'serif');
    ctx.fillStyle = ink; ctx.font = '25px Georgia, serif';
    canvasLines(ctx, 'Two families, two hearts, and one beautiful beginning.', center, 1065, 590, 36);
    small('RISHI JHA  ·  NITU JHA', 1180, 19, gold);
  } else if (slide === 2) {
    small('TWO FAMILIES · ONE PROMISE', 265, 19);
    title('With the blessings', 385, 50);
    title('of our families', 445, 50, gold);
    ctx.fillStyle = ink; ctx.font = '29px Georgia, serif';
    ctx.fillText('Rishi Jha', center, 585);
    ctx.font = '23px Georgia, serif';
    ctx.fillText('Son of Ghuran Jha & Shyam Kishori Jha', center, 635, 620);
    ctx.fillText('Grandson of Late Shri Rajendra Jha', center, 682, 620);
    ctx.fillStyle = gold; ctx.fillRect(245, 745, 230, 2);
    ctx.fillStyle = ink; ctx.font = '29px Georgia, serif';
    ctx.fillText('Nitu Jha', center, 825);
    ctx.font = '23px Georgia, serif';
    ctx.fillText('Daughter of Sitaram Jha & Sangita Devi', center, 875, 620);
    ctx.fillText('Granddaughter of Late Shri Mahaprasad Jha', center, 922, 620);
    small('परिवार के आशीर्वाद से', 1040, 27, gold, 'serif');
    small('TWO FAMILIES · ONE BEAUTIFUL BEGINNING', 1120, 16, ink);
  } else if (slide === 3) {
    small('THE FIRST CELEBRATION', 335, 19);
    title('Shagun', 520, 76);
    small('शगुन समारोह', 585, 30, gold, 'serif');
    ctx.fillStyle = gold; ctx.fillRect(238, 650, 244, 2);
    title('6 December 2026', 770, 43, ink);
    small('RAMOULI', 880, 30, gold);
    small('BENIPUR · DARBHANGA', 930, 23, ink);
    small('आप सपरिवार आमंत्रित हैं', 1050, 27, gold, 'serif');
  } else if (slide === 4) {
    photo(images.ceremony, 140, 620);
    small('THE WEDDING DAY', 855, 20);
    title('The day we say', 945, 52);
    title('“I do”', 1015, 57, gold);
    small('11 DECEMBER 2026', 1095, 24, ink);
    small('शुभ विवाह · ११ दिसंबर २०२६', 1150, 25, gold, 'serif');
  } else {
    small('WE CAN’T WAIT TO CELEBRATE WITH YOU', 350, 18);
    title('With love,', 535, 62);
    title('Rishi & Nitu', 620, 66, gold);
    small('आपका स्नेह और आशीर्वाद ही हमारा उपहार है', 740, 25, ink, 'serif');
    ctx.fillStyle = gold; ctx.fillRect(245, 825, 230, 2);
    title('Warm regards', 920, 46);
    small('FROM BOTH FAMILIES', 978, 21, gold);
    small('दोनों परिवारों की ओर से सादर शुभकामनाएँ', 1045, 25, ink, 'serif');
    small('11 DECEMBER 2026', 1135, 19, gold);
  }
  ctx.globalAlpha = 1;
}

async function createInvitationVideo({ audio, audioDestination, themeColor, onAudioStart }) {
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
    throw new Error('Video export is not supported in this browser. Please try Chrome, Edge, or Safari.');
  }
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not prepare the invitation video.');
  const [couple, ceremony] = await Promise.all([loadGraphic(videoAssets.couple), loadGraphic(videoAssets.ceremony)]);
  const ganeshaSvg = document.querySelector('.hero-ganesha .ganesha-art');
  let ganesha = null;
  if (ganeshaSvg) {
    const svg = new XMLSerializer().serializeToString(ganeshaSvg);
    ganesha = await loadGraphic(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  }
  const canvasStream = canvas.captureStream(30);
  const stream = new MediaStream([...canvasStream.getVideoTracks(), ...audioDestination.stream.getAudioTracks()]);
  const formats = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus'];
  const format = formats.find((type) => MediaRecorder.isTypeSupported(type));
  let recorder;
  try { recorder = format ? new MediaRecorder(stream, { mimeType: format }) : new MediaRecorder(stream); }
  catch { canvasStream.getTracks().forEach((track) => track.stop()); throw new Error('This browser could not create the invitation video. Try Chrome or Safari.'); }
  drawInvitationFrame(ctx, 0, { couple, ceremony }, themeColor, ganesha);
  try { await audio.play(); }
  catch (error) { canvasStream.getTracks().forEach((track) => track.stop()); throw error; }
  onAudioStart?.();
  const chunks = [];
  return new Promise((resolve, reject) => {
    let timer;
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    recorder.onerror = () => { clearInterval(timer); canvasStream.getTracks().forEach((track) => track.stop()); reject(new Error('The video recording was interrupted. Please try again.')); };
    recorder.onstop = () => {
      clearInterval(timer);
      canvasStream.getTracks().forEach((track) => track.stop());
      resolve({ blob: new Blob(chunks, { type: recorder.mimeType || 'video/webm' }), mimeType: recorder.mimeType || 'video/webm' });
    };
    recorder.start(250);
    const startedAt = performance.now();
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      drawInvitationFrame(ctx, elapsed, { couple, ceremony }, themeColor, ganesha);
      if (elapsed >= 36000 && recorder.state === 'recording') recorder.stop();
    }, 1000 / 30);
  });
}

function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('wedding-theme') || 'garden');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [portrait, setPortrait] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [videoExporting, setVideoExporting] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');
  const audio = useRef(null);
  const audioGraph = useRef(null);
  useEffect(() => {
    const excerptStart = 54;
    const excerptEnd = 145;
    const player = new Audio('/music/kalsstockmedia-free-soul-indian-sitar-tabla-flute-396347.mp3');
    player.loop = false;
    player.volume = .35;
    player.addEventListener('timeupdate', () => {
      if (player.currentTime >= excerptEnd) player.currentTime = excerptStart;
    });
    audio.current = player;
    player.addEventListener('error', () => setPlaying(false));
    return () => { player.pause(); audio.current = null; };
  }, []);
  const toggleMusic = async () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); }
    else {
      try {
        if (audio.current.currentTime < 54 || audio.current.currentTime >= 145) audio.current.currentTime = 54;
        await audio.current.play();
        setPlaying(true);
      } catch { setPlaying(false); }
    }
  };
  const openInvitation = async () => {
    setOpened(true);
    setStoryPlaying(true);
    if (!audio.current) return;
    try {
      audio.current.currentTime = 54;
      await audio.current.play();
      setPlaying(true);
    } catch { setPlaying(false); }
  };
  const downloadInvitationVideo = async () => {
    if (!audio.current) return;
    setVideoExporting(true);
    setVideoStatus('Creating your 36-second invitation video…');
    try {
      if (!audioGraph.current) {
        const AudioContextType = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextType) throw new Error('Video with music is not supported in this browser. Please try Chrome, Edge, or Safari.');
        const context = new AudioContextType();
        const source = context.createMediaElementSource(audio.current);
        const destination = context.createMediaStreamDestination();
        source.connect(context.destination);
        source.connect(destination);
        audioGraph.current = { context, destination };
      }
      await audioGraph.current.context.resume();
      audio.current.pause();
      audio.current.currentTime = 54;
      const themeColors = { garden: '#314a3d', blush: '#734950', royal: '#394168' };
      const { blob, mimeType } = await createInvitationVideo({
        audio: audio.current,
        audioDestination: audioGraph.current.destination,
        themeColor: themeColors[theme],
        onAudioStart: () => setPlaying(true),
      });
      const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `Rishi-and-Nitu-wedding-invitation.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
      setVideoStatus('Your 36-second invitation video is downloading.');
    } catch (error) {
      setVideoStatus(error instanceof Error ? error.message : 'Could not create the video. Please try again.');
    } finally {
      audio.current?.pause();
      setPlaying(false);
      setVideoExporting(false);
    }
  };
  useEffect(() => {
    if (!opened || !storyPlaying) return undefined;
    const scenes = ['#invitation', '.couple', '#celebration', '#wedding-day', '.footer'];
    let index = 0;
    const advance = () => {
      if (index >= scenes.length) {
        setStoryPlaying(false);
        audio.current?.pause();
        setPlaying(false);
        return;
      }
      const scene = document.querySelector(scenes[index]);
      if (!scene) {
        setStoryPlaying(false);
        audio.current?.pause();
        setPlaying(false);
        return;
      }
      scene.scrollIntoView({ behavior: 'smooth', block: 'start' });
      index += 1;
      timer = window.setTimeout(advance, 6000);
    };
    let timer = window.setTimeout(advance, 6000);
    const pauseOnGesture = () => setStoryPlaying(false);
    window.addEventListener('wheel', pauseOnGesture, { once: true, passive: true });
    window.addEventListener('touchstart', pauseOnGesture, { once: true, passive: true });
    window.addEventListener('keydown', pauseOnGesture, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('wheel', pauseOnGesture);
      window.removeEventListener('touchstart', pauseOnGesture);
      window.removeEventListener('keydown', pauseOnGesture);
    };
  }, [opened, storyPlaying]);
  const loadPicture = (setter) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadMessage('This image format is not supported by your browser. Please choose a JPG, PNG, WebP, or GIF image. iPhone HEIC photos need to be saved as JPG first.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setUploadMessage('Could not read that file. Please try another image.');
    reader.onload = () => {
      const source = String(reader.result);
      const probe = new Image();
      probe.onload = () => {
        setter(source);
        setUploadMessage('Photo added to the invitation.');
      };
      probe.onerror = () => setUploadMessage('This image could not be displayed. Please choose a JPG, PNG, WebP, or GIF image.');
      probe.src = source;
    };
    reader.readAsDataURL(file);
  };
  const chooseTheme = (id) => {
    setTheme(id);
    localStorage.setItem('wedding-theme', id);
    setCustomizeOpen(false);
  };
  const share = async () => {
    const text = `With the blessings of our families, you are warmly invited to celebrate the wedding of ${groom.name} & ${bride.name}.\n\nWedding: 11 December 2026\nShagun: 6 December 2026\nVenue: Ramouli, Benipur, Darbhanga`;
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: 'Rishi & Nitu — Wedding Invitation', text, url }); } catch {} }
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener,noreferrer');
  };
  return <main data-theme={theme} className={`${opened ? 'invitation-opened' : ''} ${storyPlaying ? 'story-playing' : ''}`}>
    {!opened && <div className="welcome-screen"><div className="welcome-card"><WeddingMonogram className="welcome-monogram"/><GaneshaArt className="ganesha-art welcome-ganesha"/><p className="welcome-blessing hindi">श्री गणेशाय नमः</p><p className="welcome-kicker">WITH THE BLESSINGS OF LORD GANESHA</p><h1>Rishi <i>&</i> Nitu</h1><p className="welcome-date">11 DECEMBER 2026 · BENIPUR</p><button className="open-invitation" onClick={openInvitation}><Heart size={16}/> Tap to open invitation</button><p className="welcome-hint">A love story in full bloom awaits</p></div></div>}
    <button className="customize-trigger" onClick={() => setCustomizeOpen(!customizeOpen)} aria-expanded={customizeOpen}><Palette size={16}/><span>Personalize</span>{customizeOpen && <X size={15}/>}</button>
    {customizeOpen && <aside className="customize-panel" aria-label="Invitation personalization">
      <p className="eyebrow">MAKE IT YOURS</p><h2>Personalize</h2>
      <p className="customize-label">Choose a theme</p>
      <div className="theme-options">{themes.map((item) => <button key={item.id} className={`theme-choice ${theme === item.id ? 'selected' : ''}`} onClick={() => chooseTheme(item.id)}><span style={{'--swatch':item.color}}/>{item.name}</button>)}</div>
      <label className="upload-choice"><ImagePlus size={17}/><span>{portrait ? 'Change your photo' : 'Add your photo'}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={loadPicture(setPortrait)}/></label>
      {uploadMessage && <p className={`upload-status ${uploadMessage.startsWith('This image') || uploadMessage.startsWith('Could') ? 'is-error' : 'is-success'}`} role="status">{uploadMessage}</p>}
      <p className="customize-note">Your photo appears in the invitation right away.</p>
    </aside>}
    <button className="sound" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'} title={playing ? 'Pause music' : 'Play music'}>{playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}<span>{playing ? 'Music on' : 'Play music'}</span></button>
    <section className="hero" id="top">
      <div className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-flower flower-a">✿</div><div className="hero-flower flower-b">❀</div>
      <div className="hero-ganesha"><GaneshaArt className="ganesha-art"/><span className="ganesha-mantra hindi">श्री गणेशाय नमः</span></div>
      {portrait && <figure className="portrait-preview"><img src={portrait} alt="Your uploaded wedding photo" onError={() => { setPortrait(''); setUploadMessage('Your photo could not be displayed. Please choose a JPG, PNG, WebP, or GIF image.'); }}/><figcaption>Your photo</figcaption></figure>}
      <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .18 } } }}>
        <motion.p className="eyebrow light" variants={fadeUp}>A CELEBRATION OF LOVE · प्रेम का उत्सव</motion.p>
        <motion.div variants={fadeUp}><WeddingMonogram className="hero-monogram"/></motion.div>
        <motion.h1 variants={fadeUp}>Rishi <i>&</i> Nitu</motion.h1>
        <motion.p className="hero-sub" variants={fadeUp}>Request the pleasure of your company<br/>as they begin their forever</motion.p>
        <motion.div className="hero-rule" variants={fadeUp}><span>❧</span></motion.div>
        <motion.p className="date-teaser" variants={fadeUp}>WEDDING · 11 DECEMBER 2026</motion.p>
        <motion.p className="hero-event-teaser" variants={fadeUp}>SHAGUN · 06 DECEMBER 2026</motion.p>
        <motion.p className="hindi hero-hindi" variants={fadeUp}>शुभ विवाह समारोह में सादर आमंत्रण</motion.p>
        <motion.a className="scroll-cue" href="#invitation" aria-label="Scroll to invitation"><ArrowDown size={18}/></motion.a>
      </motion.div>
      <span className="hero-side">BENIPUR · DARBHANGA · 2026</span>
    </section>

    <section className="invitation section-pad" id="invitation">
      <motion.div className="section-inner" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
        <div className="invitation-layout">
        <figure className="invitation-side single-couple-side"><img className="couple-photo" src="/illustration-traditional-indian-wedding-couple-groom-wears-off-white-illustration-traditional-indian-wedding-367711373.webp" alt="Bride and groom in traditional Indian wedding attire"/></figure>
        <div className="invitation-message">
        <div className="ornament"><span>✿</span></div>
        <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
        <h2>A new chapter<br/><i>begins</i></h2>
        <p className="hindi intro-hindi">ईश्वर एवं परिवार के आशीर्वाद से</p>
        <p className="invitation-copy">Two families, two hearts, and one beautiful beginning.<br className="desktop-only"/> We would be delighted to have you with us as we celebrate.</p>
        <p className="hindi invite-line">इस मंगल अवसर पर आपकी उपस्थिति हमारे लिए सौभाग्य होगी।</p>
        <div className="names-line"><span>{groom.name}</span><Heart size={16} strokeWidth={1.4}/><span>{bride.name}</span></div>
        </div>
        </div>
      </motion.div>
    </section>

    <section className="couple section-pad">
      <div className="couple-heading"><p className="eyebrow">TWO FAMILIES · ONE PROMISE</p><h2>In the garden<br/><i>of togetherness</i></h2></div>
      <div className="family-grid">
        {[{...groom, side:'The Groom'}, {...bride, side:'The Bride'}].map((person, i) => <motion.article className={`family-card card-${i}`} key={person.name} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7,delay:i*.16}}>
          <div className="card-sprig">✿</div><p className="eyebrow">{person.side}</p><h3>{person.name}</h3><p className="hindi card-hindi">{i === 0 ? 'चि. ऋषि झा' : 'चि. सौ. कां. नीतू झा'}</p>
          <div className="family-rule"/><p className="parents">Son of <b>{person.father}</b><br/>and <b>{person.mother}</b></p><p className="grandparent">Grandson / granddaughter of<br/><b>{person.grandfather}</b></p><p className="address">{person.address}</p>
        </motion.article>)}
      </div>
    </section>

    <section className="event section-pad" id="celebration">
      <div className="event-photo" />
      <motion.div className="event-panel" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.75}}>
        <p className="eyebrow">THE FIRST CELEBRATION</p><Flower2 className="event-flower" size={28} strokeWidth={1}/><h2>Shagun</h2><p className="hindi">शगुन समारोह</p>
        <div className="event-date"><CalendarDays size={17}/><span>Sunday, 6 December 2026</span></div>
        <div className="event-rule"/><p className="venue"><MapPin size={17}/><span><b>Ramouli</b><br/>Benipur, Darbhanga</span></p>
        <a className="map-link" href="https://maps.google.com/?q=Ramouli+Benipur+Darbhanga" target="_blank" rel="noreferrer">VIEW LOCATION ↗</a>
      </motion.div>
    </section>

    <section className="coming section-pad" id="wedding-day"><motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
      <p className="eyebrow">THE WEDDING DAY</p><span className="coming-flower">❀</span><h2>The day we say<br/><i>“I do”</i></h2><p className="hindi">शुभ विवाह · ११ दिसंबर २०२६</p><p className="coming-copy">Friday, 11 December 2026<br/>We would be delighted to celebrate with you.</p>
      <div className="wedding-scene" role="img" aria-label="Sacred Indian wedding ceremony beneath a flower decorated mandap">
        <img className="ceremony-image" src="/wedding-ceremony.jpg" alt="Bride and groom taking part in a traditional Indian wedding ceremony" />
        <span className="scene-petal petal-a">✿</span><span className="scene-petal petal-b">❀</span><span className="scene-petal petal-c">✿</span><span className="scene-petal petal-d">✧</span>
      </div>
      <div className="date-placeholder">11 DECEMBER 2026</div>
      <a className="map-link wedding-map" href="https://share.google/pjkR2dVfRk34hQsz0" target="_blank" rel="noreferrer"><MapPin size={16}/> LOCATION  ↗</a>
    </motion.div></section>

    <footer className="footer section-pad"><div className="footer-ornament">❧</div><p className="eyebrow light">WE CAN’T WAIT TO CELEBRATE WITH YOU</p><h2>With love,<br/><i>Rishi & Nitu</i></h2><p className="hindi">आपका स्नेह और आशीर्वाद ही हमारा उपहार है</p><p className="family-regards">With warm regards from both families<br/><span className="hindi">दोनों परिवारों की ओर से सादर शुभकामनाएँ</span></p><button className="video-download" onClick={downloadInvitationVideo} disabled={videoExporting}><Download size={16}/>{videoExporting ? 'Creating 36-second video…' : 'Download 36-second video'}</button>{videoStatus && <p className="video-status" role="status" aria-live="polite">{videoStatus}</p>}<button className="share-button" onClick={share}><Share2 size={17}/> Share the invitation</button><p className="footer-small">MADE WITH LOVE · 2026</p></footer>
  </main>;
}
export default App;
