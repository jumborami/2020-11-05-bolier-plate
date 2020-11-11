import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() { //랜딩페이지에 들어오자마자 useEffect()를 실행

	useEffect(() => { //get request를 서버에 보냄
		axios.get('/api/hello').then(response=> { console.log(response) })
	}, [])

	return (
		<div>
			Landingpage 랜딩페이지
		</div>
	)
}

export default LandingPage
