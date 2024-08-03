function serverError(res, error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log('Ошибка в коде приложения: ', error);
}

module.exports = {
    serverError
}