import ReduxActionInterface from "../../interface/reduxActionInterface";
import {
    CONNECT_USER,
    DISCONNECT_USER, RESET_NEW_USER,
    SET_NEW_USER_CITIES,
    SET_NEW_USER_CITY, SET_NEW_USER_ERROR,
    SET_NEW_USER_FIELD,
    SET_USER
} from "../actions/userActions";
import ICityProposal from "../../models/ICityProposal";

export interface UserState {
    name: string;
    surname: string;
    gender: string;
    mail: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    id?: number | null;
    token?: string;
    isPro: boolean;
    credit?: number;
    logo?: string;
    socialReason?: string | null;
    siret?: string | null;
    tva?: string | null;
}

export interface NewUserState extends UserState {
    cityId?: number | null;
    newPassword?: string;
    confirmNewPassword?: string;
    password?: string;
}

interface UserReducerInterface {
    connected: boolean;
    user: UserState;
    cities?: Array<ICityProposal>;
    newUser: NewUserState;
    newUserError: INewUserError;
}

interface INewUserError extends NewUserState {}

const initialUser: UserState = {
    name: '',
    surname: '',
    gender: '',
    mail: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    id: null,
    token: '',
    isPro: false
}
const initialNewUser: NewUserState = {
    ...initialUser,
    cityId: null,
    password: '',
    newPassword: '',
    confirmNewPassword: ''
}

const initialState: UserReducerInterface = {
    connected: false,
    user: initialUser,
    newUser: initialNewUser,
    cities: [],
    newUserError: initialNewUser
}

const userReducer = (state: UserReducerInterface = initialState, action: any): UserReducerInterface => {
    switch (action.type) {

        case CONNECT_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                connected: true
            };

        case DISCONNECT_USER:
            return {
                ...state,
                user: initialUser,
                connected: false
            };

        case SET_NEW_USER_CITY:
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    cityId: action.payload.id,
                    city: action.payload.nom,
                    postalCode: action.payload.cp,
                }
            }

        case SET_NEW_USER_FIELD:
            const {name, value} = action.payload;
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    [name]: value,
                }
            }

        case SET_NEW_USER_ERROR:
            const {name: errorName, value: errorValue} = action.payload;
            return {
                ...state,
                newUserError: {
                    ...state.newUserError,
                    [errorName!]: errorValue!
                }
            }

        case RESET_NEW_USER:
            return {
                ...state,
                newUser: {
                    ...initialNewUser,
                    id: state.newUser.id,
                    isPro: state.newUser.isPro,
                },
                newUserError: initialNewUser,
                cities: []
            }

        case SET_NEW_USER_CITIES:
            return {
                ...state,
                cities: action.payload
            }

        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };

        default:
            return state;
    }
}

export default userReducer;