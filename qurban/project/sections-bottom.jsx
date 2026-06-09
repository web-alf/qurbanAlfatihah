/* sections-bottom.jsx — Programs, Media slider, Testimoni, Docs, CTA, Footer, Order modal */

function Programs({ onOrder }){
  return (
    <section className="programs section-pad" id="program">
      <div className="wrap">
        <div className="section-head reveal" style={{maxWidth:700}}>
          <span className="eyebrow">Pilih Caramu Berbagi Kebahagiaan</span>
          <h2 className="h-section text-balance">Pilihan hewan & harga yang <span className="green-text">variatif</span></h2>
          <p className="lede text-pretty">Tiga program qurban, satu tujuan—menebar senyum tulus. Pilih yang paling pas di hatimu.</p>
        </div>
        <div className="prog-grid">
          {window.PROGRAMS.map((p,i)=>(
            <article className={'prog reveal d'+(i+1)} key={p.id}>
              <div className="prog-media">
                <span className={'prog-tag'+(p.tagGreen?' green':'')}>{p.tag}</span>
                <image-slot id={p.slot} shape="rect" placeholder={'Foto · '+p.title}></image-slot>
              </div>
              <div className="prog-body">
                <h3 className="h-card">{p.title}</h3>
                <p>{p.desc}</p>
                <div className="prog-meta"><span>Target: <b>{p.target}</b></span><span><b>{Math.round(p.raised/p.goal*100)}%</b> tercapai</span></div>
                <div className="prog-progress"><i data-w={Math.round(p.raised/p.goal*100)}></i></div>
                <div className="prog-meta"><span><b>{p.raised}</b> {p.unit}</span><span>dari {p.goal}</span></div>
                <div className="prog-price"><span className="from">{p.from}</span></div>
                <div className="prog-price" style={{marginBottom:0}}><span className="amt">{window.rupiah(p.price)}</span></div>
              </div>
              <div className="prog-foot">
                <button className="btn btn-green" onClick={()=>onOrder(p.id)}>Qurban Sekarang</button>
                <a className="btn btn-white" href={p.link} target="_blank" rel="noreferrer" aria-label="Detail program"><Ic.arrow style={{width:18,height:18}}/></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Programs = Programs;

function MediaSlider(){
  const { useState, useRef, useEffect } = React;
  const [idx,setIdx] = useState(0);
  const trackRef = useRef(null);
  const [per,setPer] = useState(3);
  useEffect(()=>{
    const calc=()=>{ const w=window.innerWidth; setPer(w<680?1:w<1040?2:3); };
    calc(); window.addEventListener('resize',calc); return ()=>window.removeEventListener('resize',calc);
  },[]);
  const data = window.MEDIA;
  const maxIdx = Math.max(0, data.length-per);
  const clamped = Math.min(idx,maxIdx);
  const go=(d)=>setIdx(v=>Math.max(0,Math.min(maxIdx,v+d)));
  const pct = clamped*(100/per);
  return (
    <section className="media section-pad" id="media">
      <div className="wrap">
        <div className="section-head reveal" style={{maxWidth:720}}>
          <span className="eyebrow on-dark">Media Nasional</span>
          <h2 className="h-section text-balance">Kami Telah Dipercaya, Diliput, dan Diakui</h2>
          <p className="lede text-pretty">Komitmen kami bukan sekedar janji, melainkan bukti nyata. Program Qurban Alfatihah telah menjadi sorotan berbagai berita nasional—dampak nyata yang kami ciptakan bersama donatur terbaik seperti Anda.</p>
        </div>
        <div className="media-slider reveal d1">
          <div style={{overflow:'hidden'}}>
            <div className="media-track" ref={trackRef} style={{transform:`translateX(-${pct}%)`}}>
              {data.map((m)=>(
                <div className="media-card" key={m.slot}>
                  <div className="media-thumb">
                    <span className="net">{m.net}</span>
                    <image-slot id={m.slot} shape="rect" placeholder={m.net+' thumbnail'} style={{position:'absolute',inset:0,width:'100%',height:'100%'}}></image-slot>
                    <span className="play" style={{position:'relative',zIndex:2}}><Ic.play style={{width:24,height:24,marginLeft:3}}/></span>
                  </div>
                  <div className="cap">{m.title}<small>{m.sub}</small></div>
                </div>
              ))}
            </div>
          </div>
          <div className="slider-ctrl">
            <button onClick={()=>go(-1)} disabled={clamped===0} aria-label="Sebelumnya"><Ic.left style={{width:22,height:22}}/></button>
            <button onClick={()=>go(1)} disabled={clamped>=maxIdx} aria-label="Berikutnya"><Ic.right style={{width:22,height:22}}/></button>
            <div className="slider-dots">
              {Array.from({length:maxIdx+1}).map((_,i)=>(
                <i key={i} className={i===clamped?'on':''} onClick={()=>setIdx(i)}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.MediaSlider = MediaSlider;

function Testimoni(){
  return (
    <section className="testi section-pad" id="testimoni">
      <div className="wrap">
        <div className="section-head reveal" style={{maxWidth:640}}>
          <span className="eyebrow">Testimoni</span>
          <h2 className="h-section text-balance">Suara Mereka yang Telah Merasakan</h2>
        </div>
        <div className="testi-grid">
          {window.TESTI.map((t,i)=>(
            <figure className={'tcard reveal d'+(i+1)} key={t.name}>
              <div className="quote">”</div>
              <div className="stars">★★★★★</div>
              <p>{t.text}</p>
              <figcaption className="who">
                <span className="av">{t.name[0]}</span>
                <div><div className="nm">{t.name}</div><div className="ct">{t.city}</div></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Testimoni = Testimoni;

function Docs(){
  const slots=[['doc-1','wide'],['doc-2',''],['doc-3','tall'],['doc-4',''],['doc-5',''],['doc-6','wide']];
  return (
    <section className="docs section-pad">
      <div className="wrap">
        <div className="section-head reveal" style={{maxWidth:640}}>
          <span className="eyebrow">Dokumentasi</span>
          <h2 className="h-section text-balance">Momen nyata penyaluran qurban Anda</h2>
          <p className="lede text-pretty">Setiap prosesnya kami rekam—dari penyembelihan hingga senyuman penerima manfaat di pelosok negeri.</p>
        </div>
        <div className="docs-grid reveal d1">
          {slots.map(([id,cls])=>(
            <image-slot key={id} id={id} className={cls} shape="rounded" radius="14" placeholder="Drop foto dokumentasi"></image-slot>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Docs = Docs;

function CtaBand({ onOrder }){
  return (
    <section className="cta-band section-pad">
      <div className="wrap">
        <div className="cta-card reveal">
          <div className="cta-orb" style={{width:300,height:300,top:-120,left:-80}} aria-hidden="true"></div>
          <div className="cta-orb" style={{width:260,height:260,bottom:-120,right:-60}} aria-hidden="true"></div>
          <div style={{position:'relative',zIndex:2}}>
            <span className="eyebrow on-dark" style={{justifyContent:'center',display:'flex'}}>Ambil Peluang Ibadahmu</span>
            <h2 className="h-section text-balance" style={{marginTop:16}}>Ambil peluang ibadah qurban Anda hari ini</h2>
            <p>Satu langkah kecil darimu, sejuta senyum bagi mereka. Jangan tunda lagi kebaikan ini.</p>
            <button className="btn btn-primary" onClick={()=>onOrder()}>Qurban Sekarang Juga! <Ic.arrow className="arr" style={{width:20,height:20}}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
window.CtaBand = CtaBand;

function Footer(){
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo dark/>
            <p className="foot-desc">Qurban Alfatihah merupakan lembaga terpercaya yang menjembatani keikhlasan dan kebaikan Anda dengan menghadirkan senyum tulus dari mereka yang membutuhkan.</p>
            <div className="foot-social">
              <a href="https://wa.me/6281128506752" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Ic.wa style={{width:20,height:20}}/></a>
              <a href="#" aria-label="Instagram"><Ic.ig style={{width:20,height:20}}/></a>
              <a href="#" aria-label="YouTube"><Ic.yt style={{width:20,height:20}}/></a>
              <a href="https://qurban.alfatihah.com" target="_blank" rel="noreferrer" aria-label="Website"><Ic.globe style={{width:20,height:20}}/></a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Program</h4>
            <ul>
              <li><a href="#program">Qurbanmu Sejuta Senyum</a></li>
              <li><a href="#program">Qurban Hemat Keluarga</a></li>
              <li><a href="#program">Qurban Santri Penghafal Qur’an</a></li>
              <li><a href="#tentang">Tentang Kami</a></li>
              <li><a href="#media">Media Nasional</a></li>
            </ul>
          </div>
          <div className="foot-col foot-contact">
            <h4>Kontak Kami</h4>
            <div className="row"><span className="ic"><Ic.pin style={{width:18,height:18}}/></span><span>Jl. Ngablak Indah II No.24a, Bangetayu Kulon, Kec. Genuk, Kota Semarang, Jawa Tengah 50115</span></div>
            <div className="row"><span className="ic"><Ic.mail style={{width:18,height:18}}/></span><span>admin@alfatihah.com</span></div>
            <div className="row"><span className="ic"><Ic.phone style={{width:18,height:18}}/></span><span>+62 811-2850-6752</span></div>
          </div>
        </div>

        <div className="legal">
          <span className="badge">SK Menkumham <b>AHU-0009981.AH.01.07/2017</b></span>
          <span className="badge">NPWP <b>82.204.833.6-503.000</b></span>
          <span className="badge">Izin BWI <b>3.3.00444</b></span>
          <span className="badge">Izin PUB <b>B/4745/460/VII/2024</b></span>
        </div>

        <p className="disclaimer">This site is not a part of the Facebook website or Facebook INC. Additionally, this site is NOT endorsed by Facebook in ANY WAY. FACEBOOK is a trademark of Facebook INC.</p>

        <div className="foot-bottom">
          <span>© 2026 Qurban Alfatihah Inc.</span>
          <span>Tebar Senyum Berkah · Semarang, Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

/* ---------- Order modal ---------- */
function OrderModal({ open, preset, onClose }){
  const { useState, useEffect } = React;
  const [sel,setSel] = useState(preset||'senyum');
  const [qty,setQty] = useState(1);
  useEffect(()=>{ if(preset) setSel(preset); },[preset,open]);
  useEffect(()=>{
    document.body.style.overflow = open?'hidden':'';
    return ()=>{ document.body.style.overflow=''; };
  },[open]);
  const prog = window.PROGRAMS.find(p=>p.id===sel) || window.PROGRAMS[0];
  const total = prog.price*qty;
  const submit=(e)=>{
    e.preventDefault();
    onClose(true);
  };
  return (
    <div className={'modal-bg'+(open?' open':'')} onClick={(e)=>{ if(e.target.classList.contains('modal-bg')) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Pesan Qurban">
        <div className="modal-head">
          <h3>Qurban Sekarang Juga!</h3>
          <p>Isi data singkat, tim kami lanjutkan via WhatsApp.</p>
          <button className="x" onClick={()=>onClose()} aria-label="Tutup">✕</button>
        </div>
        <form className="modal-body" onSubmit={submit}>
          <div className="field">
            <label>Pilih Program</label>
            <div className="prog-pick">
              {window.PROGRAMS.map(p=>(
                <label key={p.id} className={sel===p.id?'sel':''}>
                  <input type="radio" name="prog" checked={sel===p.id} onChange={()=>setSel(p.id)}/>
                  <span>{p.title}</span>
                  <span className="pp-price">{window.rupiah(p.price)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Jumlah</label>
            <select value={qty} onChange={e=>setQty(+e.target.value)}>
              {[1,2,3,4,5,7,10].map(n=><option key={n} value={n}>{n} ekor / paket</option>)}
            </select>
          </div>
          <div className="field"><label>Nama Lengkap</label><input required placeholder="Nama Anda / atas nama"/></div>
          <div className="field"><label>Nomor WhatsApp</label><input required type="tel" placeholder="08xxxxxxxxxx"/></div>
          <div className="summary">
            <span style={{fontWeight:700,color:'var(--green-900)'}}>Total Donasi</span>
            <span className="tot">{window.rupiah(total)}</span>
          </div>
          <button className="btn btn-primary btn-lg" type="submit" style={{width:'100%'}}>
            <Ic.wa style={{width:20,height:20}}/> Lanjut ke WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
window.OrderModal = OrderModal;
