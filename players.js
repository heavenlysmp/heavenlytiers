const { readCloudValue, setCors } = require('./_lib/firebaseAdmin');
const { toPublicPlayer } = require('./_lib/tiers');

const DEFAULT_MODES = ['Axe', 'Sword', 'Pot', 'NethPot', 'UHC', 'Crystal', 'SMP', 'Mace', 'Lifesteal', 'Spear', 'Spear-Mace'];

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [players, modes] = await Promise.all([
      readCloudValue('hp', []),
      readCloudValue('hm', DEFAULT_MODES),
    ]);

    const list = Array.isArray(players) ? players : [];
    const modeList = Array.isArray(modes) && modes.length ? modes : DEFAULT_MODES;

    const out = list.map((p) => toPublicPlayer(p, modeList));
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(out);
  } catch (err) {
    console.error('GET /api/players failed:', err);
    return res.status(500).json({ error: 'Internal error fetching players' });
  }
};
