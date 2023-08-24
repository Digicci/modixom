export const isUserConnected = (state: any) => state.user.connected;
export const isUserPro = (state: any) => state.user.user.isPro;
export const getUserToken = (state: any) => state.user.user.token;
export const getUser = (state: any) => state.user.user;
export const getNewUser = (state: any) => state.user.newUser;
export const getNewUserByName = (name: string) => (state: any) => state.user.newUser[name];

export const getCitiesProposal = (state: any) => state.user.cities;

export const getNewUserError = (state: any) => state.user.newUserError;