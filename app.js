/* ===================================================================
   Heavenly Tiers — Minecraft PvP Ranking Platform
   Single-file SPA with localStorage persistence.
   Passwords are Base64-encoded for demo only — NOT secure.
   =================================================================== */

// ===== API CONFIG =====
// Change this if your Express server is on a different device
const API_BASE = 'http://localhost:3000';

// ===== SVG ICONS (reusable strings) =====
const S={
  home:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>',
  trophy:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z"/></svg>',
  flask:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v5.17a2 2 0 01-.59 1.42L4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4l-5.41-5.41A2 2 0 0114 8.17V3"/></svg>',
  code:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
  crown:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4z"/><path d="M5 16h14v2H5z"/></svg>',
  search:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  sun:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  moon:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
  copy:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  trash:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  plus:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  save:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
  clock:'<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  warn:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  lock:'<svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  person:'<svg viewBox="0 0 24 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="0" width="16" height="16" rx="2"/><rect x="2" y="18" width="20" height="14" rx="1"/><rect x="2" y="34" width="8" height="14" rx="1"/><rect x="14" y="34" width="8" height="14" rx="1"/></svg>',
  shield:'<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  sword:'<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M15 21l6-6"/></svg>',
  check:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
  x:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
  info:'<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  inbox:'<svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M22 12h-6l-2 3H10l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>',
  people:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
  arrowR:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  settings:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  log:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  diamond:'<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 0L12 6L6 12L0 6Z"/></svg>',
  logout:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  edit:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  image:'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  discord:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 00-.031-.03z"/></svg>'
};

// Title SVG icons (small inline)
const TI={
  Rookie:'<svg width="14" height="14" viewBox="0 0 24 24" fill="#e8a464"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#fff" stroke-width="1.5" fill="none"/></svg>',
  Novice:'<svg width="14" height="14" viewBox="0 0 24 24" fill="#60a5fa"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4" stroke="#fff" stroke-width="1.5"/></svg>',
  Cadet:'<svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>',
  Specialist:'<svg width="14" height="14" viewBox="0 0 24 24" fill="#34d399"><path d="M12 2L2 12l10 10 10-10z"/></svg>',
  'Combat Ace':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M15 21l6-6"/></svg>',
  'Combat Master':'<svg width="14" height="14" viewBox="0 0 24 24" fill="#c084fc"><path d="M12 2L2 12l10 10 10-10z"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>',
  'Combat Grandmaster':'<svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700"><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4z"/><path d="M5 16h14v3H5z"/></svg>',
  'Angelic Master':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e0e7ff" stroke-width="1.5"><path d="M12 2v6M12 16v6M4 8c2 2 4 2.5 8 2.5S18 10 20 8M4 16c2-2 4-2.5 8-2.5S18 14 20 16" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#e0e7ff" stroke="none"/></svg>',
  'Heavenly Descendent':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="1.5"><path d="M12 2l2.5 6L21 9l-5 4 1.5 7L12 17l-5.5 3L8 13 3 9l6.5-1z" fill="#FFD700" stroke="#FFD700"/></svg>'
};

// Title pill helper — coloured badge with icon
function titlePill(name){
  const icon=TI[name]||'';
  const cls=name.replace(/\s+/g,'-');
  return name?`<span class="title-pill tp-${cls}">${icon} ${esc(name)}</span>`:'';
}

// ===== CONSTANTS =====
const DEFAULT_MODES=['Axe','Sword','Pot','NethPot','UHC','Crystal','SMP','Mace','Lifesteal','Spear','Spear-Mace'];
const DEFAULT_MODE_IC={
  Overall:{u:'https://iili.io/BpVgiN9.png'},
  Axe:{u:'https://iili.io/BpERGbR.png'},
  Sword:{u:'https://iili.io/BpVTUMB.png'},
  Pot:{u:'https://iili.io/BpEMgff.png'},
  NethPot:{u:'https://iili.io/BpEMSiG.png'},
  UHC:{u:'https://iili.io/Bp1ZRGs.png'},
  Crystal:{u:'https://iili.io/BpEuVkv.png'},
  SMP:{u:'https://iili.io/BpGdCGV.png'},
  Mace:{u:'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/63/Mace.png/revision/latest?cb=20260330015956'},
  Lifesteal:{u:'https://iili.io/BpVhPUu.png'},
  Spear:{u:'https://iili.io/BpEPvvS.png'},
  'Spear-Mace':{u:'https://iili.io/BpE4Qix.png'}
};

// lsg/lss — cloud when ready, localStorage always as fallback layer
function lsg(k,d){return window.getCloudValue?window.getCloudValue(k,d):d}
function lss(k,v){if(window.setCloudValue){window.setCloudValue(k,v)}}
function savePlayers(){lss('hp',window.players)}

// Read directly from localStorage NOW (Firebase module not yet executed at this point).
// cloud-ready handler will upgrade to Firestore data when it arrives.
function _lsGet(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}

window.players = _lsGet('hp',[]);

// Dynamic mode list + icons — persisted in localStorage "hm" and "hmi"
let MODES  = _lsGet('hm', DEFAULT_MODES);
let MODE_IC= _lsGet('hmi', DEFAULT_MODE_IC);
// Ensure Overall icon is always present
if(!MODE_IC.Overall)MODE_IC.Overall=DEFAULT_MODE_IC.Overall;
function saveModes(){lss('hm',MODES);lss('hmi',MODE_IC)}

const TIERS=['HT1','HT2','HT3','HT4','HT5','LT1','LT2','LT3','LT4','LT5'];
const TIER_PTS={HT1:60,LT1:45,HT2:30,LT2:20,HT3:10,LT3:6,HT4:4,LT4:3,HT5:2,LT5:1};
const TIER_ORD={HT1:0,LT1:1,HT2:2,LT2:3,HT3:4,LT3:5,HT4:6,LT4:7,HT5:8,LT5:9};
const LT2_OK=['HT1','LT1','HT2','LT2'];
// Owner seeding handled via setup flow — no hardcoded creds in source.
// First person to sign up with role=Owner if no Owner exists yet.

// SVG fallback shape for broken mode icons
const MODE_FB='<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="20" height="20" rx="4"/><path d="M10 14h8M14 10v8"/></svg>';

// Person silhouette SVG for cracked skins
const PERSON_SM=`<div class="svgp">${S.person}</div>`;
const PERSON_LG=`<div class="svgp svgp-lg">${S.person}</div>`;

// ===== PLAYER DATA (cloud synced across all visitors) =====
// players loaded after lsg is defined — see below

// ===== CACHED TESTER DATA (for panel display) =====
let testerCache={};

// ===== LOCALSTORAGE =====

// ── Backwards-compat migration: add skinType to old player objects ──
(function migrateSkinTypes(){
  let changed=false;
  window.players.forEach(p=>{
    if(!p.skinType){
      if(p.isPremium)p.skinType='java';
      else if(p.skinUrl)p.skinType='raw';
      else p.skinType='none';
      changed=true;
    }
  });
  if(changed)savePlayers();
})();


// ===== POINTS & TITLE =====
function getPoints(p){let s=0;for(const m of MODES){const t=p.tiers[m];if(t&&TIER_PTS[t])s+=TIER_PTS[t]}return s}
function getMissLT2(p){const ms=[];for(const m of MODES){const t=p.tiers[m];if(!t||!LT2_OK.includes(t))ms.push(m)}return ms}

function getTitle(p){
  const pts=getPoints(p);
  if(pts>=700)return{icon:'Heavenly Descendent',name:'Heavenly Descendent',pts};
  if(pts>=550)return{icon:'Angelic Master',name:'Angelic Master',pts};
  if(pts>=400)return{icon:'Combat Grandmaster',name:'Combat Grandmaster',pts};
  if(pts>=250){const ms=getMissLT2(p);if(!ms.length)return{icon:'Combat Master',name:'Combat Master',pts,miss:[]};return{icon:'Combat Ace',name:'Combat Ace',pts,miss:ms}}
  if(pts>=100)return{icon:'Combat Ace',name:'Combat Ace',pts};
  if(pts>=50)return{icon:'Specialist',name:'Specialist',pts};
  if(pts>=20)return{icon:'Cadet',name:'Cadet',pts};
  if(pts>=10)return{icon:'Novice',name:'Novice',pts};
  if(pts>=1)return{icon:'Rookie',name:'Rookie',pts};
  return{icon:'',name:'Unranked',pts:0}
}

// Progress to next title
const TITLE_THRESHOLDS=[{n:'Unranked',min:0},{n:'Rookie',min:1},{n:'Novice',min:10},{n:'Cadet',min:20},{n:'Specialist',min:50},{n:'Combat Ace',min:100},{n:'Combat Master',min:250},{n:'Combat Grandmaster',min:400},{n:'Angelic Master',min:550},{n:'Heavenly Descendent',min:700}];
function getProgress(pts){
  for(let i=TITLE_THRESHOLDS.length-1;i>=0;i--){
    if(pts>=TITLE_THRESHOLDS[i].min){
      const cur=TITLE_THRESHOLDS[i];
      const next=TITLE_THRESHOLDS[i+1];
      if(!next)return{pct:100,label:'Max title reached!'};
      const range=next.min-cur.min;
      const prog=pts-cur.min;
      return{pct:Math.min(100,Math.round(prog/range*100)),label:`${pts}/${next.min} pts to ${next.n}`}
    }
  }
  return{pct:0,label:'0 points'}
}

// ===== AUTH =====
// gU reads localStorage directly — works before cloud-ready, stays in sync because
// sU writes to both localStorage (via setCloudValue) AND Firestore.
function gU(){
  // prefer cloudStore if Firebase has loaded, else localStorage
  if(window.getCloudValue&&window.cloudStore&&window.cloudStore['hu']!==undefined)
    return window.cloudStore['hu']||[];
  return _lsGet('hu',[]);
}
function sU(u){
  // write to localStorage immediately so next gU() call sees it even before cloud-ready
  try{localStorage.setItem('hu',JSON.stringify(u))}catch(e){}
  lss('hu',u); // also writes to Firestore via setCloudValue
}
function gC(){
  try{
    const cached=JSON.parse(localStorage.getItem('hcu'));
    if(!cached)return null;
    // Role can change server-side (promote/demote) after this session snapshot was cached —
    // always resolve the live role from the authoritative user list so badges/permissions
    // never show a stale role like "Member" after being promoted to Admin.
    const live=gU().find(x=>x.email===cached.email);
    if(live&&live.role!==cached.role){
      cached.role=live.role;
      sC(cached); // keep the cache in sync so subsequent reads are cheap and consistent
    }
    return cached;
  }catch(e){return null}
}
function sC(u){localStorage.setItem('hcu',JSON.stringify(u))}

// Seed owner
// No auto-seed. First sign-up becomes Owner if none exists (see doSign).

// Tester IDs seeded post cloud-ready (see init at bottom) — avoids race with Firestore load.

