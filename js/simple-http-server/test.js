const shs = require('./index.js')

shs.route('/', (req, res) => {
    console.log(req.cookies)
    return res.html('{"foo": "bar"}');
})

shs.route('/error', (req, res) => {
    throw new Error('Test error')
    return res.json('{"foo": "bar"}');
})

shs.listen()