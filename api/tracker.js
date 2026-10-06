import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS tracker (k TEXT PRIMARY KEY, v TEXT NOT NULL)`;

    if (req.method === 'GET') {
      const rows = await sql`SELECT k, v FROM tracker`;
      return res.status(200).json(Object.fromEntries(rows.map(r => [r.k, r.v])));
    }

    if (req.method === 'POST') {
      if (!process.env.EDIT_PASSWORD || req.headers['x-edit-key'] !== process.env.EDIT_PASSWORD)
        return res.status(401).json({ error: 'Unauthorized' });
      const { k, v, verify } = req.body || {};
      if (verify) return res.status(200).json({ ok: true });
      if (typeof k !== 'string' || !/^[a-z]+:\d+:[a-z]$/.test(k) || typeof v !== 'string' || v.length > 200)
        return res.status(400).json({ error: 'Bad request' });
      if (v === '') await sql`DELETE FROM tracker WHERE k = ${k}`;
      else await sql`INSERT INTO tracker (k, v) VALUES (${k}, ${v}) ON CONFLICT (k) DO UPDATE SET v = EXCLUDED.v`;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}