// ===== SETTINGS =====
function gS(){return lsg('hs',{title:'Heavenly Tiers',tagline:'Rise Through the Ranks',discord:'https://discord.gg/M58KAtGzhy',serverIp:'heavenlyevents.falix.gg'})}
function apS(){
  const s=gS();
  document.getElementById('heroT').textContent=s.title;
  document.getElementById('heroS').textContent=s.tagline;
  document.getElementById('hdrT').textContent=s.title;
  document.title=s.title;
  const ipEl=document.getElementById('srvIp');
  if(ipEl)ipEl.textContent=s.serverIp;
}

// ===== LOG =====
function logA(d,payload){let l=lsg('hal',[]);l.unshift({ts:new Date().toLocaleString(),desc:d,payload:payload||null});if(l.length>100)l=l.slice(0,100);lss('hal',l)}

// ===== TOAST =====
function toast(m,t='info'){
  const w=document.getElementById('twC');
  const e=document.createElement('div');
  const ic=t==='success'?S.check:t==='error'?S.x:S.info;
  e.className='tst '+(t==='success'?'s':t==='error'?'e':'i');
  e.innerHTML=ic+'<span>'+esc(m)+'</span>';
  w.appendChild(e);
  setTimeout(()=>{e.classList.add('out');setTimeout(()=>e.remove(),200)},3000);
}

// ===== THEME =====
function toggleTheme(){
  document.documentElement.classList.toggle('light');
  localStorage.setItem('ht-th',document.documentElement.classList.contains('light')?'light':'dark');
  updThemeIcon();
}
function updThemeIcon(){
  document.getElementById('thmBtn').innerHTML=document.documentElement.classList.contains('light')?S.moon:S.sun;
}
(function(){if(localStorage.getItem('ht-th')==='light')document.documentElement.classList.add('light')})();

// ===== MODAL =====
function openM(id){document.getElementById(id).classList.add('vis')}
function closeMs(){document.querySelectorAll('.mbg').forEach(m=>m.classList.remove('vis'));closeHam()}
function showAuthTab(t){
  document.getElementById('authLogin').style.display=t==='login'?'':'none';
  document.getElementById('authSign').style.display=t==='signup'?'':'none';
  document.getElementById('atL').className=t==='login'?'act':'';
  document.getElementById('atS').className=t==='signup'?'act':'';
}

// ===== ESCAPE HTML =====
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

// ===== HAMBURGER =====
function toggleHam(){
  const b=document.getElementById('hamBtn');
  const d=document.getElementById('hdrop');
  b.classList.toggle('open');
  d.classList.toggle('open');
}
function closeHam(){
  document.getElementById('hamBtn').classList.remove('open');
  document.getElementById('hdrop').classList.remove('open');
}
document.addEventListener('click',e=>{
  const hd=document.getElementById('hdrop');
  const hb=document.getElementById('hamBtn');
  if(hd.classList.contains('open')&&!hd.contains(e.target)&&!hb.contains(e.target))closeHam();
});

// ===== SPA ROUTER =====
let curPg='home';
const NAV_ITEMS=[
  {id:'home',label:'Home',svg:S.home},
  {id:'rankings',label:'Rankings',svg:S.trophy},
  {id:'api',label:'API',svg:S.code},
  {id:'panel',label:'Panel',svg:S.crown,auth:true}
];

function showPage(n){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('vis'));
  const el=document.getElementById('pg-'+n);
  if(el){el.classList.add('vis');curPg=n}
  updNavActive();
  closeHam();
  if(n==='home')animStats();
  if(n==='rankings')renderRank();
  if(n==='panel')initPanel();
  window.scrollTo({top:0});
}

function updNavActive(){
  // Desktop
  document.querySelectorAll('.nvd span').forEach(s=>s.classList.remove('act'));
  const nv=document.getElementById('nv-'+curPg);if(nv)nv.classList.add('act');
  // Mobile bottom tabs
  document.querySelectorAll('.btab span').forEach(s=>s.classList.remove('act'));
  const bt=document.getElementById('bt-'+curPg);if(bt)bt.classList.add('act');
  // Hamburger
  document.querySelectorAll('.hdrop span').forEach(s=>s.classList.remove('act'));
  const hd=document.getElementById('hd-'+curPg);if(hd)hd.classList.add('act');
}

// ===== AUTH UI =====
function upAuth(){
  const c=gC();
  const a=document.getElementById('authA');
  const show=c&&(c.role==='Owner'||c.role==='Admin');
  // Desktop nav
  document.getElementById('nv-panel').style.display=show?'':'none';
  // Mobile bottom + hamburger
  const bp=document.getElementById('bt-panel');if(bp)bp.style.display=show?'':'none';
  const hp=document.getElementById('hd-panel');if(hp)hp.style.display=show?'':'none';

  if(c){
    const icons={Owner:S.crown,Admin:S.shield,Member:S.sword};
    const colors={Owner:'#FFD700',Admin:'#60a5fa',Member:'#9ca3af'};
    a.innerHTML=`<div class="bb" style="background:${colors[c.role]};color:#000">${icons[c.role]} ${c.role}<div class="dd"><button onclick="doOut()">${S.logout} Logout</button><button onclick="openDangerZone()" style="color:#ff3860">⚠ Delete Account</button></div></div>`;
  }else{
    a.innerHTML=`<button class="btn-g" onclick="openM('authM')" style="font-size:12px;padding:6px 14px">Login</button>`;
  }
}

let _pendingOwnerLogin=null;
function doLogin(){
  const e=document.getElementById('lE').value.trim().toLowerCase();
  const p=document.getElementById('lP').value;
  if(!e||!p)return toast('Fill in all fields','error');
  const us=gU(),u=us.find(x=>x.email===e&&x.password===btoa(p));
  if(!u)return toast('Invalid credentials','error');
  if(u.role==='Owner'){
    _pendingOwnerLogin=u;
    closeMs();
    openOwnerPinStep();
    return;
  }
  sC(u);closeMs();upAuth();toast('Logged in as '+u.role,'success');
}
function openOwnerPinStep(){
  const u=_pendingOwnerLogin;if(!u)return;
  document.getElementById('opPinInput').value='';
  document.getElementById('opPinConfirm').value='';
  if(u.pin){
    document.getElementById('opPinTitle').textContent='Enter Owner PIN';
    document.getElementById('opPinDesc').textContent='Two-step verification is enabled for the Owner account.';
    document.getElementById('opPinConfirmWrap').style.display='none';
  }else{
    document.getElementById('opPinTitle').textContent='Set Owner PIN';
    document.getElementById('opPinDesc').textContent='First-time setup — choose a 4-digit PIN to protect the Owner account. You will need it on every future login.';
    document.getElementById('opPinConfirmWrap').style.display='block';
  }
  openM('ownerPinM');
}
function submitOwnerPin(){
  const u=_pendingOwnerLogin;if(!u)return;
  const val=document.getElementById('opPinInput').value.trim();
  if(!/^\d{4}$/.test(val))return toast('PIN must be exactly 4 digits','error');
  if(u.pin){
    if(val!==u.pin)return toast('Incorrect PIN','error');
    closeMs();sC(u);upAuth();toast('Logged in as Owner','success');
    _pendingOwnerLogin=null;
  }else{
    const conf=document.getElementById('opPinConfirm').value.trim();
    if(val!==conf)return toast('PINs do not match','error');
    let us=gU();
    const idx=us.findIndex(x=>x.email===u.email);
    if(idx>-1){us[idx].pin=val;sU(us);u.pin=val;}
    closeMs();sC(u);upAuth();toast('Owner PIN set. Logged in as Owner','success');
    _pendingOwnerLogin=null;
  }
}
function cancelOwnerPin(){
  _pendingOwnerLogin=null;
  closeMs();
}
function doSign(){
  const n=document.getElementById('sN').value.trim();
  const e=document.getElementById('sE').value.trim().toLowerCase();
  const p=document.getElementById('sP').value;
  const p2=document.getElementById('sP2').value;
  if(!n||!e||!p)return toast('Fill in all fields','error');
  if(p!==p2)return toast('Passwords do not match','error');
  if(p.length<4)return toast('Password too short (min 4 chars)','error');
  let us=gU();if(us.find(x=>x.email===e))return toast('Email already registered','error');
  const r=us.length===0?'Owner':'Member'; // first signup = Owner
  const nu={email:e,username:n,password:btoa(p),role:r};
  us.push(nu);sU(us);sC(nu);closeMs();upAuth();toast('Account created! Welcome, '+n,'success');
}
function doOut(){
  localStorage.removeItem('hcu');
  upAuth();
  showPage('home');
  toast('Logged out','info');
}

function openDangerZone(){
  const c=gC();if(!c)return;
  closeMs();
  document.getElementById('delAcctUn').textContent=c.username||c.email;
  const inp=document.getElementById('delAcctInput');
  inp.value='';
  checkDelAcctInput();
  openM('delAcctM');
}
function checkDelAcctInput(){
  const c=gC();if(!c)return;
  const btn=document.getElementById('delAcctBtn');
  const match=document.getElementById('delAcctInput').value===(c.username||c.email);
  btn.disabled=!match;
  btn.style.opacity=match?'1':'.5';
  btn.style.cursor=match?'pointer':'not-allowed';
}
function doDeleteAccount(){
  const c=gC();if(!c)return;
  if(document.getElementById('delAcctInput').value!==(c.username||c.email))return;
  if(c.role==='Owner')return toast('The Owner account cannot be self-deleted — transfer ownership first','error');
  let us=gU();
  us=us.filter(x=>x.email!==c.email);
  sU(us);
  logA(`${c.username||c.email} deleted their own account`);
  localStorage.removeItem('hcu');
  closeMs();
  upAuth();
  showPage('home');
  toast('Account deleted','success');
}

// ===== SEARCH (150ms debounce) =====
let sDeb=null;
function onSearch(){
  clearTimeout(sDeb);
  sDeb=setTimeout(()=>{if(curPg==='rankings')renderRank()},150);
}

// ===== COPY IP =====
function copyIP(){
  navigator.clipboard.writeText(gS().serverIp)
    .then(()=>toast('IP copied!','success'))
    .catch(()=>toast('Failed to copy','error'));
}

