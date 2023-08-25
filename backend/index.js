const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const OPENAI_API_KEY = ``; // Replace with your actual API key

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post('/analyze-emotionq', async (req, res) => {
    try {
        const { text } = req.body;
    
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 170,
          });

         console.log(completion.data.choices[0].text);

         res.json(completion.data.choices[0].text)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
