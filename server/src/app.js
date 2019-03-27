const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Parser = require('rss-parser');
const app = express();

// image support
const IMGTYPES = 'jpg|jpeg|png|JPG|JPEG|PNG';
const sources = [
    // 'https://thanhnien.vn/rss/viet-nam.rss',
    // 'http://vietnamnet.vn/rss/thoi-su.rss',
    'https://vnexpress.net/rss/thoi-su.rss',
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

app.post('/init', (req, res) => {
    let parser = new Parser();
    let items = [];
    let promises = [];

    sources.forEach(source => {
        promises.push(new Promise(function (resolve, reject) {
            parser.parseURL(source).then(data => {
                resolve(data);
            });
        }));
    });
    Promise.all(promises).then((data) => {
        data.forEach(feed => {
            let category = categories[0].code;
            for (let i = 0; i < categories.length; i++) {
                if (feed.title.includes(categories[i].title)) {
                    category = categories[i].code;
                }
            }

            feed.items.forEach(item => {
                let imageRex = new RegExp(`<img.*?src=["\'](([^\'"]*)\.(${IMGTYPES}).*?)["\']`);
                let imageUrl = imageRex.exec(item.content) ?
                    imageRex.exec(item.content)[1] : '';
                items.push({
                    source: item.link,
                    title: item.title,
                    imageUrl: imageUrl,
                    description: item.contentSnippet,
                    pubDate: item.pubDate,
                    category: category
                });
            });
        });

        Post.collection.insertMany(items, (err, docs) => {
            if (err) {
                console.error(err);
                res.send({
                    success: false,
                    items: [],
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
    })
});




app.post('/update', (req, res) => {

});

app.get('/news', (req, res) => {
    res.send("This is greetings from server");
});



app.listen(process.env.PORT || 8081);