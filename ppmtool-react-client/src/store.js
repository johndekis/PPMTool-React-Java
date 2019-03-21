import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
const middleware = [thunk]

const store = createStore(
    rootReducer, 
    initialState, 
    compose(applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f))

// if(window.navigator.userAgent.includes("chrome")) {
//     //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//      store = createStore(
//         rootReducer, 
//         initialState, 
//         compose(applyMiddleware(...middleware),
//         window.devToolsExtension ? window.devToolsExtension() : f => f))
// } else {
//      store = createStore(
//         rootReducer, 
//         initialState, 
//         compose(applyMiddleware(...middleware)))
// }

export default store