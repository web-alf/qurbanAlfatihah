/* data.jsx — content for Qurban Alfatihah (from brief copy) */

window.PROGRAMS = [
  {
    id: 'senyum',
    tag: 'Paling Berdampak', tagGreen: false,
    title: 'Qurbanmu Sejuta Senyum',
    target: '1000 Anak Yatim',
    desc: 'Hadirkan senyuman tulus dari 1000 anak yatim. Bagi mereka, daging qurban adalah makanan mewah yang dinanti setiap Idul Adha. Satu qurban darimu, kebahagiaan bermakna bagi mereka.',
    price: 2750000, from: 'Per ekor kambing',
    raised: 642, goal: 1000, unit: 'anak terjangkau',
    slot: 'prog-senyum',
    link: 'https://qurban.alfatihah.com/campaign/qurbanmu-sejuta-senyum-1000-anak-yatim',
  },
  {
    id: 'hemat',
    tag: 'Hemat Keluarga', tagGreen: true,
    title: 'Qurban Hemat Keluarga',
    target: 'Untuk Keluarga',
    desc: 'Mulai 1,399 juta, ibadah qurban jauh lebih terjangkau tanpa mengurangi keberkahan. Cocok untuk keluarga yang ingin menyebar manfaat lebih luas dengan harga ekonomis.',
    price: 1399000, from: 'Mulai dari',
    raised: 318, goal: 500, unit: 'keluarga berqurban',
    slot: 'prog-hemat',
    link: 'https://qurban.alfatihah.com/campaign/qurban-hemat-keluarga-terbaik-hanya-1399-juta',
  },
  {
    id: 'santri',
    tag: 'Untuk Santri', tagGreen: true,
    title: 'Qurban Santri Penghafal Qur’an',
    target: 'Santri Tahfizh',
    desc: 'Mulai 1,3 juta, titipkan kebahagiaan bagi para santri yang menjaga kalam Allah. Mari hidupkan semangat menghafal Al-Qur’an dengan satu qurban.',
    price: 1300000, from: 'Mulai dari',
    raised: 274, goal: 400, unit: 'santri terjangkau',
    slot: 'prog-santri',
    link: 'https://qurban.alfatihah.com/campaign/qurban-untuk-santri-penghafal-quran',
  },
];

window.MEDIA = [
  { net: 'Indosiar',  title: 'Fokus Indosiar',     sub: 'Liputan Program', slot: 'med-1' },
  { net: 'CNN',       title: 'CNN Live Streaming',  sub: 'Live Report',     slot: 'med-2' },
  { net: 'tvOne',     title: 'tvOne',               sub: 'Berita Nasional', slot: 'med-3' },
  { net: 'tvOne',     title: 'Kabar Pagi tvOne',    sub: 'Program Pagi',    slot: 'med-4' },
  { net: 'Kompas TV', title: 'Kompas TV',           sub: 'Liputan Khusus',  slot: 'med-5' },
  { net: 'Trans TV',  title: 'Trans TV',            sub: 'Berita Sosial',   slot: 'med-6' },
  { net: 'Trans 7',   title: 'Trans 7',             sub: 'Reportase',       slot: 'med-7' },
  { net: 'TATV',      title: 'TATV Jateng',         sub: 'Berita Daerah',   slot: 'med-8' },
];

window.TESTI = [
  { name:'Andini', city:'Surabaya', text:'Saya ragu awalnya berqurban online. Tapi Alfatihah mengirimkan foto dan laporan lengkap. Hati saya benar-benar tenang.' },
  { name:'Rifki', city:'Semarang', text:'Sudah dua kali saya berqurban di sini. Bukan hanya karena amanah, tapi karena saya tahu penyalurannya benar-benar sampai ke anak-anak yang membutuhkan.' },
  { name:'Bunga', city:'Bandung', text:'Melihat video dokumentasinya, saya tidak pernah ragu qurban di sini. Terima kasih Alfatihah sudah menyampaikan qurban saya sampai ke pelosok untuk para santri.' },
];

window.rupiah = (n)=> 'Rp ' + n.toLocaleString('id-ID');
