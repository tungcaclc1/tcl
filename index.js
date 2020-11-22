const {
    _sendVerifyCode,
    _quickRegister,
    _spin,
    _login,
} = require('./api')
const fs = require('fs')
    , es = require('event-stream');
const FILE = './accounts.txt'

const s = fs.createReadStream(FILE)
    .pipe(es.split())
    .pipe(es.mapSync(async function (line) {

        s.pause();

        try {
            const { gmail } = JSON.parse(line)
            const { token } = await _login(gmail)
            let response = await _spin(gmail, token)
            const {prizeName} = response.data ? response.data : null
            console.log(prizeName)
            fs.appendFile('./prizes.txt', JSON.stringify({
                gmail,
                token,
                prizeName,
            }) + '\n', () => { })
            s.resume();

        } catch (e) {
            s.resume();
        }
    }).on('error', function (err) {
        console.log('Read file error')
    }).on('end', function () {
        console.log('Done')
    }))