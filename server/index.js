const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const { auth } = require('./middleware/auth');

const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요! Holla!')
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~");
})

app.post('api/users/register', (req, res) => {
    //회원 가입 시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)

    //Bcrypt를 이용하여 비밀번호 암호화 거쳐서 save한다 (User.js에서)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('api/users//login', (req, res) => {
    //요청된 이메일을 디비에서 찾는다.
    User.findOne({ email: req.body.email}, (err, user) => {
        if(!user) { //User안에 해당 이메일이 한개도없다면
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 디비에 있다면 비밀번호가 맞는 비밀번호인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {//비번이 맞다면 맞다는 isMatch를보냄
            if(!isMatch)
                return res.json({ logginSuccess:false, message:'비밀전호가 다릅니다.'})

            //비밀번호까지 동일하다면 토큰을 생성.
            user.generateToken((err, user) => {//User.js에서 저장한 user를 여기서 받아옴. 고로 이 user에 토큰이 담겨있다
                if(err) return res.status(400).send(err);

                //token을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등 가능
                res.cookie("x_auth", user.token) //쿠키에 저장 /cookie-parser설치 필요
                res.status(200)
                res.json({ loginSuccess:true, userId:user._id })
            })
        })
    }) //findOne은 몽고디비가 제공하는 메서드   
})

app.get('/api/users/auth', auth, (req, res) => { //auth.js에서 token과 user를 req에 담아서 넥스트로 보냈으므로 이 콜백 함수의 req에서 그걸 받아서 쓸 수 있다.

    //여기까지 미들웨어를 통과해왔다는 얘기는 authentication 이 true 라는 말.
    //이 정보를 클라이언트에게 전달해줘야 한다.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, {token: ""}, (err, user) => {
        if(err) return res.json({ success:false, err});
        return res.status(200).send({ success: true })
    })
})


const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})