export const isUserConnected = (state: any) => state.user.connected;
export const isUserPro = (state: any) => state.user.user.isPro;
export const getUserToken = (state: any) => state.user.user.token;