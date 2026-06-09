/* sections-top.jsx — Nav, Hero (3 variants), trust strip, About, Ayat, Why */

const { useState, useEffect, useRef } = React;

/* reveal-on-scroll via getBoundingClientRect (IntersectionObserver is unreliable
   in some capture/preview contexts) */
function useReveal(dep){
  useEffect(()=>{
    let raf;
    const check=()=>{
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
        const r = el.getBoundingClientRect();
        if(r.top < vh*0.92 && r.bottom > 0) el.classList.add('in');
      });
    };
    const onScroll=()=>{ cancelAnimationFrame(raf); raf=requestAnimationFrame(check); };
    check();
    requestAnimationFrame(check);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    return ()=>{ window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); cancelAnimationFrame(raf); };
  },[dep]);
}
window.useReveal = useReveal;

/* run cb once when el scrolls into view (rect-based) */
function onInView(el, cb){
  if(!el) return ()=>{};
  let done=false;
  const check=()=>{
    if(done) return;
    const vh = window.innerHeight || 800;
    const r = el.getBoundingClientRect();
    if(r.top < vh*0.9 && r.bottom > 0){ done=true; cb(); cleanup(); }
  };
  const onScroll=()=>requestAnimationFrame(check);
  const cleanup=()=>{ window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); };
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  check(); requestAnimationFrame(check);
  return cleanup;
}
window.onInView = onInView;

/* animated count-up */
function CountUp({ to, suffix='', dur=1600 }){
  const [v,setV] = useState(0);
  const ref = useRef(null);
  useEffect(()=>{
    let raf;
    const cleanup = onInView(ref.current, ()=>{
      const t0=performance.now();
      const tick=(t)=>{ const p=Math.min(1,(t-t0)/dur); const e2=1-Math.pow(1-p,3); setV(Math.round(to*e2)); if(p<1) raf=requestAnimationFrame(tick); };
      raf=requestAnimationFrame(tick);
    });
    return ()=>{ cleanup(); cancelAnimationFrame(raf); };
  },[to]);
  return <span ref={ref}>{v.toLocaleString('id-ID')}{suffix}</span>;
}
window.CountUp = CountUp;

function Nav({ onOrder }){
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40); h();
    window.addEventListener('scroll',h,{passive:true}); return ()=>window.removeEventListener('scroll',h);
  },[]);
  const links=[['#tentang','Tentang'],['#program','Program'],['#media','Media'],['#testimoni','Testimoni']];
  return (
    <nav className={'nav'+(scrolled?' scrolled':'')}>
      <div className="wrap nav-inner">
        <Logo/>
        <div className="nav-links">
          {links.map(([h,t])=><a key={h} href={h}>{t}</a>)}
        </div>
        <div className="cta-wrap">
          <a className="btn btn-ghost hide-sm" href="https://wa.me/6281128506752" target="_blank" rel="noreferrer" style={{color:'var(--green)'}}><span><Ic.wa style={{width:18,height:18}}/></span></a>
          <button className="btn btn-primary" onClick={onOrder}>Qurban Sekarang <Ic.arrow className="arr" style={{width:18,height:18}}/></button>
        </div>
      </div>
    </nav>
  );
}
window.Nav = Nav;

