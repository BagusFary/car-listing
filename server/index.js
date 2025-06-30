import express from "express";

const app = express();

const port = 3000;

app.get('/product/:id', () => {
    const productId = req.params.id;
    res.send(req.params);
    // res.send(`ID Product yang dicari adalah ${productId}`);
    // console.log(`ID Product yang dicari adalah ${productId}`);
});

app.post('/products', (req, res, next) => {
    console.log(`Product dan Page akan di proses di callback ke 2`);
    next();
}, (req, res) => {
    const product = req.query.keyword;
    const page = req.query.page;
    res.send(`Product yang dicari adalah ${product}, halaman yang diinginkan adalah ${page}`);
});

app.listen(port);