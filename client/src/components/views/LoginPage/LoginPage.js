import React, { UseState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function loginPage() {

	const [Email, setEmail] = UseState('');
	const [Password, setPassword] = UseState('');

	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
	};
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
	};
	const onSubmitHandler = (event) => {
		event.preventDefault(); //refresh되지 않도록 함
		//console.log('Email', Email)
		//console.log('Password', Password)

		let body = {
			email: Email,
			password: Password
		}
		Axios.post('/api/users/login', body)
		.then(response => {

		})
	}

	return (
		<div style={{
			display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'
		}}>
			<form style={{display:"flex", flexDirection:"column"}}
				onSubmit={onSubmitHandler}
			>
				<lable>Email</lable>
				<input type="email" value={Email} onChange={onEmailHandler} />
				<lable>Password</lable>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				<br />
				<button type="submit">
					Login
				</button>
			</form>	
		</div>
	)
}

export default withRouter(loginPage)
