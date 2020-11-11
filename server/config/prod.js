module.exports = {
    mongoURI: process.env.MONGO_URI //배포 시 사용. heroku 에서 config Vars에 MONGO_URI를 넣고 그 옆칸에 ssh키를 넣는다
}