import ICategory from "../../models/ICategory";
import {
    TOGGLE_ALERTE_CATEGORY,
    SET_ALERTE_VILLE,
    SET_ALERTE_FIELDS
} from "../actions/alerteActions";

interface IAlerte {
    category: ICategory[];
    ville?: number | null;
    lat?: number | null;
    lng?: number | null;
    rayon?: number | null;
}

const initialState: IAlerte = {
    category: [],
    ville: null,
    lat: null,
    lng: null,
    rayon: null
}

const alerteCreatorReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case TOGGLE_ALERTE_CATEGORY:
            const category = state.category || [];
            const index = category.indexOf(action.payload);
            if(index === -1) {
                category.push(action.payload);
            } else {
                category.splice(index, 1);
            }
            return {
                ...state,
                category: category
            }

        case SET_ALERTE_VILLE:
            return {
                ...state,
                ville: action.payload
            }

        case SET_ALERTE_FIELDS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export default alerteCreatorReducer;