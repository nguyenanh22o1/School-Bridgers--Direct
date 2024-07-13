// import { Configuration, OpenAIApi } from "openai"
const openai1 = require("openai");
const axios = require("axios");

const gptController = {
    getShit: async (req, res) => {
        try {
            // console.log("Test1")
            const openai = new openai1.OpenAIApi(new openai1.Configuration({ apiKey: process.env.GPT_KEY }))
            // console.log("Test2")
            const temp = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.question }]
            })
            console.log(temp.data.choices[0].message.content)
            res.status(200).json(temp.data.choices[0].message)
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
module.exports = gptController;