require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerConfig = yaml.load(fs.readFileSync(
    './src/swagger/conf.yml',
    { encoding: 'utf8' }
));
const apiRouter = require('./src/routes/api');
const cacheRouter = require('./src/routes/cache');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get('/', (req, res) => res.redirect(process.env.GITHUB_REPO));
app.use('/api', apiRouter);
app.use('/cache', cacheRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