function Hero({ variant, onOrder }){
  const stats = (
    <div className="hero-stats">
      <div className="st"><div className="n"><CountUp to={12000} suffix="+"/></div><div className="l">Donatur dipercaya</div></div>
      <div className="st"><div className="n"><CountUp to={34}/> Provinsi</div><div className="l">Jangkauan distribusi</div></div>
      <div className="st"><div className="n"><span className="accent-text"><CountUp to={8}/> Media</span></div><div className="l">Nasional meliput</div></div>
    </div>
  );

  if(variant==='center'){
    return (
      <header className="hero" id="top">
        <HeroDeco/>
        <div className="wrap hero-center">
          <span className="eyebrow on-dark reveal">🐐 Qurban Alfatihah 1447 H</span>
          <h1 className="h-display reveal d1" style={{margin:'18px 0 22px'}}>Satu Hewan Qurban,<br/>Tebarkan <span className="accent-text">Seribu Senyuman</span> Tulus</h1>
          <p className="lede text-pretty reveal d2" style={{maxWidth:640, color:'inherit', opacity:.86}}>Jangan jadikan qurban hanya sekedar ritual ibadah—jadikan kenangan yang melekat lewat senyuman mereka setiap menerima kebaikanmu.</p>
          <div className="hero-cta reveal d3">
            <button className="btn btn-primary btn-lg" onClick={onOrder}>Qurban Sekarang Juga! <Ic.arrow className="arr" style={{width:20,height:20}}/></button>
            <a className="btn btn-ghost btn-lg" href="#program" style={{color:'var(--hero-ink)'}}><span>Lihat Pilihan Program</span></a>
          </div>
          <div className="flyer-row reveal d4">
            <FlyerCard slot="hero-flyer-a"/>
            <FlyerCard slot="hero-flyer-b"/>
          </div>
        </div>
      </header>
    );
  }

  if(variant==='bold'){
    return (
      <header className="hero" id="top">
        <HeroDeco bold/>
        <div className="wrap" style={{paddingBottom:'clamp(50px,7vw,90px)'}}>
          <span className="eyebrow on-dark reveal">Idul Adha 1447 H · Qurban Alfatihah</span>
          <h1 className="reveal d1" style={{fontSize:'clamp(2.8rem,9vw,7rem)', margin:'22px 0 0', lineHeight:.98}}>
            Satu Hewan<br/>Qurban,<br/><span className="accent-text">Seribu Senyuman.</span>
          </h1>
          <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'end', marginTop:40, flexWrap:'wrap'}}>
            <p className="lede text-pretty reveal d2" style={{maxWidth:560, color:'inherit', opacity:.86, margin:0}}>Jangan jadikan qurban hanya sekedar ritual ibadah—jadikan kenangan yang melekat lewat senyuman mereka setiap menerima kebaikanmu.</p>
            <div className="hero-cta reveal d3" style={{marginTop:0}}>
              <button className="btn btn-primary btn-lg" onClick={onOrder}>Qurban Sekarang <Ic.arrow className="arr" style={{width:20,height:20}}/></button>
            </div>
          </div>
          <div className="reveal d4">{stats}</div>
        </div>
      </header>
    );
  }

  /* split (default) */
  return (
    <header className="hero" id="top">
      <HeroDeco/>
      <div className="wrap hero-split">
        <div className="hero-copy">
          <span className="eyebrow on-dark reveal">🐐 Idul Adha 1447 H</span>
          <h1 className="h-display reveal d1" style={{marginTop:18}}>Satu Hewan Qurban, Tebarkan <span className="accent-text">Seribu Senyuman</span> Tulus</h1>
          <p className="lede text-pretty reveal d2">Jangan jadikan qurban hanya sekedar ritual ibadah—jadikan kenangan yang melekat lewat senyuman mereka setiap menerima kebaikanmu.</p>
          <div className="hero-cta reveal d3">
            <button className="btn btn-primary btn-lg" onClick={onOrder}>Qurban Sekarang Juga! <Ic.arrow className="arr" style={{width:20,height:20}}/></button>
            <a className="btn btn-ghost btn-lg" href="#program" style={{color:'var(--hero-ink)'}}><span>Lihat Program</span></a>
          </div>
          <div className="reveal d4">{stats}</div>
        </div>
        <div className="hero-art reveal d2">
          <div className="flyer">
            <image-slot id="hero-flyer" shape="rounded" radius="34" placeholder="Drop flyer hero (qurbanalfatihah.png)"></image-slot>
            <div className="flyer-badge">
              <span className="ic"><Ic.shield style={{width:22,height:22}}/></span>
              <div><div className="t">Real-time & Amanah</div><div className="s">Dokumentasi tiap proses penyaluran</div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;

function FlyerCard({ slot }){
  return (
    <div className="flyer">
      <image-slot id={slot} shape="rounded" radius="28" placeholder="Drop foto qurban"></image-slot>
    </div>
  );
}

function HeroDeco({ bold }){
  return (
    <div className="hero-deco" aria-hidden="true">
      <div className="hero-blob" style={{width:420,height:420, background:'rgba(255,140,0,.18)', top:-120, right:-80}}></div>
      <div className="hero-blob" style={{width:300,height:300, background:'rgba(255,255,255,.10)', bottom:-100, left:'8%'}}></div>
      {bold && <div className="hero-blob" style={{width:520,height:520, background:'rgba(255,140,0,.10)', bottom:-260, right:'12%'}}></div>}
    </div>
  );
}

function TrustStrip(){
  const items=['12.000+ Donatur Tepercaya','Diliput 8 Media Nasional','Distribusi 34 Provinsi','Laporan Real-time','Legalitas Resmi & Izin PUB','Tim Berpengalaman'];
  const row=[...items,...items];
  return (
    <div className="trust-strip" aria-hidden="true">
      <div className="marquee">{row.map((t,i)=><span key={i}>{t}</span>)}</div>
    </div>
  );
}
window.TrustStrip = TrustStrip;

function About(){
  return (
    <section className="about section-pad" id="tentang">
      <div className="wrap about-grid">
        <div className="about-imgs reveal">
          <image-slot id="about-1" className="tall" shape="rounded" radius="22" style={{minHeight:340}} placeholder="Foto penyaluran"></image-slot>
          <image-slot id="about-2" shape="rounded" radius="22" style={{minHeight:162}} placeholder="Foto kegiatan"></image-slot>
          <image-slot id="about-3" shape="rounded" radius="22" style={{minHeight:162}} placeholder="Foto anak yatim"></image-slot>
        </div>
        <div className="section-head reveal d1">
          <span className="eyebrow">Tentang Kami</span>
          <h2 className="h-section text-balance">Kami Ada, Karena Kepercayaan Anda</h2>
          <p className="lede text-pretty">Lebih dari sekedar lembaga, kami adalah jembatan penghubung antara kebaikan dan kebutuhan mereka. Qurban Alfatihah menawarkan berbagai pilihan layanan qurban dengan harga dan jenis hewan yang variatif.</p>
          <p className="text-pretty" style={{marginTop:16, color:'var(--ink)'}}>Kami lahir dengan visi sederhana: memberikan kebahagiaan bagi setiap orang untuk merasakan nikmat dan kehangatan daging qurban.</p>
          <div style={{display:'flex',gap:14,marginTop:28,flexWrap:'wrap'}}>
            {[['Niat tulus','Bukan besar-kecilnya pengorbanan'],['Amanah terjaga','Setiap distribusi dilaporkan']].map(([a,b])=>(
              <div key={a} style={{display:'flex',gap:11,alignItems:'flex-start',background:'var(--green-mist)',padding:'14px 18px',borderRadius:14,flex:'1 1 200px'}}>
                <span style={{color:'var(--green)',marginTop:2}}><Ic.check style={{width:20,height:20}}/></span>
                <div><b style={{color:'var(--green-900)'}}>{a}</b><div style={{fontSize:'.86rem',color:'var(--muted)'}}>{b}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;

function Ayat(){
  return (
    <section className="ayat section-pad">
      <div className="ayat-glow" aria-hidden="true"></div>
      <div className="wrap reveal">
        <span className="eyebrow on-dark" style={{justifyContent:'center',display:'flex'}}>Ibadah Qurban</span>
        <p className="ar" lang="ar">فَصَلِّ لِرَبِّكَ وَٱنْحَرْ</p>
        <p className="tr text-balance">“Maka dirikanlah salat karena Tuhanmu; dan berqurbanlah.”</p>
        <p className="src">QS. Al-Kautsar : 2</p>
        <p className="note text-pretty">Setiap pengorbanan tidak akan sia-sia di hadapan Allah. Sesungguhnya Allah tidak memandang besar-kecilnya pengorbanan, melainkan dari niat tulus dan keikhlasannya. Jangan tunda lagi—satu langkah kecil membawa dampak kebaikan bagi mereka yang membutuhkan.</p>
      </div>
    </section>
  );
}
window.Ayat = Ayat;

function WhyUs(){
  const feats=[
    [Ic.shield,'Amanah Terjaga','Setiap amanah dijaga dengan baik—kami pastikan daging tersalurkan tepat ke tangan yang membutuhkan.'],
    [Ic.camera,'Dokumentasi Real-time','Setiap proses kami dokumentasikan langsung, setiap distribusi kami laporkan kepada Anda.'],
    [Ic.users,'Tim Berpengalaman','Dikerjakan oleh tim berpengalaman dengan pemantauan langsung di lapangan.'],
    [Ic.heart,'Dipercaya Nasional','Ribuan donatur dari seluruh Indonesia & diliput media nasional terkemuka.'],
  ];
  return (
    <section className="why section-pad">
      <div className="wrap">
        <div className="section-head reveal" style={{maxWidth:680}}>
          <span className="eyebrow">Mengapa Harus Memilih Kami?</span>
          <h2 className="h-section text-balance">Kepercayaan Anda adalah tanggung jawab utama kami</h2>
          <p className="lede text-pretty">Kami tidak hanya menyembelih hewan qurban, tetapi memastikan setiap kebaikan benar-benar sampai ke tujuannya.</p>
        </div>
        <div className="why-grid">
          {feats.map(([I,t,d],i)=>(
            <div className={'feat reveal d'+(i+1)} key={t}>
              <div className="ic"><I style={{width:26,height:26}}/></div>
              <h3>{t}</h3><p>{d}</p>
            </div>
          ))}
        </div>
        <div className="counters reveal d2">
          <div className="counter"><div className="ring"></div><div className="n"><CountUp to={12000} suffix="+"/></div><div className="l">Donatur tepercaya se-Indonesia</div></div>
          <div className="counter"><div className="ring"></div><div className="n"><CountUp to={8}/> Media</div><div className="l">Nasional telah meliput</div></div>
          <div className="counter"><div className="ring"></div><div className="n">100%</div><div className="l">Distribusi terdokumentasi & dilaporkan</div></div>
        </div>
      </div>
    </section>
  );
}
window.WhyUs = WhyUs;
