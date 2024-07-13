const axios = require("axios");
const cheerio = require("cheerio");
// const { Cheerio } = require("cheerio");
const rankingController = {
    //GET ALL TRENDING NEWS
    getRank: async (req, res) => {
        const limit = Number(req.query.limit);
        try {
            axios("https://www.topuniversities.com/sites/default/files/qs-rankings-data/en/3816281.txt?rp1c4k")
                .then((res1) => {

                    const html = res1.data.data;
                    if (limit && limit > 0) {
                        res.status(200).json(html.slice(0, limit));
                    }
                })


        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = rankingController;