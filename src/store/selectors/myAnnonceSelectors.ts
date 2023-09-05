

export const getMyAnnonces=(state : any)=>state.myAnnonce.myAnnonces
export const getMyAnnonceById=(id:number)=>(state:any)=>state.myAnnonce.myAnnonces.find((item:any)=>item.id===id)