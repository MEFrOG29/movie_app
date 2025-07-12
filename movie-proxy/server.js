require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.get('/movies/popular', async (req, res) => {
    try {
        const url = `${TMDB_BASE_URL}/movie/popular?language=ru-RU&page=1`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                accept: 'application/json',
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при обращении к TMDB' });
    }
});

app.get('/movies/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Не указано поле query' });

    try {
        const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=ru-RU`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                accept: 'application/json',
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при поиске фильма' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Прокси работает на порту ${PORT}`);
});
