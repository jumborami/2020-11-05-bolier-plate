const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리인 salt를 만든다
var jwt = require('jsonwebtoken');

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

userSchema.pre('save', function(next){ //몽구스에서 가져온 메서드. userSchema를 save하기 전에 function을 수행한다
    var user = this; //userSchema(사용자가 가입한 정보)가 user에 들어간다

    //비번이 변경될 때에만
    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다. // 위에서 만든 salt를 이용해서 암호화한다
        bcrypt.genSalt(saltRounds, function(err, salt) { //아까 만든 saltRounds로 salt를 생성 -> genSalt
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err, hash) { //user.password는 사용자가 가입할 때 넣은 비밀번호 // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash; //오류가 없다면 기존 비번을 hash로 바꾼다
                next();
            });
        });
    } else {
        next();
    }
}); 

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainpassword 1234567   암호화된 비밀번호 $2b$10$V10Rumr0imRcHk6n51dEd.aMNXYLHrpl4.iEnxhruFMO2NDwHgVBO(암호화된 걸 복호화할 수는 없으므로 원래 비번과 암호화된 비번을 비교한다)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch); //이게 index.js의 comparePassword에 적용됨
    }) 
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken'); //user,_id와 'secretToken'을 합쳐서 토큰을 만듦
      //시크릿토큰을 넣음으로서 유저아이디가 누구인지 알 수 있다.  고로 토큰을 가지고 유저가 누군지 알 수 있음
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function( token, cb ) {
    var user = this;

    //토큰을 decode 한다.
    //user._id + '' = token
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        //db의 _id가 decoded 이고 db의 token이 token인 것 찾기
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })

    })
}

const User = mongoose.model('User', userSchema) //모델로 스키마를 감싼다 (모델의 이름, 스키마 이름)

module.exports = { User }
