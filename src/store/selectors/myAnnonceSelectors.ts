

export const getMyAnnonces=(state : any)=>state.myAnnonce.myAnnonces
export const getMyAnnoncesValues=(state : any)=>state.myAnnonce.myAnnonceDetail
export const getMyAnnoncesDetailErrorState=(state : any)=>state.myAnnonce.myAnnonceDetailErrorState
export const getMyAnnonceById = (id: number) => (state: any) => {
    if (state.myAnnonce.myAnnonces !== null) {
        return state.myAnnonce.myAnnonces.find((item: any) => item.id === id);
    } else {

        return null;
    }
};