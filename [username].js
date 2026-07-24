const { readCloudValue, setCors } = require('../_lib/firebaseAdmin');
const { toPublicPlayer } = require('../_lib/tiers');

const DEFAULT_MODES = ['Axe', 'Sword', 'Pot', 'NethPot', 'UHC', 'Crystal', 'SMP', 'Mace', 'Lifesteal', 'Spear', 'Spear-Mace'];

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username required' });

  try {
    const [players, modes] = await Promise.all([
      readCloudValue('hp', []),
      readCloudValue('hm', DEFAULT_MODES),
    ]);

    const list = Array.isArray(players) ? players : [];
    const modeList = Array.isArray(modes) && modes.length ? modes : DEFAULT_MODES;

    const target = String(username).toLowerCase();
    const player = list.find((p) => p.username && p.username.toLowerCase() === target);

    if (!player) return res.status(404).json({ error: 'Player not found' });

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(toPublicPlayer(player, modeList));
  } catch (err) {
    console.error('GET /api/player/[username] failed:', err);
    return res.status(500).json({ error: 'Internal error fetching player' });
  }
};
