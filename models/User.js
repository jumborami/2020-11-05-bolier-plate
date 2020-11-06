const mongoogse = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //빈칸 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //user의 역할. 사용자인지 관리자인지 등
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //토큰 사용 기한
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델로 스키마를 감싼다 (모델의 이름, 스키마 이름)

module.exports = { User }
