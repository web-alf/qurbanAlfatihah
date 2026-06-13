import React, { useState, useEffect } from 'react';
import { Ic } from './icons.jsx';
import { PROGRAMS } from './data.jsx';
import { useReveal, onInView, Nav, Hero, TrustStrip, About, Ayat, WhyUs } from './sections-top.jsx';
import { Programs, MediaSlider, Testimoni, Docs, CtaBand, Footer } from './sections-bottom.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor, TweakSlider, TweakButton } from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = {
  "heroVariant": "split",
  "theme": "hijau",
  "accent": "#FF8C00",
  "progLayout": "cards",
  "fontScale": 1,
  "radius": 22
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, setToast] = useState(false);

  useReveal(t.heroVariant);

  useEffect(() => { document.documentElement.classList.add('js-reveal'); }, []);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.body.style.opacity = '0.999';
        requestAnimationFrame(() => { document.body.style.opacity = ''; window.dispatchEvent(new Event('resize')); });
      });
    }
  }, []);

  useEffect(() => {
    const b = document.body;
    b.dataset.theme = t.theme;
    b.dataset.proglayout = t.progLayout;
    b.style.setProperty('--accent', t.accent);
    b.style.setProperty('--fs-scale', String(t.fontScale));
    b.style.setProperty('--radius', t.radius + 'px');
    b.style.setProperty('--radius-sm', Math.max(8, t.radius - 8) + 'px');
    b.style.setProperty('--radius-lg', (t.radius + 12) + 'px');
  }, [t.theme, t.progLayout, t.accent, t.fontScale, t.radius]);

  useEffect(() => {
    const cleanups = [];
    document.querySelectorAll('.prog-progress i[data-w]').forEach(b => {
      cleanups.push(onInView(b, () => { b.style.width = b.dataset.w + '%'; }));
    });
    return () => cleanups.forEach(c => c());
  }, [t.progLayout]);

  const openOrder = (preset = null) => {
    const baseUrl = 'https://qurban.alfatihah.com/';
    if (preset && typeof preset === 'string') {
      const prog = PROGRAMS.find(p => p.id === preset);
      if (prog && prog.link) window.open(prog.link, '_blank');
    } else {
      window.open(baseUrl, '_blank');
    }
  };

  return (
    <>
      <Nav onOrder={() => openOrder()} />
      <Hero variant={t.heroVariant} onOrder={() => openOrder()} />
      <TrustStrip />
      <About />
      <Ayat />
      <WhyUs />
      <Programs onOrder={openOrder} />
      <MediaSlider />
      <Testimoni />
      <Docs />
      <CtaBand onOrder={() => openOrder()} />
      <Footer />

      <a className="wa-float" href="https://wa.me/6281128506752" target="_blank" rel="noreferrer" aria-label="Chat WhatsApp">
        <Ic.wa style={{ width: 30, height: 30, color: '#fff' }} />
      </a>

      <div className={'toast' + (toast ? ' show' : '')}>
        <span className="ic"><Ic.check style={{ width: 22, height: 22 }} /></span>
        Terima kasih! Tim kami segera menghubungi Anda via WhatsApp.
      </div>

      <TweaksPanel>
        <TweakSection label="Tampilan Hero" />
        <TweakRadio label="Layout hero" value={t.heroVariant}
          options={[{ value: 'split', label: 'Split' }, { value: 'center', label: 'Tengah' }, { value: 'bold', label: 'Bold' }]}
          onChange={(v) => setTweak('heroVariant', v)} />
        <TweakSection label="Warna & Tema" />
        <TweakSelect label="Skema warna" value={t.theme}
          options={[{ value: 'hijau', label: 'Hijau Tegas' }, { value: 'terang', label: 'Terang / Putih' }, { value: 'oren', label: 'Hijau Gelap + Oren' }]}
          onChange={(v) => setTweak('theme', v)} />
        <TweakColor label="Warna aksen" value={t.accent}
          options={['#FF8C00', '#F4A100', '#FF6B00', '#329600']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Layout & Skala" />
        <TweakRadio label="Kartu program" value={t.progLayout}
          options={[{ value: 'cards', label: 'Grid' }, { value: 'rows', label: 'Baris' }]}
          onChange={(v) => setTweak('progLayout', v)} />
        <TweakSlider label="Skala teks" value={t.fontScale} min={0.9} max={1.15} step={0.01}
          onChange={(v) => setTweak('fontScale', v)} />
        <TweakSlider label="Lengkung sudut" value={t.radius} min={4} max={32} step={1} unit="px"
          onChange={(v) => setTweak('radius', v)} />
        <TweakSection label="Aksi" />
        <TweakButton label="Buka Form Pesan Qurban" onClick={() => openOrder()} />
      </TweaksPanel>
    </>
  );
}
