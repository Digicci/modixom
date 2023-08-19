import {storageKeys} from "../../constants";
import {DISCONNECT_USER} from "../actions/userActions";


const disconnectMiddleware = (store: any) => (next: any) => (action: any) => {
    const nextAction = next(action);
    const {userKey} = storageKeys;
    if (action.type === DISCONNECT_USER) {
        localStorage.removeItem(userKey);
    }
    return nextAction;
}

export default disconnectMiddleware;