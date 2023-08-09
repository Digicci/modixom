import {CONNECT_USER} from "../actions/userActions";
import {resetConnexionForm} from "../actions/connexionActions";

const connexionMiddleware = (store: any) => (next: any) => (action: any) => {
    const nextAction = next(action);
    if (action.type === CONNECT_USER) {
        localStorage.setItem('user', JSON.stringify(action.payload));
        store.dispatch(resetConnexionForm())
    }
    return nextAction;
}

export default connexionMiddleware;