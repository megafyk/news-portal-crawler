const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Parser = require('rss-parser');
const app = express();

// image support
const IMGTYPES = 'jpg|jpeg|png|JPG|JPEG|PNG';
const sources = [
    'https://thanhnien.vn/rss/viet-nam.rss',
    //'http://vietnamnet.vn/rss/thoi-su.rss',
    'https://vnexpress.net/rss/thoi-su.rss',
    'https://thanhnien.vn/rss/the-gioi.rss',
    //'https://vietnamnet.vn/rss/the-gioi.rss',
    'https://vnexpress.net/rss/the-gioi.rss'
];
const categories = [{
        code: 'news',
        title: 'Thời sự'
    },
    {
        code: 'world',
        title: 'Thế giới'
    },
];
var Post = require('../models/post');

// Mongodb Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crawler', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo Connection error"));
db.once("open", function (callback) {
    console.info("Mongo Connection Succeeded");
});
// End Mongodb Connection

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/update', async (req, res) => {
    let parser = new Parser();
    let feeds = [];
    let items = [];
    let promises = [];

    sources.forEach(source => {
        promises.push(new Promise(function (resolve, reject) {
            parser.parseURL(source).then(data => {
                resolve(data);
            });
        }));
    });

    await Promise.all(promises).then((data) => {
        feeds = data;
    });

    for (let i = 0; i < feeds.length; i++) {
        let category = categories[0].code;
        for (let j = 0; j < categories.length; j++) {
            if (feeds[i].title.includes(categories[j].title)) {
                category = categories[j].code;
            }
        }

        for (let j = 0; j < feeds[i].items.length; j++) {
            let posts = await Post.find({
                source: feeds[i].items[j].link
            });
            if (posts.length === 0) {
                let imageRex = new RegExp(`<img.*?src=["\'](([^\'"]*)\.(${IMGTYPES}).*?)["\']`);
                let imageUrl = imageRex.exec(feeds[i].items[j].content) ?
                    imageRex.exec(feeds[i].items[j].content)[1] : '';
                items.push({
                    source: feeds[i].items[j].link,
                    title: feeds[i].items[j].title,
                    imageUrl: imageUrl,
                    description: feeds[i].items[j].contentSnippet,
                    pubDate: feeds[i].items[j].pubDate,
                    category: category
                });
            }
        }
    }

    if (items.length !== 0) {
        Post.collection.insertMany(items, (err, docs) => {
            if (err) {
                console.error(err);
                res.send({
                    success: false,
                    message: 'Failed.'
                });
            } else {
                console.info('Items has been inserted to collection.');
                res.send({
                    success: true,
                    items: items,
                    message: 'Successfully.'
                });
            }
        });
    } else {
        res.send({
            success: true,
            message: 'Successfully.'
        })
    }
});

app.get('/news', (req, res) => {
    Post.find({
        category: categories[0].code
    }, (err, news) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                news: news
            });
        }
    });
});

app.get('/world', (req, res) => {
    Post.find({
        category: categories[1].code
    }, (err, world) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                world: world
            });
        }
    });
});

app.listen(process.env.PORT || 8081);