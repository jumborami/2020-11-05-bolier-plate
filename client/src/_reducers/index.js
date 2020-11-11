//redux => state(상태) 관리 라이브러리
//redux data flow => strict unidirectional data flow
//react component > (dispatch(Action))  > action > reducer > store > (subscribe) > react component 
//action => a plain object describing what happened
//reducer => a function describing how the application's state changes
//           이전 state 과 action object를 받은 후에 next state 을 return한다.
//store => the object brings them together. a store holds the whole state tree of your app.
//         the only way to change the state insde it is to dispatch an action on it.
//         a store is not a class. it's just an object with a few methods on it.

//react component => class component / functional component (적은 기능. 간단한 코드. 빠른 퍼포먼스)
// -> react 16.8 hooks 가 업데이트 되면서, functional component에서도 class component에서만 쓸수있던 기능들을 쓸 수 있게 되었다 

import {combineReducers} from 'redux'; //combineReducers => 여러 개의 reducers들을 하나로 합쳐준다
//import user from './user_reducer';
//import comment from './comment_reducer';

const rootReducer = combineReducers({ //rootReducer에서 combineReducer를 이용해 여러 reducer들을 하나로 합친다.
	//user,
	//comment
})

export default rootReducer;