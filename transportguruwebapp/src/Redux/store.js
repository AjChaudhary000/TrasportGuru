import { createStore, combineReducers, applyMiddleware } from "redux";
import { loginReduce } from './Reduce/loginReduce';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
    login: loginReduce
});
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;