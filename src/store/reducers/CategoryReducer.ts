import ICategory from "../../models/ICategory";
import { SET_CATEGORY_COLLECTION } from "../actions/categoryActions";

interface ICategoryState {
    items: ICategory[];
}

const initialState: ICategoryState = {
    items: []
};

const categoryReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case SET_CATEGORY_COLLECTION:
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}

export default categoryReducer;