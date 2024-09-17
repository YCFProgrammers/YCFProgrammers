const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function searchGoogle(query) {
    try {
        const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);
        const results = [];
        $('.g').each((i, elem) => {
            const title = $(elem).find('h3').text();
            const link = $(elem).find('a').attr('href');
            const snippet = $(elem).find('.VwiC3b').text();
            if (title && link && snippet) {
                results.push({ title, link, snippet });
            }
        });
        return results.slice(0, 5);
    } catch (error) {
        console.error('Error searching Google:', error);
        return null;
    }
}

async function webScraping(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('title').text();
        const paragraphs = $('p').map((i, el) => $(el).text()).get().slice(0, 3);
        return { title, paragraphs };
    } catch (error) {
        console.error('Error scraping website:', error);
        return null;
    }
}

app.post('/search', async (req, res) => {
    const { query } = req.body;
    console.log('Received search query:', query);
    try {
        const results = await searchGoogle(query);
        console.log('Search results:', results);
        res.json(results);
    } catch (error) {
        console.error('Error in /search:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
});

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    console.log('Received scrape request for URL:', url);
    try {
        const results = await webScraping(url);
        console.log('Scraping results:', results);
        res.json(results);
    } catch (error) {
        console.error('Error in /scrape:', error);
        res.status(500).json({ error: 'An error occurred while scraping' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});