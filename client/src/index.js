import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; //뒤에 폴더 안쓰면 자동으로 index.js불러온다

const createStoreWithMiddleware = applyMiddleware( promiseMiddleware, ReduxThunk )(createStore)//그냥 store는 객체만 받을 수 있으므로 promise와 function도 받을 수 있도록 promise, thunk 미들웨어도 함께 만들어준다.

//<provider /> is the higher-order component provided by React Redux that lets you bind Redux to React
ReactDOM.render( //react-redux 에서 provider를 가져와서 app을 감싸면 이 어플리케이션과 리덕스가 연결이 된다
  <Provider
		store = { createStoreWithMiddleware(Reducer,
				window.__REDUX_DEVTOOLS_EXTENSION__ &&  
				window.__REDUX_DEVTOOLS_EXTENSION__()
				//redux extension을 구글에서 설치하고 이거 치면 사용 가능
			)}
	>
		<App />
	</Provider>
	, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//serviceWorker.unregister();
