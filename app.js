require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => res.redirect(process.env.GITHUB_REPO));

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
