import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Share2, MapPin, Flower2, Heart, ArrowDown, CalendarDays, Palette, ImagePlus, X } from 'lucide-react';

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

function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('wedding-theme') || 'garden');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [portrait, setPortrait] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [storyPlaying, setStoryPlaying] = useState(false);
  const audio = useRef(null);
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
      timer = window.setTimeout(advance, 10000);
    };
    let timer = window.setTimeout(advance, 10000);
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
    {!opened && <div className="welcome-screen"><div className="welcome-card"><span className="welcome-ornament">❧</span><GaneshaArt className="ganesha-art welcome-ganesha"/><p className="welcome-blessing hindi">श्री गणेशाय नमः</p><p className="welcome-kicker">WITH THE BLESSINGS OF LORD GANESHA</p><h1>Rishi <i>&</i> Nitu</h1><p className="welcome-date">11 DECEMBER 2026 · BENIPUR</p><button className="open-invitation" onClick={openInvitation}><Heart size={16}/> Tap to open invitation</button><p className="welcome-hint">A love story in full bloom awaits</p></div></div>}
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
        <motion.div className="monogram" variants={fadeUp}>R <span>&</span> N</motion.div>
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

    <footer className="footer section-pad"><div className="footer-ornament">❧</div><p className="eyebrow light">WE CAN’T WAIT TO CELEBRATE WITH YOU</p><h2>With love,<br/><i>Rishi & Nitu</i></h2><p className="hindi">आपका स्नेह और आशीर्वाद ही हमारा उपहार है</p><p className="family-regards">With warm regards from both families<br/><span className="hindi">दोनों परिवारों की ओर से सादर शुभकामनाएँ</span></p><button className="share-button" onClick={share}><Share2 size={17}/> Share the invitation</button><p className="footer-small">MADE WITH LOVE · 2026</p></footer>
  </main>;
}
export default App;
