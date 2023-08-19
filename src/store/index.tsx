import {legacy_createStore as createStore, applyMiddleware, combineReducers, Store} from 'redux';
import thunk from 'redux-thunk';
import connexionMiddleware from "./middleware/connexionMiddleware";
import {composeWithDevTools} from 'redux-devtools-extension';

import userReducer from "./reducers/UserReducer";
import inscriptionReducer from "./reducers/InscriptionReducer";
import connexionReducer from "./reducers/ConnexionReducer";
import AnnonceReducer from "./reducers/AnnonceReducer";
import disconnectMiddleware from "./middleware/disconnectMiddleware";
import categoryReducer from "./reducers/CategoryReducer";
import AlerteCreatorReducer from "./reducers/AlerteCreatorReducer";

const store: Store = createStore(
    combineReducers({
        user: userReducer,
        inscription: inscriptionReducer,
        connexion: connexionReducer,
        annonces: AnnonceReducer,
        category: categoryReducer,
        alerte: AlerteCreatorReducer
    }),
    composeWithDevTools(applyMiddleware(
        thunk,
        connexionMiddleware,
        disconnectMiddleware
    ))
)

export default store;