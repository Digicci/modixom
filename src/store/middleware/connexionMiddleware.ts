import {CONNECT_USER} from "../actions/userActions";
import {storageKeys} from "../../constants";
import {resetConnexionForm} from "../actions/connexionActions";

const connexionMiddleware = (store: any) => (next: any) => (action: any) => {
    const nextAction = next(action);
    const {userKey} = storageKeys;
    const user: string | null = localStorage.getItem(userKey);
    if (action.type === CONNECT_USER && !user) {
        localStorage.setItem(userKey, JSON.stringify(action.payload));
        store.dispatch(resetConnexionForm())
    }
    return nextAction;
}

export default connexionMiddleware;