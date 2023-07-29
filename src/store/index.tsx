import {legacy_createStore as createStore, applyMiddleware, combineReducers, Store} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import userReducer from "./reducers/UserReducer";
import inscriptionReducer from "./reducers/InscriptionReducer";

const store: Store = createStore(
    combineReducers({
        user: userReducer,
        inscription: inscriptionReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;