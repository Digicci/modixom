import {SET_CONNEXION_FIELD, RESET_CONNEXION_FORM} from "../actions/connexionActions";

interface IConnexionUser {
    mail: string;
    password: string;
}

const initialState: IConnexionUser = {
    mail: '',
    password: ''
}

const connexionReducer = (state = initialState, action: {type: string; payload?: any;}) => {
    switch(action.type) {

        case SET_CONNEXION_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }

        case RESET_CONNEXION_FORM:
            return initialState;

        default:
            return state;
    }
}

export default connexionReducer;