const express = require('express');
const cors = require('cors');
const { connectToMongoDB, getDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const COLLECTION = process.env.COLLECTION_NAME || 'personalities';
const MAP_COLLECTION = process.env.MAP_COLLECTION_NAME || 'bangladeshmap';

app.use(cors());
app.use(express.json());

async function getAllPersonalities() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

// Get all personalities
app.get('/api/personalities', async (req, res) => {
  try {
    const { category, search, featured, limit } = req.query;
    const personalities = await getAllPersonalities();

    let results = [...personalities];

    if (category && category !== 'all') {
      results = results.filter(p => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.nameEnglish.toLowerCase().includes(q) ||
        p.nameBangla.includes(search) ||
        p.profession.some(prof => prof.toLowerCase().includes(q)) ||
        p.professionBangla.some(prof => prof.includes(search)) ||
        p.category.toLowerCase().includes(q) ||
        (p.birthplace && p.birthplace.toLowerCase().includes(q))
      );
    }

    if (featured === 'true') {
      results = results.filter(p => p.featured);
    }

    if (limit) {
      results = results.slice(0, parseInt(limit));
    }

    const summarized = results.map(p => ({
      id: p._id,
      nameEnglish: p.nameEnglish,
      nameBangla: p.nameBangla,
      category: p.category,
      profession: p.profession,
      professionBangla: p.professionBangla,
      birthDate: p.birthDate,
      deathDate: p.deathDate,
      birthplace: p.birthplace,
      birthplaceBangla: p.birthplaceBangla,
      portrait: p.portrait,
      shortBioEnglish: p.shortBioEnglish,
      shortBioBangla: p.shortBioBangla,
      featured: p.featured,
    }));

    res.json({ personalities: summarized, total: summarized.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single personality by ID
app.get('/api/personalities/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const doc = await db.collection(COLLECTION).findOne({ _id: req.params.id });
    if (!doc) {
      return res.status(404).json({ error: 'Personality not found' });
    }
    const { _id, ...personality } = doc;
    res.json(personality);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = [
      { id: 'science', nameEnglish: 'Science & Technology', nameBangla: 'বিজ্ঞান ও প্রযুক্তি' },
      { id: 'literature', nameEnglish: 'Literature & Poetry', nameBangla: 'সাহিত্য ও কবিতা' },
      { id: 'arts', nameEnglish: 'Arts & Culture', nameBangla: 'শিল্প ও সংস্কৃতি' },
      { id: 'history', nameEnglish: 'National History & Leadership', nameBangla: 'জাতীয় ইতিহাস ও নেতৃত্ব' },
      { id: 'medicine', nameEnglish: 'Medicine & Health', nameBangla: 'চিকিৎসা ও স্বাস্থ্য' },
      { id: 'sports', nameEnglish: 'Sports & Athletics', nameBangla: 'খেলাধুলা ও ক্রীড়া' },
      { id: 'education', nameEnglish: 'Education & Social Reform', nameBangla: 'শিক্ষা ও সমাজ সংস্কার' },
    ];

    const personalities = await getAllPersonalities();

    const withCounts = categories.map(cat => ({
      ...cat,
      count: personalities.filter(p => p.category === cat.id).length,
    }));

    res.json(withCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stats
app.get('/api/stats', async (req, res) => {
  try {
    const personalities = await getAllPersonalities();
    const total = personalities.length;
    const featured = personalities.filter(p => p.featured).length;
    const categories = [...new Set(personalities.map(p => p.category))].length;
    res.json({ total, featured, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Bangladesh map (GeoJSON) for the interactive map
app.get('/api/map', async (req, res) => {
  try {
    const db = getDatabase();
    const doc = await db.collection(MAP_COLLECTION).findOne({ _id: 'bangladesh-map' });
    if (!doc) {
      return res.status(404).json({ error: 'Map data not found' });
    }
    const { _id, ...mapData } = doc;
    res.json(mapData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });