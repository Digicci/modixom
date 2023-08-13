import {storageKeys} from "../../constants";
import {DISCONNECT_USER} from "../actions/userActions";


const disconnectMiddleware = (store: any) => (next: any) => (action: any) => {
    const nextAction = next(action);
    const {userKey} = storageKeys;
    const user: string | null = localStorage.getItem(userKey);
    if (action.type === DISCONNECT_USER && user) {
        localStorage.removeItem(userKey);
    }
    return nextAction;
}

export default disconnectMiddleware;