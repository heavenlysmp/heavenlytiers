// Mirrors the points/title logic in app.js so the public API returns the
// exact same numbers shown on the site. Kept in sync manually — if you
// change tier points or title thresholds in app.js, update here too.

const TIER_PTS = { HT1: 60, LT1: 45, HT2: 30, LT2: 20, HT3: 10, LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1 };
// "R" prefix = Retired — same points as the base tier.
Object.keys(TIER_PTS).forEach((k) => { TIER_PTS['R' + k] = TIER_PTS[k]; });

const LT2_OK = ['HT1', 'LT1', 'HT2', 'LT2']; // retired tiers deliberately excluded

const TITLE_THRESHOLDS = [
  { n: 'Unranked', min: 0 },
  { n: 'Rookie', min: 1 },
  { n: 'Novice', min: 10 },
  { n: 'Cadet', min: 20 },
  { n: 'Specialist', min: 50 },
  { n: 'Combat Ace', min: 100 },
  { n: 'Combat Master', min: 250 },
  { n: 'Combat Grandmaster', min: 400 },
  { n: 'Angelic Master', min: 550 },
  { n: 'Heavenly Descendent', min: 700 },
];

function getPoints(player, modes) {
  let sum = 0;
  for (const m of modes) {
    const t = player.tiers && player.tiers[m];
    if (t && TIER_PTS[t]) sum += TIER_PTS[t];
  }
  return sum;
}

function getMissingLT2(player, modes) {
  const missing = [];
  for (const m of modes) {
    const t = player.tiers && player.tiers[m];
    if (!t || !LT2_OK.includes(t)) missing.push(m);
  }
  return missing;
}

function getTitle(player, modes) {
  const pts = getPoints(player, modes);
  if (pts >= 700) return 'Heavenly Descendent';
  if (pts >= 550) return 'Angelic Master';
  if (pts >= 400) return 'Combat Grandmaster';
  if (pts >= 250) return getMissingLT2(player, modes).length ? 'Combat Ace' : 'Combat Master';
  if (pts >= 100) return 'Combat Ace';
  if (pts >= 50) return 'Specialist';
  if (pts >= 20) return 'Cadet';
  if (pts >= 10) return 'Novice';
  if (pts >= 1) return 'Rookie';
  return 'Unranked';
}

// Shapes a raw Firestore player record into the public API response shape.
function toPublicPlayer(p, modes) {
  return {
    username: p.username,
    region: p.region || null,
    isPremium: !!p.isPremium,
    skinType: p.skinType || (p.isPremium ? 'java' : p.skinUrl ? 'raw' : 'none'),
    tiers: p.tiers || {},
    points: getPoints(p, modes),
    title: getTitle(p, modes),
  };
}

module.exports = { TIER_PTS, LT2_OK, TITLE_THRESHOLDS, getPoints, getMissingLT2, getTitle, toPublicPlayer };
