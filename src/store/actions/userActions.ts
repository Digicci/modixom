export const CONNECT_USER: string = 'CONNECT_USER';
export const connectUser = (id: number | string, token: string, type: string | boolean) => {
    const isPro: boolean = typeof type === 'string' ? type === 'professionnel' : type;
    return {
        type: CONNECT_USER,
        payload: {
            id: typeof id === 'string' ? parseInt(id) : id,
            token,
            isPro
        }
    }
}
export const DISCONNECT_USER: string = 'DISCONNECT_USER';
export const disconnectUser = () => {
    return {
        type: DISCONNECT_USER
    }
}
export const SET_USER: string = 'SET_USER';