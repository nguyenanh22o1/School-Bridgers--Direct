const axios = require("axios");
const newsController = {
    //GET ALL TRENDING NEWS
    getNew: async (req, res) => {
        try {
            const news = await axios.get(`https://newsapi.org/v2/everything?q=education+student&domains=theguardian.com&sortBy=popularity&apiKey=acd5afacbc4546da9187d4d7095650c5`);
            // console.log(news);
            res.status(200).json(news.data.articles);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = newsController;