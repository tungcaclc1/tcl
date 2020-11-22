const axios = require('axios');
const random = require('random-name')
const fs = require('fs')
const Promise = require('bluebird')

const _randomInt = (length) => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const _randomName = () => {
    return random.first() + random.middle()
}

const _randomMail = (name) => {
    return `${name.toLowerCase()}${_randomInt(6)}@gmail.com`
}

const _randomClientID = () => {
    return _randomInt(8)
}

const _sendVerifyCode = async (mail, client) => {
    let data = `{"username":"${mail}","type":2,"brand":"defaultbrand","language":"vi","countryAbbr":"VN"}`;

    let config = {
        method: 'post',
        url: `https://sg.account.tcl.com/common/sendVerifyCode?clientId=20896005`,
        headers: {
            'Host': 'sg.account.tcl.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json;charset=utf-8',
            'Origin': 'https://www.tcl.com',
            'Connection': 'close',
            'Referer': 'https://www.tcl.com/vn/vi/create.html'
        },
        data: data
    };

    let response = await axios(config)
    return response.data
}

const _quickRegister = async (mail, name, code, client) => {
    let data = `{"username":"${mail}","nickname":"${name}","firstName":"","lastName":"","password":"c34660aa83babe459832cdaaf770fe55","code":"${code}","countryAbbr":"VN","language":"vi","type":2,"brand":"defaultbrand"}`;

    let config = {
        method: 'post',
        url: `https://sg.account.tcl.com/account/quickRegister?clientId=20896005`,
        headers: {
            'Host': 'sg.account.tcl.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json;charset=utf-8',
            'Origin': 'https://www.tcl.com',
            'Connection': 'close',
            'Referer': 'https://www.tcl.com/vn/vi/create.html'
        },
        data: data
    };

    let response = await axios(config)
    return response.data
}

const _spin = async (mail, token) => {
    let data = JSON.stringify({
        "channel": "default",
        "platform": "PC",
        "userId": mail
    });

    let config = {
        method: 'post',
        url: 'https://obgcms.tcl.com/lottery/api/lottery-record/launch/',
        headers: {
            'Host': 'obgcms.tcl.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'token': token,
            'activityId': '4',
            'user': mail,
            'lang': 'vi_VN',
            'timeZoneOffset': '7',
            'Origin': 'https://www.tcl.com',
            'Connection': 'close',
            'Referer': 'https://www.tcl.com/content/marketingList/midautumn_vn/index.html'
        },
        data: data
    };

    let response = await axios(config)
    return response.data
}

const _login = async (mail) => {
    let data = `{"username":"${mail}","password":"c34660aa83babe459832cdaaf770fe55","channel":"web","captchaKey":"8adcc0be35bcb306f45445044c3153b7fd78449a097d7a3327b3ee0a104c338e28e7d46111888b8c","captchaData":"","captchaRule":3}`

    let config = {
        method: 'post',
        url: 'https://sg.account.tcl.com/account/login?clientId=20896005',
        headers: {
            'Host': 'sg.account.tcl.com',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'https://www.tcl.com/vn/vi/login.html',
            'Content-Type': 'application/json;charset=utf-8',
            'Origin': 'https://www.tcl.com',
            'Connection': 'close'
        },
        data: data
    }
    let response = await axios(config)
    return response.data
}

module.exports = {
    _sendVerifyCode,
    _quickRegister,
    _spin,
    _login
}

// const multi = async () => {
//     try {
//         const name = _randomName()
//         const gmail = _randomMail(name)
//         console.log({ gmail })

//         let response = await _sendVerifyCode(gmail)
//         const { code: otp } = response.data
//         console.log({ otp })
//         response = await _quickRegister(gmail, name, otp)
//         const { token } = response
//         response = await _spin(gmail, token)
//         const { prizeName } = response.data
//         fs.appendFile('./accounts.txt', JSON.stringify({ gmail, name, prizeName }) + '\n', () => { })
//         console.log({prizeName})
//     } catch (error) {
//         console.log(error)
//     }
// }

// setImmediate(async()=>{
//     while(true){
//         const arr = new Array(1000)
//         await Promise.map(arr, multi, {concurrency:10})
//     }
// })

// setImmediate(async () => {
//     while (true) {
//         try {
//             const name = _randomName()
//             const gmail = _randomMail(name)

//             let response = await _sendVerifyCode(gmail)
//             const { code: otp } = response.data
//             console.log({ otp })
//             response = await _quickRegister(gmail, name, otp)
//             const { token } = response
//             response = await _spin(gmail, token)
//             const { prizeName } = response.data
//             fs.appendFile('./accounts.txt', JSON.stringify({ gmail, name, prizeName }) + '\n', () => { })
//             console.log({prizeName})
//         } catch (error) {
//             console.log(error)
//         }
//     }
// })
