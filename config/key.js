if(process.env.NODE_ENV === 'production'){ //환경변수 process.env.NODE_ENV 가 local환경인 delelopment이면 dev.js에서 몽고디비 url가져오고 / deploy(배포)한 후인 production이면 prod.js에서 가져온다
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}