// ===== ANIMATED STATS =====
function animStats(){
  const regs=new Set(window.players.map(p=>p.region));
  const targets={players:window.players.length,modes:MODES.length,regions:regs.size||6};
  document.querySelectorAll('#statsR .sn').forEach(el=>{
    const key=el.dataset.t;const end=targets[key]||0;
    if(end===0){el.textContent='0';return}
    let start=0;const dur=600;const startTime=performance.now();
    function step(now){
      const elapsed=now-startTime;const progress=Math.min(elapsed/dur,1);
      const eased=1-Math.pow(1-progress,3);
      el.textContent=Math.round(eased*end);
      if(progress<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ===== STARS =====
function initStars(){
  const c=document.getElementById('stars');
  for(let i=0;i<50;i++){
    const s=document.createElement('span');
    s.className='star';
    s.style.left=Math.random()*100+'%';
    s.style.top=(80+Math.random()*20)+'%';
    s.style.width=(1+Math.random())+'px';
    s.style.height=s.style.width;
    s.style.animationDuration=(4+Math.random()*6)+'s';
    s.style.animationDelay=(Math.random()*6)+'s';
    c.appendChild(s);
  }
}


// ===== SKIN SYSTEM =====
// Determines effective skin type (handles legacy isPremium flag)
function skinType(p){
  if(p.skinType)return p.skinType;
  if(p.isPremium)return 'java';
  if(p.skinUrl)return 'raw';
  return 'none';
}

// Returns the best static body-render URL for the table row image
function getBodyRenderUrl(p){
  const st=skinType(p);
  if(st==='java'){
    return 'https://render.crafty.gg/3d/bust/'+encodeURIComponent(p.uuid||p.username);
  }
  if(st==='bedrock'){
    if(p.renderUrl)return p.renderUrl; // cached 3D bust URL (resolved via textureHash below)
    return null; // not resolved yet — table cell falls back to placeholder, async resolves + re-renders
  }
  if(st==='raw')return null; // no known-identity — canvas fallback only
  return null;
}

// Get the raw skin texture URL (for skinview3d and canvas renderer)
async function fetchSkinTexture(p){
  const st=skinType(p);
  if(st==='java'){
    return 'https://mc-heads.net/skin/'+encodeURIComponent(p.uuid||p.username);
  }
  if(st==='bedrock'&&p.xuid){
    try{
      const r=await fetch('https://api.geysermc.org/v2/skin/'+p.xuid);
      if(r.ok){
        const d=await r.json();
        if(d.texture_id)return 'https://textures.minecraft.net/texture/'+d.texture_id;
      }
    }catch(e){}
  }
  if(p.skinUrl)return p.skinUrl;
  return null;
}

// Fetch Bedrock XUID from gamertag via GeyserMC
async function fetchBedrockXUID(gamertag){
  try{
    const r=await fetch('https://api.geysermc.org/v2/xbox/xuid/'+encodeURIComponent(gamertag));
    if(r.ok){const d=await r.json();return d.xuid||null;}
  }catch(e){}
  return null;
}

// Draw a flat 2D front-facing character from a skin texture PNG onto a canvas.
// Layout follows the standard Minecraft 64x64 1.8+ skin UV map.
function drawSkin2DFront(canvas,img,scale){
  const s=scale||3;
  // Character grid: 16 wide × 32 tall skin pixels → canvas size
  canvas.width=16*s; canvas.height=32*s;
  const ctx=canvas.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw(src_x,src_y,src_w,src_h, dst_x,dst_y) — all in skin-pixel units, scaled
  const d=(sx,sy,sw,sh,dx,dy)=>ctx.drawImage(img,sx,sy,sw,sh,dx*s,dy*s,sw*s,sh*s);

  // ════════════════════════════════════════════════════════
  //  UV COORDINATES — Standard 64×64 Minecraft 1.8+ skin map
  //  Reference: attached layout image
  // ════════════════════════════════════════════════════════

  // ── Layer 1 ──────────────────────────────────────────────
  // Head face          src(8,8,8,8)     → char pos (4,0)
  d( 8,  8, 8, 8,  4,  0);
  // Body front         src(20,20,8,12)  → char pos (4,8)
  d(20, 20, 8,12,  4,  8);
  // Right arm front    src(44,20,4,12)  → char pos (0,8)
  d(44, 20, 4,12,  0,  8);
  // Left arm front     src(36,52,4,12)  → char pos (12,8)  [1.8+ lower half]
  d(36, 52, 4,12, 12,  8);
  // Right leg front    src(4,20,4,12)   → char pos (4,20)
  d( 4, 20, 4,12,  4, 20);
  // Left leg front     src(20,52,4,12)  → char pos (8,20)  [1.8+ lower half]
  d(20, 52, 4,12,  8, 20);

  // ── Layer 2 / Second Layer (outer overlay) ────────────────
  // Hat / head overlay src(40,8,8,8)    → char pos (4,0)
  d(40,  8, 8, 8,  4,  0);
  // Body overlay       src(20,36,8,12)  → char pos (4,8)
  d(20, 36, 8,12,  4,  8);
  // Right arm overlay  src(44,36,4,12)  → char pos (0,8)
  d(44, 36, 4,12,  0,  8);
  // Left arm overlay   src(52,52,4,12)  → char pos (12,8)
  d(52, 52, 4,12, 12,  8);
  // Right leg overlay  src(4,36,4,12)   → char pos (4,20)
  d( 4, 36, 4,12,  4, 20);
  // Left leg overlay   src(4,52,4,12)   → char pos (8,20)
  d( 4, 52, 4,12,  8, 20);

  // ── Subtle drop shadow to suggest depth ───────────────────
  ctx.save();
  ctx.globalCompositeOperation='multiply';
  ctx.globalAlpha=0.18;
  ctx.fillStyle='#000';
  // Right edge shadow on torso
  ctx.fillRect(11*s,8*s,1*s,12*s);
  // Bottom shadow on legs
  ctx.fillRect(4*s,31*s,8*s,1*s);
  ctx.restore();
}

// Render a raw skin PNG URL onto a canvas element using the 2D flat method
function renderRawCanvas(canvas,skinUrl,scale){
  if(!skinUrl)return;
  const img=new Image();
  img.crossOrigin='anonymous';
  img.onload=()=>drawSkin2DFront(canvas,img,scale||3);
  img.onerror=()=>{/* leave blank */};
  img.src=skinUrl;
}

// Process all canvas skin placeholders in the rankings table
// Called after renderRank inserts HTML into the DOM
function processTableSkinCanvases(){
  document.querySelectorAll('canvas[data-skin-url]').forEach(c=>{
    if(c.dataset.rendered)return;
    c.dataset.rendered='1';
    renderRawCanvas(c,c.dataset.skinUrl,3);
  });
}

// Build the table-row skin cell HTML for any player type
function tableSkinCell(p,idx){
  const st=skinType(p);
  const bodyUrl=getBodyRenderUrl(p);
  if(bodyUrl){
    // Java or Bedrock with a known render URL — use img tag (already a 3D render)
    const skid='sk'+idx;
    const img=document.createElement('img');
    img.className='sk-body';
    img.src=bodyUrl;
    img.alt=p.username;
    img.onload=function(){const prev=document.getElementById(skid);if(prev)prev.style.display='none';};
    img.onerror=function(){this.style.display='none';const prev=document.getElementById(skid);if(prev)prev.style.display='none';};
    const sk=document.createElement('div');
    sk.className='sk-sh sk';
    sk.id=skid;
    // Return a wrapper that we'll use innerHTML on — attach elements after
    const wrap=document.createElement('span');
    wrap.style.display='contents';
    wrap.appendChild(sk);
    wrap.appendChild(img);
    // Return as temp container; will be resolved by postRender
    // For innerHTML compat: embed as data-attrs and let processTableSkinCanvases handle
    return '<div class="sk-sh sk" id="'+skid+'"></div>'
      +'<img class="sk-body" src="'+esc(bodyUrl)+'" alt="'+esc(p.username)+'" '
      +'onload="(function(el){var s=document.getElementById(\''+skid+'\');if(s)s.style.display=\'none\';})(this)" '
      +'onerror="this.style.display=\'none\';var s=document.getElementById(\''+skid+'\');if(s)s.style.display=\'none\';" />';
  }
  if(st==='raw'&&p.skinUrl){
    // Raw PNG — use canvas renderer
    return '<canvas class="sk-canvas" data-skin-url="'+esc(p.skinUrl)+'" width="40" height="80"></canvas>';
  }
  if(st==='bedrock'){
    if(p.xuid){
      return '<canvas class="sk-canvas" width="40" height="80" data-xuid="'+esc(p.xuid)+'" data-username="'+esc(p.username)+'" data-rendered=""></canvas>';
    }
    // No XUID yet — kick off async lookup, show skeleton meanwhile
    if(p.bedrockGt&&!p.xuid){
      // async resolve — will update on next renderRank after save
      fetchBedrockXUID(p.bedrockGt).then(x=>{if(x){p.xuid=x;savePlayers();}});
    }
    return PERSON_SM;
  }
  // Fallback: person silhouette
  return PERSON_SM;
}

// Process async Bedrock skin canvases (after table is in DOM)
async function processBedrockCanvases(){
  const els=document.querySelectorAll('canvas[data-xuid]:not([data-rendered])');
  for(const c of els){
    const xuid=c.dataset.xuid;
    if(!xuid)continue;
    c.removeAttribute('data-xuid'); // prevent re-processing
    try{
      const r=await fetch('https://api.geysermc.org/v2/skin/'+xuid);
      if(r.ok){
        const d=await r.json();
        if(d.texture_id&&document.contains(c)){
          // Build a 3D bust render from the Mojang-CDN texture hash GeyserMC gave us —
          // VZGE (visage.surgeplay.com) accepts raw texture IDs directly, no Mojang account needed.
          const bustUrl='https://visage.surgeplay.com/bust/160/'+d.texture_id;
          const un=c.dataset.username;
          const p=un?window.players.find(x=>x.username===un):null;
          if(p){p.renderUrl=bustUrl;savePlayers();}
          const img=document.createElement('img');
          img.className='sk-body';
          img.src=bustUrl;
          img.alt=un||'';
          img.onerror=function(){
            // VZGE failed — fall back to the flat 2D texture render
            renderRawCanvas(c,'https://textures.minecraft.net/texture/'+d.texture_id,3);
            c.style.display='';
          };
          c.replaceWith(img);
        }
      }
    }catch(e){}
  }
}

// Initialise a skinview3d animated viewer inside a container element
function initSkinViewer(container,p,w,h){
  container.innerHTML='';
  if(!window.skinview3d){
    // skinview3d failed to load — fallback to 2D canvas
    const fallback=document.createElement('canvas');
    fallback.style.cssText='width:'+(w||120)+'px;height:'+(h||240)+'px;border-radius:10px;background:var(--el)';
    container.appendChild(fallback);
    fetchSkinTexture(p).then(url=>{ if(url)renderRawCanvas(fallback,url,Math.floor((w||120)/16)); });
    return;
  }
  const canvas=document.createElement('canvas');
  container.appendChild(canvas);
  let viewer;
  try{
    viewer=new skinview3d.SkinViewer({canvas,width:w||120,height:h||240});
  }catch(e){return;}
  viewer.autoRotate=true;
  viewer.autoRotateSpeed=1.5;
  viewer.zoom=0.85;
  try{viewer.animation=new skinview3d.WalkingAnimation();viewer.animation.speed=0.4;}catch(e){}
  try{viewer.renderer.setClearColor(0x000000,0);}catch(e){} // transparent bg
  fetchSkinTexture(p).then(url=>{
    if(url){try{viewer.loadSkin(url);}catch(e){}}
  });
}

// ===== RANKINGS =====
let actMode='Overall';

function buildTabs(){
  const tc=document.getElementById('mTabs');tc.innerHTML='';

  // Sliding gold indicator
  const ind=document.createElement('div');
  ind.className='tab-ind';ind.id='tabInd';
  tc.appendChild(ind);

  ['Overall',...MODES].forEach(m=>{
    const ic=MODE_IC[m]||{u:''};
    const d=document.createElement('div');
    d.className='tab'+(m===actMode?' act':'');
    d.onclick=()=>{actMode=m;slideTabTo(d);renderRank()};

    // Build icon using DOM — avoids quote-escaping bugs in innerHTML onerror attributes
    if(ic.u){
      const img=document.createElement('img');
      img.src=ic.u;
      img.alt=m;
      img.style.cssText='width:40px;height:40px;object-fit:contain;image-rendering:auto;flex-shrink:0';
      img.onerror=function(){
        const fb=document.createElement('span');
        fb.innerHTML=MODE_FB;
        this.parentNode.insertBefore(fb.firstChild,this);
        this.remove();
      };
      d.appendChild(img);
    }else{
      const fb=document.createElement('span');
      fb.innerHTML=MODE_FB;
      d.appendChild(fb.firstChild);
    }
    d.appendChild(document.createTextNode('\u00A0'+m));
    tc.appendChild(d);
  });

  // Use setTimeout so layout is fully computed before reading offsetLeft
  // (requestAnimationFrame fires before paint; page may still be display:none)
  setTimeout(()=>{
    const act=tc.querySelector('.tab.act');
    const indEl=document.getElementById('tabInd');
    if(act&&indEl){
      indEl.style.transition='none';
      indEl.style.width=act.offsetWidth+'px';
      indEl.style.transform='translateX('+act.offsetLeft+'px)';
      requestAnimationFrame(()=>{indEl.style.transition=''});
    }
  },30);
}

function slideTabTo(el){
  const ind=document.getElementById('tabInd');
  if(!ind)return;
  document.querySelectorAll('#mTabs .tab').forEach(t=>t.classList.remove('act'));
  el.classList.add('act');
  ind.style.width=el.offsetWidth+'px';
  ind.style.transform='translateX('+el.offsetLeft+'px)';
}

function highlightMatch(text,q){
  if(!q)return esc(text);
  const idx=text.toLowerCase().indexOf(q.toLowerCase());
  if(idx===-1)return esc(text);
  return esc(text.slice(0,idx))+'<span class="hi">'+esc(text.slice(idx,idx+q.length))+'</span>'+esc(text.slice(idx+q.length));
}

function renderRank(){
  // Reset actMode if it was a deleted mode
  if(actMode!=='Overall'&&!MODES.includes(actMode))actMode='Overall';
  buildTabs();
  const wrap=document.getElementById('rkTbl');
  const q=document.getElementById('sBar').value.trim().toLowerCase();
  const rf=document.getElementById('regF').value;

  let list=window.players.filter(p=>{
    if(q&&!p.username.toLowerCase().includes(q))return false;
    if(rf&&p.region!==rf)return false;
    if(actMode==='Overall')return getPoints(p)>0;
    return !!p.tiers[actMode];
  });

  if(actMode==='Overall'){list.sort((a,b)=>getPoints(b)-getPoints(a))}
  else{list.sort((a,b)=>{const oa=TIER_ORD[a.tiers[actMode]]??99;const ob=TIER_ORD[b.tiers[actMode]]??99;return oa!==ob?oa-ob:getPoints(b)-getPoints(a)})}

  document.getElementById('rkCnt').textContent=list.length+' player'+(list.length!==1?'s':'');

  if(!list.length){
    wrap.innerHTML=`<div class="em">${S.inbox}<p>No players yet. Add players from the Owner Panel.</p></div>`;
    return;
  }

  function tierBadges(p){
    return MODES.map(m=>{
      const t=p.tiers[m];const ic=MODE_IC[m]||{u:''};
      const cls=t?'tc-'+t.toLowerCase():'tc-no';
      const pts=t?TIER_PTS[t]:0;const label=t||'-';
      const tip=t?`${m}: ${t} (${pts} pts)`:`${m}: No tier`;
      return `<div class="tbc"><div class="tp">${esc(tip)}</div><div class="tc ${cls}">${ic.u?`<img src="${ic.u}" alt="${esc(m)}" onerror="this.style.display='none'"/>`:`<span style="font-size:9px;font-weight:700">${esc(m.slice(0,2))}</span>`}</div><div class="tl">${label}</div></div>`;
    }).join('');
  }

  let html='<table><thead><tr><th>#</th><th>Skin</th><th>Player</th><th>Region</th><th>Tiers</th></tr></thead><tbody>';
  list.forEach((p,i)=>{
    const rank=i+1;
    const rc=rank===1?'r1':rank===2?'r2':rank===3?'r3':'';
    const title=getTitle(p);
    const pts=getPoints(p);
    const rkColors=['#FFD700','#C0C0C0','#CD7F32'];
    const rkSt=rank<=3?`font-size:18px;font-weight:900;color:${rkColors[rank-1]};text-shadow:0 0 8px ${rkColors[rank-1]}55`:'font-weight:700;color:var(--fg3)';
    const delay=Math.min(i*10,300);

    let warnHtml='';
    if(title.miss&&title.miss.length){
      warnHtml=`<span class="warn-tt">${S.warn}<span class="ttp">Missing LT2+ in: ${title.miss.join(', ')}</span></span>`;
    }

    html+=`<tr class="rw ${rc}" onclick="showPD('${p.username.replace(/'/g,"\\'")}')" style="animation:rowIn .2s ease ${delay}ms both">
      <td style="${rkSt}">${rank}</td>
      <td class="sk-c">${tableSkinCell(p,i)}</td>
      <td class="un-c"><div class="un">${highlightMatch(p.username,q)}</div><div class="ut">${titlePill(title.name)} <span style="color:var(--fg3)">(${pts} pts)</span>${warnHtml}</div></td>
      <td>${p.region}</td>
      <td><div class="tiers-r">${tierBadges(p)}</div></td>
    </tr>`;
  });
  html+='</tbody></table>';
  wrap.innerHTML=html;
  processTableSkinCanvases();
  processBedrockCanvases();
}

function showPD(un){
  const p=window.players.find(x=>x.username===un);if(!p)return;
  const c=document.getElementById('pdC');
  const title=getTitle(p);const pts=getPoints(p);
  // skin is loaded asynchronously via initSkinViewer
  const prog=getProgress(pts);
  let badges=MODES.map(m=>{
    const t=p.tiers[m]||'—';const cls=p.tiers[m]?p.tiers[m].toLowerCase():'';
    return `<div class="bi"><div class="mn">${m}</div><span class="tbdg ${cls}" style="font-size:10px">${t}</span></div>`;
  }).join('');

  let warn='';
  if(title.miss&&title.miss.length){
    warn=`<div class="pd-warn">${S.warn}<span>Missing LT2+ in: <strong>${title.miss.join(', ')}</strong> — needs these to unlock Combat Master.</span></div>`;
  }

  c.innerHTML=`<div class="mhandle"></div>
  <button class="mcl" onclick="closeMs()"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
  <div class="pd-b">
    <div class="sv-wrap" id="pdSkinViewer"></div>
    <div class="pd-i">
      <h2>${esc(p.username)}<span class="cpn" onclick="event.stopPropagation();navigator.clipboard.writeText('${esc(p.username)}');toast('Username copied!','success')">${S.copy}</span></h2>
      <div class="tit-ln">${titlePill(title.name)} <span class="pts">${pts} points</span></div>
      <div class="rg">${p.region} &middot; ${skinType(p)==='java'?'Java (Premium)':skinType(p)==='bedrock'?'Bedrock':skinType(p)==='raw'?'Raw PNG':'No Skin'}</div>
      <div class="prog-w"><div class="prog" style="width:${prog.pct}%"></div></div>
      <div class="prog-lbl">${prog.label}</div>
      <div class="bg">${badges}</div>
      ${warn}
    </div>
  </div>`;
  openM('pdM');
  // Init skinview3d after modal opens (needs DOM to be visible)
  setTimeout(()=>{
    const sv=document.getElementById('pdSkinViewer');
    if(sv)initSkinViewer(sv,p,120,240);
  },100);
}

// ===== TESTERS (Lanyard REST + WebSocket) =====
let sseSource=null;
function getTesters(){return lsg('ht',['1503408628261191755'])}

// Build a tester card from bot API data
function buildTesterCard(tester,index){
  const statMap={
    online: {wrap:'st-on',  dot:'sd-on', label:'Online'},
    idle:   {wrap:'st-idle',dot:'sd-id', label:'Idle'},
    dnd:    {wrap:'st-dnd', dot:'sd-dn', label:'Do Not Disturb'},
    offline:{wrap:'st-offline',dot:'sd-of',label:'Offline'},
  };
  const st=statMap[tester.status]||statMap.offline;
  const actLabel=tester.customStatus||tester.activity||'No activity';
  const nc=document.createElement('div');
  nc.className=`crd tc-card tc-${tester.status==='dnd'?'dnd':tester.status||'offline'}`;
  nc.dataset.tid=tester.id;
  nc.style.animation=`pgIn .3s ease ${index*90}ms both`;
  const avatarHtml=tester.avatar
    ?`<img src="${esc(tester.avatar)}" alt="${esc(tester.username)}" width="60" height="60" onerror="this.outerHTML='<div class=\\'tc-af\\'><svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><circle cx=\\'12\\' cy=\\'8\\' r=\\'4\\'/><path d=\\'M4 20c0-4 4-7 8-7s8 3 8 7\\'/></svg></div>'"/>`
    :`<div class="tc-af"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg></div>`;
  nc.innerHTML=`
    <div class="tc-av-wrap ${st.wrap}">
      ${avatarHtml}
      <span class="tc-dot ${st.dot}"></span>
    </div>
    <div class="tc-body">
      <div class="tc-name">
        ${esc(tester.displayName||tester.username)}
        <span class="tc-badge-tester"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 3h6M10 3v5.17a2 2 0 01-.59 1.42L4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4l-5.41-5.41A2 2 0 0114 8.17V3"/></svg> Tester</span>
      </div>
      <div class="tc-status-row ${st.wrap}">
        <span class="tc-dot ${st.dot}" style="position:static;width:10px;height:10px;border:none"></span>
        ${st.label}
      </div>
      <div class="tc-activity">${esc(actLabel)}</div>
    </div>`;
  return nc;
}

function renderTesters(testers){
  const el=document.getElementById('testC');
  const countEl=document.getElementById('tsCount');
  if(!el)return;
  el.innerHTML='';
  if(!testers.length){
    el.innerHTML=`<div style="padding:32px;text-align:center;color:var(--fg3)">No testers found. Run <strong>/set-tester-role</strong> in Discord first.</div>`;
    return;
  }
  const order={online:0,idle:1,dnd:2,offline:3};
  const sorted=[...testers].sort((a,b)=>(order[a.status]??3)-(order[b.status]??3));
  sorted.forEach((t,i)=>el.appendChild(buildTesterCard(t,i)));
  if(countEl){
    const online=testers.filter(t=>t.status==='online').length;
    countEl.innerHTML=`${testers.length} tester${testers.length!==1?'s':''} &middot; <span style="color:#23d160">${online} online</span>`;
  }
}

function patchTester(updated){
  const el=document.getElementById('testC');
  if(!el)return;
  const card=el.querySelector(`[data-tid="${updated.id}"]`);
  const allCards=[...el.querySelectorAll('[data-tid]')];
  const index=allCards.findIndex(c=>c.dataset.tid===updated.id);
  const nc=buildTesterCard(updated,index>=0?index:0);
  if(card){card.style.opacity='0.4';setTimeout(()=>card.replaceWith(nc),150);}
  else el.appendChild(nc);
}

function fetchTesters(){
  if(sseSource){sseSource.close();sseSource=null;}
  const el=document.getElementById('testC');
  if(el)el.innerHTML=`
    <div class="crd tc-card" style="animation:pgIn .3s ease both">
      <div class="sk" style="width:60px;height:60px;border-radius:50%;flex-shrink:0"></div>
      <div style="flex:1">
        <div class="sk" style="width:130px;height:15px;margin-bottom:10px"></div>
        <div class="sk" style="width:80px;height:11px;margin-bottom:8px"></div>
        <div class="sk" style="width:100px;height:11px"></div>
      </div>
    </div>`;

  // Connect via Server-Sent Events for live updates
  sseSource=new EventSource(`${API_BASE}/api/testers/live`);

  sseSource.onmessage=(e)=>{
    const msg=JSON.parse(e.data);
    if(msg.type==='init'||msg.type==='sync')renderTesters(msg.testers);
    if(msg.type==='presence')patchTester(msg.tester);
  };

  // Fallback to plain HTTP if SSE fails
  sseSource.onerror=()=>{
    sseSource.close();sseSource=null;
    fetch(`${API_BASE}/api/testers`)
      .then(r=>r.json())
      .then(testers=>renderTesters(testers))
      .catch(()=>{
        if(el)el.innerHTML=`<div style="padding:32px;text-align:center;color:#ff3860">⚠️ Could not reach the API server.<br><span style="font-size:12px;color:var(--fg3)">Make sure Termux is running with ./start.sh</span></div>`;
      });
  };
}

// ===== PANEL =====
function initPanel(){
  const c=gC();
  const den=document.getElementById('pDen');
  const con=document.getElementById('pCon');
  if(!c||(c.role!=='Owner'&&c.role!=='Admin')){
    den.style.display='';
    den.innerHTML=`<div style="text-align:center;padding:60px 20px">${S.lock}<p style="color:var(--fg3);margin-top:16px;font-size:14px">Access denied. Please log in with an authorized account.</p></div>`;
    con.style.display='none';return;
  }
  den.style.display='none';con.style.display='';
  const isOw=c.role==='Owner';
  buildPanelTabs(isOw);
  buildSettings();
  buildAddEdit();
  sPT(isOw?'psSet':'psAdd');
}

function buildPanelTabs(isOw){
  const tabs=[
    {id:'psSet',label:'Settings',svg:S.settings,ow:true},
    {id:'psAdd',label:'Add/Edit',svg:S.plus},
    {id:'psRm',label:'Remove',svg:S.trash},
    {id:'psMod',label:'Modes',svg:S.trophy,ow:true},
    {id:'psTst',label:'Testers',svg:S.people,ow:true},
    {id:'psAdm',label:'Admins',svg:S.shield,ow:true},
    {id:'psLog',label:'Log',svg:S.log}
  ];
  const el=document.getElementById('pTabs');
  el.innerHTML=tabs.filter(t=>!t.ow||isOw).map(t=>`<span onclick="sPT('${t.id}')" id="pt-${t.id}">${t.svg} ${t.label}</span>`).join('');
}

function sPT(id){
  document.querySelectorAll('.ps').forEach(s=>s.classList.remove('vis'));
  document.querySelectorAll('.pt span').forEach(s=>s.classList.remove('act'));
  const sec=document.getElementById(id);if(sec)sec.classList.add('vis');
  const tab=document.getElementById('pt-'+id);if(tab)tab.classList.add('act');
  if(id==='psRm')renderRmL();
  if(id==='psLog')renderLogL();
  if(id==='psTst')renderTesterMgmt();
  if(id==='psMod')renderModeMgmt();
  if(id==='psAdm')buildAdminSec();
}

function buildSettings(){
  const s=gS();
  const c=gC();
  const savedToken=lsg('ht_wt','')||'';
  const curEmail=c?c.email:'';
  document.getElementById('psSet').innerHTML=`
    <h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.settings} Site Settings</h2>
    <div class="pf"><label>Site Title</label><input type="text" id="sT" value="${esc(s.title)}"/></div>
    <div class="pf"><label>Tagline</label><input type="text" id="sTg" value="${esc(s.tagline)}"/></div>
    <div class="pf"><label>Discord Invite Link</label><input type="text" id="sDc" value="${esc(s.discord)}"/></div>
    <div class="pf"><label>Server IP</label><input type="text" id="sIp" value="${esc(s.serverIp)}" placeholder="play.example.net"/></div>
    <hr style="border-color:var(--bd);margin:18px 0"/>
    <h3 style="font-weight:700;font-size:15px;margin-bottom:10px">🎭 Discord Role Auto-Assign</h3>
    <p style="font-size:12px;color:var(--fg3);margin-bottom:12px">Paste the <strong>WEBSITE_TOKEN</strong> from your <code>.env</code> file. This lets the website tell your bot to assign roles when a player earns a new title.</p>
    <div class="pf"><label>Website Token <span style="color:var(--fg3);font-size:11px">(from .env)</span></label><input type="password" id="sWt" value="${esc(savedToken)}" placeholder="Paste WEBSITE_TOKEN here"/></div>
    <button class="btn-g" onclick="saveSets()" style="margin-top:6px;display:flex;align-items:center;gap:6px">${S.save} Save Settings</button>
    <hr style="border-color:var(--bd);margin:22px 0"/>
    <h3 style="font-weight:700;font-size:15px;margin-bottom:4px">🔑 Change Owner Credentials</h3>
    <p style="font-size:12px;color:var(--fg3);margin-bottom:12px">Current login: <strong style="color:var(--fg)">${esc(curEmail)}</strong></p>
    <div class="pf"><label>Current Password</label><input type="password" id="sCurP" placeholder="Enter current password"/></div>
    <div class="pf"><label>New Email <span style="color:var(--fg3);font-size:11px">(leave blank to keep current)</span></label><input type="email" id="sNE" placeholder="${esc(curEmail)}"/></div>
    <div class="pf"><label>New Password <span style="color:var(--fg3);font-size:11px">(leave blank to keep current)</span></label><input type="password" id="sNP" placeholder="New password"/></div>
    <div class="pf"><label>Confirm New Password</label><input type="password" id="sNP2" placeholder="Repeat new password"/></div>
    <button class="btn-g" onclick="saveCredentials()" style="margin-top:6px;display:flex;align-items:center;gap:6px">${S.save} Update Credentials</button>
    <hr style="border-color:var(--bd);margin:22px 0"/>
    <h3 style="font-weight:700;font-size:15px;margin-bottom:4px;color:#ff3860">⚠ Transfer Ownership</h3>
    <p style="font-size:12px;color:var(--fg3);margin-bottom:12px">Hands full Owner control to another account. You will be demoted to Admin. This cannot be undone by yourself — the new Owner must transfer it back.</p>
    <div class="pf"><label>New Owner</label><select id="toTarget">${gU().filter(u=>u.role!=='Owner').map(u=>`<option value="${esc(u.email)}">${esc(u.username)} (${esc(u.role)})</option>`).join('')||'<option disabled>No eligible accounts</option>'}</select></div>
    <button class="btn-g" style="background:#ff3860" onclick="confirmTransferOwnership()">Transfer Ownership</button>`;
}

function buildAddEdit(){
  const modesHtml=MODES.map(m=>{
    const ic=MODE_IC[m]||{u:''};
    return `<label><input type="checkbox" value="${esc(m)}"/>${ic.u?`<img src="${ic.u}" alt="${esc(m)}" onerror="this.style.display='none'"/>`:''} ${esc(m)}</label>`;
  }).join('');

  document.getElementById('psAdd').innerHTML=`
    <h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.plus} Add / Edit Player</h2>

    <div class="pf"><label>Username</label><input type="text" id="apU" placeholder="Java/Bedrock gamertag or any name"/></div>

    <div class="pf">
      <label>Skin / Account Type</label>
      <div class="st-tabs">
        <div class="st-tab act" id="stJ" onclick="setSkinTab('java')">☕ Java</div>
        <div class="st-tab"     id="stB" onclick="setSkinTab('bedrock')">🪨 Bedrock</div>
        <div class="st-tab"     id="stR" onclick="setSkinTab('raw')">🖼 Raw PNG</div>
      </div>
      <div id="stInfo"></div>
    </div>

    <div class="pf"><label>Discord ID <span style="color:var(--fg3);font-size:11px;font-weight:400">(optional — needed for auto role)</span></label><input type="text" id="apDid" placeholder="e.g. 123456789012345678"/></div>
    <div class="pf"><label>Region</label><select id="apR"><option>NA</option><option>EU</option><option>AS</option><option>SA</option><option>OC</option><option>AF</option></select></div>
    <div class="pf"><label>Game Modes (select multiple)</label><div class="modes-grid" id="modesGrid">${modesHtml}</div></div>
    <div class="pf"><label>Tier</label><select id="apTr">${TIERS.map(t=>'<option>'+t+'</option>').join('')}</select></div>
    <button class="btn-g" onclick="addEdit()" style="margin-top:6px;display:flex;align-items:center;gap:6px">${S.plus} Save Player</button>`;

  setSkinTab('java');
}

function setSkinTab(type){
  document.querySelectorAll('.st-tab').forEach(t=>t.classList.remove('act'));
  document.getElementById('stJ').classList.toggle('act',type==='java');
  document.getElementById('stB').classList.toggle('act',type==='bedrock');
  document.getElementById('stR').classList.toggle('act',type==='raw');
  document.getElementById('apU').placeholder=
    type==='java'?'Java username (e.g. Notch)':
    type==='bedrock'?'Bedrock gamertag (e.g. Steve)':
    'Player display name';
  const info=document.getElementById('stInfo');
  if(type==='java'){
    info.innerHTML='<div class="st-note">Fetches a full <strong>3D body render</strong> using the Mojang API + Crafatar. Enter the exact Java username. UUID is resolved automatically.</div>';
  }else if(type==='bedrock'){
    info.innerHTML='<div class="st-note">Fetches the Bedrock player skin via GeyserMC/Xbox API. Enter the Bedrock gamertag (Xbox username).<br><div class="pf" style="margin-top:8px"><label>Bedrock Gamertag</label><input type="text" id="apBgt" placeholder="Xbox gamertag"/></div></div>';
  }else{
    info.innerHTML='<div class="st-note">Provide a direct URL to a <strong>64×64 Minecraft skin PNG</strong>. The skin map is parsed and rendered as a 3D character using the standard UV layout.</div><div class="pf" style="margin-top:0"><label>Skin PNG URL</label><input type="text" id="apSk" placeholder="https://example.com/skin.png"/></div>';
  }
  document.getElementById('psAdd').dataset.skinType=type;
}

function toggleSkinUrl(){} // kept for compat

function saveSets(){
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  const s={
    title:document.getElementById('sT').value.trim()||'Heavenly Tiers',
    tagline:document.getElementById('sTg').value.trim()||'Rise Through the Ranks',
    discord:document.getElementById('sDc').value.trim()||'https://discord.gg/xJ9r4vyG',
    serverIp:document.getElementById('sIp').value.trim()||'play.example.net'
  };
  const wt=document.getElementById('sWt').value.trim();
  if(wt)lss('ht_wt',wt);
  lss('hs',s);apS();logA('Settings updated by '+c.email);toast('Settings saved!','success');
}

function saveCredentials(){
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  const curP=document.getElementById('sCurP').value;
  const newE=(document.getElementById('sNE').value||'').trim().toLowerCase();
  const newP=document.getElementById('sNP').value;
  const newP2=document.getElementById('sNP2').value;
  if(!curP)return toast('Enter current password','error');
  let us=gU();
  const idx=us.findIndex(x=>x.email===c.email&&x.password===btoa(curP));
  if(idx===-1)return toast('Current password incorrect','error');
  if(newP&&newP!==newP2)return toast('New passwords do not match','error');
  if(newP&&newP.length<4)return toast('Password min 4 chars','error');
  if(newE&&newE!==c.email&&us.find(x=>x.email===newE))return toast('Email already in use','error');
  if(newE)us[idx].email=newE;
  if(newP)us[idx].password=btoa(newP);
  sU(us);sC(us[idx]);
  logA('Owner credentials updated by '+c.email);
  toast('Credentials updated successfully','success');
  document.getElementById('sCurP').value='';
  document.getElementById('sNP').value='';
  document.getElementById('sNP2').value='';
}

function addEdit(){
  const c=gC();if(!c||(c.role!=='Owner'&&c.role!=='Admin'))return toast('Not authorized','error');
  const un=document.getElementById('apU').value.trim();
  const rg=document.getElementById('apR').value;
  const tr=document.getElementById('apTr').value;
  const did=document.getElementById('apDid').value.trim();
  const stEl=document.getElementById('psAdd');
  const st=stEl?stEl.dataset.skinType||'java':'java';
  if(!un)return toast('Username required','error');

  const selectedModes=[];
  document.querySelectorAll('#modesGrid input[type=checkbox]:checked').forEach(cb=>selectedModes.push(cb.value));
  if(!selectedModes.length)return toast('Select at least one game mode','error');

  // Extra skin fields depending on type
  const rawSkinUrl=(st==='raw'&&document.getElementById('apSk'))?document.getElementById('apSk').value.trim():'';
  const bedrockGt=(st==='bedrock'&&document.getElementById('apBgt'))?document.getElementById('apBgt').value.trim():'';

  // Validate required skin fields
  if(st==='raw'&&!rawSkinUrl)return toast('Provide a skin PNG URL for Raw type','error');
  if(st==='bedrock'&&!bedrockGt)return toast('Enter the Bedrock gamertag','error');

  let p=window.players.find(x=>x.username.toLowerCase()===un.toLowerCase());
  const oldTitle=p?getTitle(p).name:'Unranked';
  const oldTiers=p?Object.assign({},p.tiers):{};

  if(p){
    selectedModes.forEach(m=>p.tiers[m]=tr);
    p.region=rg;
    p.skinType=st;
    if(st==='java'){p.isPremium=true;delete p.skinUrl;}
    if(st==='raw'){p.skinUrl=rawSkinUrl;p.isPremium=false;}
    if(st==='bedrock'){p.bedrockGt=bedrockGt;p.isPremium=false;}
    if(did)p.discordId=did;
    logA('Updated '+un+': '+selectedModes.join(',')+'to '+tr+' by '+c.email,{type:'updateTiers',username:un,tiers:oldTiers});
    toast('Updated '+un+' — '+selectedModes.length+' mode(s): '+tr,'success');
  }else{
    p={username:un,region:rg,tiers:{},skinType:st,isPremium:st==='java',discordId:did||''};
    if(st==='raw')p.skinUrl=rawSkinUrl;
    if(st==='bedrock')p.bedrockGt=bedrockGt;
    selectedModes.forEach(m=>p.tiers[m]=tr);
    window.players.push(p);
    logA('Added '+un+' ('+rg+', '+selectedModes.join(',')+': '+tr+') by '+c.email,{type:'addPlayer',username:un});
    toast('Added '+un,'success');
  }

  // ── Auto-resolve Bedrock XUID ───────────────────────────────
  if(st==='bedrock'&&bedrockGt&&!p.xuid){
    fetchBedrockXUID(bedrockGt).then(xuid=>{
      if(xuid){p.xuid=xuid;savePlayers();toast('Bedrock XUID resolved for '+un,'success');}
      else toast('Could not find Bedrock XUID for '+bedrockGt+' — skin will show as placeholder','error');
    });
  }

  // ── Save to localStorage immediately ───────────────────────
  savePlayers();

  // ── Discord role auto-assignment ───────────────────────────
  if(p.discordId){
    const token=lsg('ht_wt','')||'';
    if(token){
      const newTitle=getTitle(p).name;
      if(newTitle!==oldTitle&&newTitle!=='Unranked')
        assignDiscordRole(p.discordId,newTitle,p.username);
      selectedModes.forEach(m=>{
        if(tr!==(oldTiers[m]||null))
          assignModeTierRole(p.discordId,m,tr,p.username);
      });
    }
  }

  document.getElementById('apU').value='';
  document.getElementById('apDid').value='';
  document.querySelectorAll('#modesGrid input[type=checkbox]').forEach(cb=>cb.checked=false);
  if(curPg==='rankings')renderRank();

}


// Assign the matching Discord role for a website TITLE (Rookie, Novice, etc.)
async function assignDiscordRole(discordId,titleName,username){
  const token=lsg('ht_wt','')||'';
  if(!token){toast(`⚠️ No website token — set it in Settings to auto-assign roles`,'error');return;}
  try{
    const res=await fetch(`${API_BASE}/api/roles/assign`,{
      method:'POST',
      headers:{'Content-Type':'application/json','x-website-token':token},
      body:JSON.stringify({discordId,titleName}),
    });
    const data=await res.json();
    if(data.ok) toast(`🎭 Gave ${titleName} role to ${username} on Discord`,'success');
    else toast(`⚠️ Title role failed: ${data.reason||'check bot logs'}`,'error');
  }catch(e){toast(`⚠️ Could not reach API for title role`,'error');}
}

// Assign the matching Discord role for a GAMEMODE+TIER (e.g. Spearmace HT1)
async function assignModeTierRole(discordId,gamemode,tier,username){
  const token=lsg('ht_wt','')||'';
  if(!token)return; // silently skip if not configured
  try{
    const res=await fetch(`${API_BASE}/api/roles/assign-mode-tier`,{
      method:'POST',
      headers:{'Content-Type':'application/json','x-website-token':token},
      body:JSON.stringify({discordId,gamemode,tier}),
    });
    const data=await res.json();
    if(data.ok) toast(`🎭 Gave ${gamemode} ${tier} role to ${username}`,'success');
  }catch(e){/* silently ignore if API unreachable */}
}

function renderRmL(){
  const l=document.getElementById('psRm');
  if(!window.players.length){
    l.innerHTML=`<h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.trash} Remove Players</h2><p style="color:var(--fg3)">No players to remove.</p>`;return;
  }
  l.innerHTML=`<h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.trash} Remove Players</h2>
  <div class="rl">${window.players.map(p=>`<div class="ri"><div><span style="font-weight:600">${esc(p.username)}</span> <span style="color:var(--fg3);font-size:12px">${p.region} &middot; ${getPoints(p)} pts</span></div><button class="del" onclick="cfmRm('${p.username.replace(/'/g,"\\'")}')">${S.trash}</button></div>`).join('')}</div>`;
}

function cfmRm(un){
  document.getElementById('cfmH').innerHTML=S.warn+' Confirm Removal';
  document.getElementById('cfmMsg').textContent=`Remove player "${un}"? This cannot be undone.`;
  const y=document.getElementById('cfmY');
  y.textContent='Yes, Remove';
  y.onclick=()=>{
    const removed=window.players.find(p=>p.username===un);
    const snapshot=removed?JSON.parse(JSON.stringify(removed)):null;
    window.players=window.players.filter(p=>p.username!==un);
    savePlayers();
    const c=gC();logA(`Removed ${un} by ${c?c.email:'unknown'}`,{type:'removePlayer',player:snapshot});
    toast(`Removed ${un}`,'success');closeMs();renderRmL();
    if(curPg==='rankings')renderRank();
  };
  openM('cfmM');
}

function confirmTransferOwnership(){
  const sel=document.getElementById('toTarget');
  if(!sel||!sel.value)return toast('No account selected','error');
  const email=sel.value;
  const us=gU();
  const target=us.find(x=>x.email===email);
  if(!target)return toast('Account not found','error');
  document.getElementById('cfmH').innerHTML=S.warn+' Confirm Ownership Transfer';
  document.getElementById('cfmMsg').textContent=`Transfer Owner to "${target.username}"? You will be demoted to Admin immediately. This cannot be undone by yourself.`;
  const y=document.getElementById('cfmY');
  y.textContent='Yes, Transfer';
  y.onclick=()=>doTransferOwnership(email);
  openM('cfmM');
}
function doTransferOwnership(email){
  const c=gC();if(!c||c.role!=='Owner')return;
  let us=gU();
  const meIdx=us.findIndex(x=>x.email===c.email);
  const targetIdx=us.findIndex(x=>x.email===email);
  if(meIdx<0||targetIdx<0)return toast('Account not found','error');
  us[meIdx].role='Admin';
  us[targetIdx].role='Owner';
  sU(us);
  logA(`${c.username||c.email} transferred Owner to ${us[targetIdx].username||email}`);
  closeMs();
  upAuth(); // gC() self-heals to the new "Admin" role on next read
  showPage('home');
  toast('Ownership transferred. You are now Admin.','success');
}

// ===== TESTER MANAGEMENT =====
function renderTesterMgmt(){
  const ids=getTesters();
  const el=document.getElementById('psTst');
  let cards=ids.map(id=>{
    const cached=testerCache[id];
    return `<div class="tm-card" style="margin-bottom:8px">
      ${cached&&cached.avatar?`<img src="https://cdn.discordapp.com/avatars/${cached.uid}/${cached.avatar}.png?size=64" onerror="this.style.display='none'"/>`:''}
      <div style="flex:1">
        ${cached?`<div class="tm-name">${esc(cached.username)}</div>`:''}
        <div class="tm-id">${id}</div>
      </div>
      <button class="del" onclick="rmTester('${id}')">${S.trash}</button>
    </div>`;
  }).join('');

  el.innerHTML=`<h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.people} Manage Testers</h2>
    ${cards}
    <div class="tm-add">
      <input type="text" id="newTstId" placeholder="Discord User ID"/>
      <button onclick="addTester()">${S.plus}</button>
    </div>`;
}

function addTester(){
  const id=document.getElementById('newTstId').value.trim();
  if(!id||!/^\d+$/.test(id))return toast('Enter a valid Discord User ID (digits only)','error');
  let ids=getTesters();
  if(ids.includes(id))return toast('Tester already exists','error');
  ids.push(id);lss('ht',ids);
  const c=gC();logA(`Added tester ${id} by ${c?c.email:'unknown'}`);
  toast('Tester added!','success');
  renderTesterMgmt();
}

function rmTester(id){
  let ids=getTesters();
  if(ids.length<=1)return toast('Must have at least one tester','error');
  document.getElementById('cfmH').innerHTML=S.warn+' Remove Tester';
  document.getElementById('cfmMsg').textContent=`Remove tester ID ${id}?`;
  const y=document.getElementById('cfmY');
  y.textContent='Yes, Remove';
  y.onclick=()=>{
    ids=ids.filter(x=>x!==id);lss('ht',ids);
    const c=gC();logA(`Removed tester ${id} by ${c?c.email:'unknown'}`);
    toast('Tester removed','success');closeMs();renderTesterMgmt();
  };
  openM('cfmM');
}

// ===== GAME MODE MANAGEMENT (Owner only) =====
function renderModeMgmt(){
  const el=document.getElementById('psMod');
  const cards=MODES.map((m,i)=>{
    const ic=MODE_IC[m];
    const hasImg=ic&&ic.u;
    return `<div class="mm-card" data-mode="${esc(m)}">
      ${hasImg?`<img src="${ic.u}" alt="${esc(m)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="mm-noimg" style="display:none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`
        :`<div class="mm-noimg"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`}
      <div class="mm-info">
        <div class="mm-name">${esc(m)}</div>
        ${hasImg?`<div class="mm-url">${esc(ic.u)}</div>`:'<div class="mm-url" style="color:var(--fg3);font-style:italic">No icon</div>'}
      </div>
      <div class="mm-acts">
        <button onclick="renameMode('${m.replace(/'/g,"\\'")}')" title="Rename">${S.edit}</button>
        <button onclick="editModeIcon('${m.replace(/'/g,"\\'")}')" title="Change icon">${S.image}</button>
        <button class="del" onclick="removeMode('${m.replace(/'/g,"\\'")}')" title="Remove">${S.trash}</button>
      </div>
    </div>`;
  }).join('');

  el.innerHTML=`<h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.trophy} Manage Game Modes</h2>
    <p style="font-size:12px;color:var(--fg3);margin-bottom:14px">${MODES.length} mode${MODES.length!==1?'s':''}. Rename, change icons, add or remove modes. Changes affect rankings and player tiers.</p>
    ${cards}
    <div class="mm-add">
      <div class="pf"><label>Mode Name</label><input type="text" id="newModeName" placeholder="e.g. Trident"/></div>
      <div class="pf"><label>Icon URL (optional)</label><input type="text" id="newModeIcon" placeholder="https://example.com/icon.png"/></div>
      <button onclick="addMode()" title="Add mode">${S.plus}</button>
    </div>`;
}

function addMode(){
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  const name=document.getElementById('newModeName').value.trim();
  const icon=document.getElementById('newModeIcon').value.trim();
  if(!name)return toast('Mode name is required','error');
  if(MODES.some(m=>m.toLowerCase()===name.toLowerCase()))return toast('Mode already exists','error');
  if(name.toLowerCase()==='overall')return toast('Cannot use "Overall" as a mode name','error');
  MODES.push(name);
  MODE_IC[name]={u:icon||''};
  saveModes();
  logA(`Added game mode "${name}" by ${c.email}`);
  toast(`Added mode: ${name}`,'success');
  renderModeMgmt();
  buildAddEdit();
}

function renameMode(oldName){
  const newName=prompt('Rename "'+oldName+'" to:',oldName);
  if(!newName||!newName.trim()||newName.trim()===oldName)return;
  const nm=newName.trim();
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  if(nm.toLowerCase()==='overall')return toast('Cannot use "Overall" as a mode name','error');
  if(MODES.some(m=>m.toLowerCase()===nm.toLowerCase()&&m!==oldName))return toast('Mode name already exists','error');
  // Update MODES array
  const idx=MODES.indexOf(oldName);
  if(idx===-1)return;
  MODES[idx]=nm;
  // Update MODE_IC
  MODE_IC[nm]=MODE_IC[oldName]||{u:''};
  if(nm!==oldName)delete MODE_IC[oldName];
  // Update all player tiers
  window.players.forEach(p=>{
    if(p.tiers[oldName]!==undefined){
      p.tiers[nm]=p.tiers[oldName];
      delete p.tiers[oldName];
    }
  });
  saveModes();
  logA(`Renamed mode "${oldName}" → "${nm}" by ${c.email}`);
  toast(`Renamed: ${oldName} → ${nm}`,'success');
  renderModeMgmt();
  buildAddEdit();
  if(curPg==='rankings')renderRank();
}

function editModeIcon(modeName){
  const cur=MODE_IC[modeName]?MODE_IC[modeName].u:'';
  const newUrl=prompt('Icon URL for "'+modeName+'":\n(Leave empty to remove icon)',cur);
  if(newUrl===null)return;
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  MODE_IC[modeName]={u:newUrl.trim()};
  saveModes();
  logA(`Changed icon for "${modeName}" by ${c.email}`,{type:'changeIcon',mode:modeName,url:cur});
  toast(`Icon updated for ${modeName}`,'success');
  renderModeMgmt();
  if(curPg==='rankings')renderRank();
}

function removeMode(modeName){
  if(MODES.length<=1)return toast('Must have at least one game mode','error');
  const c=gC();if(!c||c.role!=='Owner')return toast('Owner only','error');
  document.getElementById('cfmH').innerHTML=S.warn+' Remove Game Mode';
  document.getElementById('cfmMsg').textContent=`Remove "${modeName}"? This will also remove all player tiers for this mode.`;
  const y=document.getElementById('cfmY');
  y.textContent='Yes, Remove';
  y.onclick=()=>{
    MODES=MODES.filter(m=>m!==modeName);
    delete MODE_IC[modeName];
    // Clean player tiers
    window.players.forEach(p=>{delete p.tiers[modeName]});
    saveModes();
    logA(`Removed game mode "${modeName}" by ${c.email}`);
    toast(`Removed mode: ${modeName}`,'success');
    closeMs();
    renderModeMgmt();
    buildAddEdit();
    if(curPg==='rankings')renderRank();
  };
  openM('cfmM');
}

// ===== MANAGE ADMINS — visual user list =====
function buildAdminSec(){
  const el=document.getElementById('psAdm');
  const c=gC();
  const us=gU();

  // Sort: Owner → Admin → Member, then alphabetically
  const roleOrder={Owner:0,Admin:1,Member:2};
  const sorted=[...us].sort((a,b)=>(roleOrder[a.role]??2)-(roleOrder[b.role]??2)||a.email.localeCompare(b.email));

  el.innerHTML=`
    <h2 style="font-weight:700;font-size:18px;margin-bottom:6px;display:flex;align-items:center;gap:8px">${S.shield} Manage Users</h2>
    <p style="color:var(--fg3);font-size:13px;margin-bottom:14px">${us.length} registered account${us.length!==1?'s':''} — click a button to promote or demote.</p>
    <input class="adm-search" id="admQ" placeholder="🔍  Search by username or email…" oninput="filterAdmUsers(this.value)"/>
    <div class="usr-grid" id="usrGrid">${sorted.map(u=>userCard(u,c)).join('')}</div>`;
}

function userCard(u,cur){
  const isYou=cur&&cur.email===u.email;
  const isOwner=u.role==='Owner';
  const isAdmin=u.role==='Admin';
  const initial=(u.username||u.email||'?')[0].toUpperCase();

  // Unique avatar colour derived from email
  const hue=([...u.email].reduce((a,ch)=>a+ch.charCodeAt(0),0))%360;
  const avBg=`hsl(${hue},50%,30%)`;
  const avFg=`hsl(${hue},80%,75%)`;

  const roleBadge=isOwner
    ?`<span class="role-badge rb-owner">👑 Owner</span>`
    :isAdmin
    ?`<span class="role-badge rb-admin">🛡 Admin</span>`
    :`<span class="role-badge rb-member">Member</span>`;

  // Buttons — only Owner can change roles; can't modify yourself or other Owner
  let btns='';
  if(cur&&cur.role==='Owner'&&!isOwner&&!isYou){
    btns=isAdmin
      ?`<button class="btn-demote" onclick="setRole('${esc(u.email)}','Member')">Revoke Admin</button>`
      :`<button class="btn-promote" onclick="setRole('${esc(u.email)}','Admin')">Make Admin</button>`;
  }

  return `<div class="usr-card ${isOwner?'is-owner':isAdmin?'is-admin':''}" data-email="${esc(u.email)}" data-name="${esc((u.username||u.email).toLowerCase())}">
    <div class="usr-av" style="background:${avBg};color:${avFg}">${initial}</div>
    <div class="usr-meta">
      <div class="usr-name">
        ${esc(u.username||u.email.split('@')[0])}
        ${isYou?`<span class="usr-you">You</span>`:''}
      </div>
      <div class="usr-email">${esc(u.email)}</div>
      <div style="margin-top:5px">${roleBadge}</div>
    </div>
    ${btns?`<div class="usr-acts">${btns}</div>`:''}
  </div>`;
}

function filterAdmUsers(q){
  const term=q.toLowerCase();
  document.querySelectorAll('#usrGrid .usr-card').forEach(card=>{
    const match=card.dataset.email.includes(term)||card.dataset.name.includes(term);
    card.style.display=match?'':'none';
  });
}

function setRole(email,newRole){
  const c=gC();
  if(!c||c.role!=='Owner')return toast('Owner only','error');
  let us=gU();
  const u=us.find(x=>x.email===email);
  if(!u)return toast('User not found','error');
  if(u.role==='Owner')return toast('Cannot modify the Owner account','error');
  if(u.email===c.email)return toast('Cannot change your own role','error');

  const label=newRole==='Admin'?'Granted Admin to':'Revoked Admin from';
  u.role=newRole;
  sU(us);
  logA(`${label} ${email} by ${c.email}`);
  toast(`${u.username||email} is now ${newRole}`,'success');
  buildAdminSec(); // re-render with updated roles
}

function renderLogL(){
  const logs=lsg('hal',[]);
  const l=document.getElementById('psLog');
  l.innerHTML=`<h2 style="font-weight:700;font-size:18px;margin-bottom:14px;display:flex;align-items:center;gap:8px">${S.log} Action Log</h2>`;
  if(!logs.length){l.innerHTML+='<p style="color:var(--fg3)">No actions logged yet.</p>';return}
  l.innerHTML+=`<div class="ll">${logs.map((x,i)=>`<div class="li">${S.clock}<span class="ts">${x.ts}</span><span>${esc(x.desc)}</span>${x.payload?`<button class="log-redo" onclick="redoLogAction(${i})" title="Reverse this action">↺ Redo</button>`:''}</div>`).join('')}</div>`;
}

// Reverses a specific logged action using the payload snapshot captured at log time.
// Only entries with a stored payload show a Redo button — older/unsupported entries won't.
function redoLogAction(i){
  const logs=lsg('hal',[]);
  const entry=logs[i];
  if(!entry||!entry.payload)return;
  const p=entry.payload;
  const c=gC();
  switch(p.type){
    case 'removePlayer':
      if(!p.player)return toast('No snapshot to restore','error');
      if(window.players.find(x=>x.username===p.player.username))return toast(p.player.username+' already exists','error');
      window.players.push(p.player);
      savePlayers();
      toast('Restored '+p.player.username,'success');
      if(curPg==='rankings')renderRank();
      break;
    case 'addPlayer':
      window.players=window.players.filter(x=>x.username!==p.username);
      savePlayers();
      toast('Removed '+p.username,'success');
      if(curPg==='rankings')renderRank();
      break;
    case 'updateTiers':
      { const pl=window.players.find(x=>x.username===p.username);
        if(!pl)return toast(p.username+' not found','error');
        pl.tiers=JSON.parse(JSON.stringify(p.tiers));
        savePlayers();
        toast('Reverted tiers for '+p.username,'success');
        if(curPg==='rankings')renderRank();
      }
      break;
    case 'changeIcon':
      MODE_IC[p.mode]={u:p.url};
      saveModes();
      toast('Reverted icon for '+p.mode,'success');
      if(curPg==='rankings')renderRank();
      break;
    default:
      return toast('This action type can\'t be auto-reverted','error');
  }
  logA(`${c?c.email:'unknown'} used Redo on: "${entry.desc}"`);
  renderLogL();
}

// ===== BACK TO TOP =====
window.addEventListener('scroll',()=>{
  const btn=document.getElementById('btt');
  if(curPg==='rankings'&&window.scrollY>300)btn.classList.add('vis');
  else btn.classList.remove('vis');
});

// ===== KEYBOARD =====
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
    e.preventDefault();document.getElementById('sBar').focus();
  }
  if(e.key==='Escape'){closeMs();closeHam()}
});

// ===== STICKY HEADER HEIGHT =====
function upHdr(){document.documentElement.style.setProperty('--hdr-h',document.getElementById('hdr').offsetHeight+'px')}
window.addEventListener('resize',upHdr);

// ===== BUILD DYNAMIC SECTIONS =====
function buildUI(){
  // Features
  const feats=[
    {svg:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M15 21l6-6"/></svg>',t:MODES.length+' Game Modes',d:'Master every combat style across all modes.'},
    {svg:S.trophy,t:'Tier System',d:'HT1 through LT5 — climb the ranks and prove your skill.'},
    {svg:S.people,t:'Community',d:'Join a thriving community of PvP enthusiasts.'},
    {svg:S.code,t:'API Access',d:'Integrate player data into your own tools and bots.'}
  ];
  document.getElementById('featGrid').innerHTML=feats.map(f=>`<div class="crd fc"><div class="fci">${f.svg}</div><h3>${f.t}</h3><p>${f.d}</p></div>`).join('');

  // IP buttons
  document.getElementById('cpBtn').innerHTML=S.copy+' Copy IP';
  document.getElementById('dcBtn').innerHTML=S.discord+' Discord';
  document.getElementById('dcBtn').onclick=()=>window.open(gS().discord,'_blank');

  // Page headers with SVG
  document.getElementById('rkH').innerHTML=S.trophy+' Rankings';
  document.getElementById('tsH').innerHTML=S.flask+' Testers';
  document.getElementById('apiH').innerHTML=S.code+' API Documentation';
  document.getElementById('panH').innerHTML=S.crown+' Owner / Admin Panel';

  // Info button
  document.getElementById('infoBtn').innerHTML=S.info+' Information';

  // Info modal content
  document.getElementById('infC').innerHTML=`<div class="mhandle"></div>
    <button class="mcl" onclick="closeMs()"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    <h2>${S.info} Tier & Title Information</h2>
    <h3 style="font-weight:700;font-size:14px;margin-bottom:6px">Point Values</h3>
    <table class="itbl"><tr><th>Tier</th><th>Points</th></tr>
    ${[['HT1',60],['LT1',45],['HT2',30],['LT2',20],['HT3',10],['LT3',6],['HT4',4],['LT4',3],['HT5',2],['LT5',1]].map(([t,p])=>`<tr><td><span class="tbdg ${t.toLowerCase()}">${t}</span></td><td>${p}</td></tr>`).join('')}
    </table>
    <h3 style="font-weight:700;font-size:14px;margin:16px 0 6px">Titles</h3>
    <table class="itbl"><tr><th>Title</th><th>Points</th></tr>
    <tr><td>${TI.Rookie} Rookie</td><td>1–9</td></tr>
    <tr><td>${TI.Novice} Novice</td><td>10–19</td></tr>
    <tr><td>${TI.Cadet} Cadet</td><td>20–49</td></tr>
    <tr><td>${TI.Specialist} Specialist</td><td>50–99</td></tr>
    <tr><td>${TI['Combat Ace']} Combat Ace</td><td>100–249</td></tr>
    <tr><td>${TI['Combat Master']} Combat Master</td><td>250–399</td></tr>
    <tr><td>${TI['Combat Grandmaster']} Combat Grandmaster</td><td>400–549</td></tr>
    <tr><td>${TI['Angelic Master']} Angelic Master</td><td>550–699</td></tr>
    <tr><td>${TI['Heavenly Descendent']} Heavenly Descendent</td><td>700+</td></tr>
    </table>
    <h3 style="font-weight:700;font-size:14px;margin:16px 0 6px">Overall Tab</h3>
    <p style="font-size:13px;color:var(--fg2);margin-bottom:12px">The Overall tab shows each player's total points summed across all ${MODES.length} game modes. It is not a game mode itself — it is auto-calculated.</p>
    <h3 style="font-weight:700;font-size:14px;margin-bottom:6px">Combat Master Requirement</h3>
    <p style="font-size:13px;color:var(--fg2)">A player must have <strong>LT2 or higher</strong> in every single one of the ${MODES.length} game modes to earn Combat Master. If they have 250+ points but haven't met this condition, they remain at Combat Ace with a warning listing the missing modes.</p>
    <div style="text-align:right;margin-top:18px"><button class="btn-o" onclick="closeMs()">Close</button></div>`;

  // API content
  document.getElementById('apiContent').innerHTML=`
    <h3 style="font-weight:600;font-size:16px;margin-bottom:4px;display:flex;align-items:center;gap:6px">${S.arrowR} GET <code style="color:var(--gld)">/api/players</code></h3>
    <p style="color:var(--fg2);font-size:13px;margin-bottom:6px">Returns all players with tiers, points, and title.</p>
    <div class="cb"><button class="cpb" onclick="cpCode(this)">Copy</button><span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/players'</span>);
<span class="kw">const</span> players = <span class="kw">await</span> res.<span class="fn">json</span>();
<span class="cm">// [{ username, region, tiers, points, title, isPremium }, ...]</span></div>
    <h3 style="font-weight:600;font-size:16px;margin-bottom:4px;display:flex;align-items:center;gap:6px">${S.arrowR} GET <code style="color:var(--gld)">/api/player/:username</code></h3>
    <p style="color:var(--fg2);font-size:13px;margin-bottom:6px">Returns a single player by username.</p>
    <div class="cb"><button class="cpb" onclick="cpCode(this)">Copy</button><span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/player/Dream'</span>);
<span class="kw">const</span> player = <span class="kw">await</span> res.<span class="fn">json</span>();
<span class="cm">// { username: "Dream", region: "NA", tiers: { Sword: "HT1", ... },</span>
<span class="cm">//   points: 330, title: "Combat Master", isPremium: true }</span></div>
    <h3 style="font-weight:600;font-size:16px;margin-top:24px;margin-bottom:8px">Response Shape</h3>
    <div class="cb"><button class="cpb" onclick="cpCode(this)">Copy</button>{
  <span class="str">"username"</span>: <span class="str">"string"</span>,
  <span class="str">"region"</span>: <span class="str">"NA | EU | AS | SA | OC | AF"</span>,
  <span class="str">"isPremium"</span>: <span class="kw">boolean</span>,
  <span class="str">"tiers"</span>: { <span class="str">"Axe"</span>: <span class="str">"HT1"</span>, ... },
  <span class="str">"points"</span>: <span class="kw">number</span>,
  <span class="str">"title"</span>: <span class="str">"string"</span>
}</div>`;

  // Build hamburger + mobile tabs
  const hNav=document.getElementById('hdropNav');
  const bTab=document.getElementById('btabIn');
  hNav.innerHTML=NAV_ITEMS.map(n=>`<span onclick="showPage('${n.id}')" id="hd-${n.id}" ${n.auth?'style="display:none"':''}>${n.svg} ${n.label}</span>`).join('');
  bTab.innerHTML=NAV_ITEMS.map(n=>`<span onclick="showPage('${n.id}')" id="bt-${n.id}" ${n.auth?'style="display:none"':''}>${n.svg}<span style="font-size:10px">${n.label}</span></span>`).join('');

  // Admin section
  buildAdminSec();
}

function cpCode(btn){
  const block=btn.parentElement;
  const text=block.textContent.replace('Copy','').trim();
  navigator.clipboard.writeText(text).then(()=>{btn.classList.add('done');btn.innerHTML=S.check+' Copied';setTimeout(()=>{btn.classList.remove('done');btn.innerHTML='Copy'},2000)});
}

// ===== INIT =====
buildUI();
initStars();
updThemeIcon();
upAuth();
apS();
upHdr();
window.addEventListener('cloud-ready',()=>{
  // Prefer Firestore data if it contains something — else keep what was loaded from localStorage on init
  const cloudPlayers = window.cloudStore['hp'];
  if(cloudPlayers && Array.isArray(cloudPlayers) && cloudPlayers.length > 0)
    window.players = cloudPlayers;
  // else: window.players already has localStorage data from _lsGet at init — keep it

  const cloudModes = window.cloudStore['hm'];
  if(cloudModes && Array.isArray(cloudModes) && cloudModes.length > 0) MODES = cloudModes;

  const cloudModeIC = window.cloudStore['hmi'];
  if(cloudModeIC && typeof cloudModeIC === 'object') MODE_IC = cloudModeIC;
  if(!MODE_IC.Overall) MODE_IC.Overall = DEFAULT_MODE_IC.Overall;

  // Seed tester IDs only if Firestore truly has none yet
  if(!window.cloudStore['ht']) lss('ht',['1503408628261191755']);

  // If users exist only in localStorage (Firestore was empty) — push them up to Firestore now
  if(!window.cloudStore['hu']){
    const localUsers=_lsGet('hu',[]);
    if(localUsers.length>0) lss('hu',localUsers);
  }

  // Run skin type migration on freshly loaded players
  let changed=false;
  window.players.forEach(p=>{
    if(!p.skinType){
      if(p.isPremium)p.skinType='java';
      else if(p.skinUrl)p.skinType='raw';
      else p.skinType='none';
      changed=true;
    }
  });
  if(changed)savePlayers();

  renderRank();
  upAuth();
  apS();
});
