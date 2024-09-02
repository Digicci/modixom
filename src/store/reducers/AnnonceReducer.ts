import {IAnnonce} from "../../models/IAnnonce";
import {
    SET_ANNONCE,
    ADD_ANNONCE,
    REMOVE_ANNONCE,
    IS_LOADING,
    SET_WHERE,
    RESET_WHERE,
    TOGGLE_CATEGORY_FILTER,
    UPDATE_ANNONCE
} from "../actions/annonceActions";

interface IWhere {
    motscles?: string;
    categories?: Array<number>;
    ville?: number | null;
    rayon?: number | null | undefined;
    tri?: "ASC" | "DESC";
    lat?: number | null;
    lng?: number | null;
    pro?: boolean;
}

interface IAnnonceState {
    items: IAnnonce[];
    isLoading: boolean;
    where: IWhere;
}

const initialWhere: IWhere = {
    motscles: "",
    categories: [],
    ville: null,
    rayon: null,
    tri: "ASC",
    lat: null,
    lng: null,
    pro: false
}

const initialState: IAnnonceState = {
    items: [],
    isLoading: false,
    where: initialWhere
}

const AnnonceReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case SET_ANNONCE:
            return {
                ...state,
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

        case SET_WHERE:
            return {
                ...state,
                where: {
                    ...state.where,
                    ...action.payload
                }
            }

        case RESET_WHERE:
            return {
                ...state,
                where: {...initialWhere, categories : []}
            }

        case TOGGLE_CATEGORY_FILTER:
            const categories = state.where.categories || [];
            const index = categories.indexOf(action.payload);
            if(index === -1) {
                categories.push(action.payload);
            } else {
                categories.splice(index, 1);
            }
            return {
                ...state,
                where: {
                    ...state.where,
                    categories
                }
            }

        case UPDATE_ANNONCE:
            const items = state.items.map((a) => {
                if (a.id === action.payload.id) {
                    return action.payload
                }
                return a;
            })
            return {
                ...state,
                isLoading: false,
                items
            }

        default:
            return state;
    }
}

export default AnnonceReducer;