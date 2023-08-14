import {IAnnonce} from "../../models/IAnnonce";
import {SET_ANNONCE, ADD_ANNONCE, REMOVE_ANNONCE, IS_LOADING} from "../actions/annonceActions";

interface IAnnonceState {
    items: IAnnonce[];
    isLoading: boolean;
}

const initialState: IAnnonceState = {
    items: [],
    isLoading: false
}

const AnnonceReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case SET_ANNONCE:
            return {
                isLoading: false,
                items: action.payload
            }

        case ADD_ANNONCE:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };

        case REMOVE_ANNONCE:
            return state.items.filter(annonce => annonce.id !== action.payload.id);

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }
}

export default AnnonceReducer;