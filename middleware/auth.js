const { User } = require('../models/User');

//인증 처리를 하는 곳
let auth = (req, res, next) => {
	
	//클라이언트 쿠키에서 토큰을 가져온다.
	let token = req.cookies.x_auth;

	//토큰을 복호화 한 후, 유저를 찾는다.
	User.findByToken(token, (err, user) => { //user에 User.js에서 확인한 db정보가 들어옴
		if(err) throw err;
		if(!user) return res.json({ isAuth: false, error: true });

		req.token = token; //req의 token에 token 을 넣어서 next()함수를 통해 다음으로 보냄
		req.user = user;
		next();
	})

	//유저가 있으면 인증 ok
	//유저가 없으면 인증 no	
}

module.exports = { auth };