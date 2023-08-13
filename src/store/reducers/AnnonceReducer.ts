import {IAnnonce} from "../../models/IAnnonce";
import {SET_ANNONCE, ADD_ANNONCE, REMOVE_ANNONCE} from "../actions/annonceActions";

const initialState: IAnnonce[] = [];

const AnnonceReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case SET_ANNONCE:
            return action.payload;

        case ADD_ANNONCE:
            return [...state, action.payload];

        case REMOVE_ANNONCE:
            return state.filter(annonce => annonce.title !== action.payload.title);

        default:
            return state;
    }
}

export default AnnonceReducer;