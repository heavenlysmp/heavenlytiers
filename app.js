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
  'Combat Grandmaster':'<svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700"><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4z"/><path d="M5 16h14v3H5z"/></svg>'
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

// SVG fallback shape for broken mode icons
const MODE_FB='<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="20" height="20" rx="4"/><path d="M10 14h8M14 10v8"/></svg>';

// Person silhouette SVG for cracked skins
const PERSON_SM=`<div class="svgp">${S.person}</div>`;
const PERSON_LG=`<div class="svgp svgp-lg">${S.person}</div>`;

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
const TITLE_THRESHOLDS=[{n:'Unranked',min:0},{n:'Rookie',min:1},{n:'Novice',min:10},{n:'Cadet',min:20},{n:'Specialist',min:50},{n:'Combat Ace',min:100},{n:'Combat Master',min:250},{n:'Combat Grandmaster',min:400}];
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
function gU(){
  if(window.getCloudValue&&window.cloudStore&&window.cloudStore['hu']!==undefined)
    return window.cloudStore['hu']||[];
  return _lsGet('hu',[]);
}
function sU(u){
  try{localStorage.setItem('hu',JSON.stringify(u))}catch(e){}
