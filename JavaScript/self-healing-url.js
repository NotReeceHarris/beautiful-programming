/* 
*   This is a simple example of a self-healing URL. It's a URL that will redirect to the correct URL if the URL is incorrect. 
*   For example, if you have a blog post with the title "Hello World" and the URL is "/p/1/hello-world", then if someone goes 
*   to "/p/1/hello-world-123", it will redirect to "/p/1/hello-world".
*
*   This is useful for SEO purposes. If someone links to your blog post with the wrong URL, you don't want to lose that SEO
*/

var express = require('express');
const cookieParser = require("cookie-parser");
var app = express();
const posts = require('../data/posts.json');

app.use(cookieParser());

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

app.get('/', function (req, res) {
    console.log(req.cookies)
    return res.send('<ul><li><a href="/p/1/hello-world">Hello World</a></li><li><a href="/p/2/bonjour-monde">Bonjour Monde</a></li><li><a href="/p/3/hola-mundo">Hola Mundo</a></li></ul>');
});

app.get('/p/:id/:title', function (req, res) {
    const id = req.params.id;
    const title = req.params.title;
    const post = posts[id];

    if (title !== post.title.toLowerCase().replace(' ', '-')) {
        return res.redirect(`/p/${id}/${slugify(post.title)}`);
    }

    res.send(post.content);
});

app.get('/p/:id', function (req, res) {
    const id = req.params.id;
    const title = req.params.title;
    const post = posts[id];

    if (title !== post.title.toLowerCase().replace(' ', '-')) {
        return res.redirect(`/p/${id}/${slugify(post.title)}`);
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});