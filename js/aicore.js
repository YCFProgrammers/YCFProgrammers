class AICore {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.classifier = new natural.BayesClassifier();
    this.sentenceEncoder = null;
    this.knowledgeBase = {};
    this.initializeAI();
  }

  async initializeAI() {
    // Load pre-trained sentence encoder model
    this.sentenceEncoder = await use.load();

    // Train the classifier with sample intents
    this.classifier.addDocument('What is the weather like?', 'weather');
    this.classifier.addDocument('Tell me about the stock market', 'finance');
    this.classifier.addDocument('Who won the last World Cup?', 'sports');
    this.classifier.addDocument('How do I cook pasta?', 'cooking');
    this.classifier.addDocument('What are the symptoms of COVID-19?', 'health');
    this.classifier.train();

    // Initialize knowledge base
    await this.updateKnowledgeBase();
  }

  async updateKnowledgeBase() {
    // Simulating knowledge base update (in a real scenario, this would fetch from a database or API)
    this.knowledgeBase = {
      weather: "I can provide weather information for various locations. What city are you interested in?",
      finance: "I can discuss stock markets, cryptocurrencies, and economic trends. What specific financial topic would you like to know about?",
      sports: "I can provide information about various sports and recent events. Which sport are you interested in?",
      cooking: "I can help with recipes, cooking techniques, and kitchen tips. What dish are you planning to make?",
      health: "I can provide general health information, but always consult a doctor for medical advice. What health topic are you curious about?"
    };
  }

  async searchGoogle(query) {
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: 'YOUR_GOOGLE_API_KEY',
          cx: 'YOUR_SEARCH_ENGINE_ID',
          q: query
        }
      });
      return response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
      }));
    } catch (error) {
      console.error('Error searching Google:', error);
      return [];
    }
  }

  async scrapeWebsite(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      return $('body').text();
    } catch (error) {
      console.error('Error scraping website:', error);
      return '';
    }
  }

  async generateEmbedding(text) {
    const embedding = await this.sentenceEncoder.embed(text);
    return embedding;
  }

  async findMostRelevantContent(query, content) {
    const queryEmbedding = await this.generateEmbedding(query);
    const contentEmbeddings = await Promise.all(content.map(c => this.generateEmbedding(c)));

    const similarities = contentEmbeddings.map(emb =>
      tf.tensor1d(emb).dot(tf.tensor1d(queryEmbedding)).dataSync()[0]
    );

    const maxSimilarityIndex = similarities.indexOf(Math.max(...similarities));
    return content[maxSimilarityIndex];
  }

  async generateResponse(input) {
    const intent = this.classifier.classify(input);
    const searchResults = await this.searchGoogle(`${intent} ${input}`);
    let scrapedContent = [];

    for (const result of searchResults.slice(0, 3)) {
      const content = await this.scrapeWebsite(result.link);
      scrapedContent.push(content);
    }

    const relevantContent = await this.findMostRelevantContent(input, scrapedContent);
    const tokens = this.tokenizer.tokenize(relevantContent);
    const uniqueTokens = [...new Set(tokens)];
    const relevantTokens = uniqueTokens.filter(token => input.toLowerCase().includes(token.toLowerCase()));

    let response = `Based on the ${intent} topic, here's what I found:\n\n`;
    response += relevantTokens.map(token => {
      const sentenceWithToken = relevantContent.split('.').find(sentence => sentence.toLowerCase().includes(token.toLowerCase()));
      return sentenceWithToken ? sentenceWithToken.trim() + '.' : '';
    }).join(' ');

    // Incorporate knowledge base information
    if (this.knowledgeBase[intent]) {
      response += `\n\nAdditionally, ${this.knowledgeBase[intent]}`;
    }

    return response;
  }
}