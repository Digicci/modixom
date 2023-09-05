export const SET_MY_ANNONCE_DETAIL ="SET_MY_ANNONCE_DETAIL";
export const setMyAnnonceDetail = (name:string,value:string|boolean)=>({
    type:SET_MY_ANNONCE_DETAIL,
    payload:{
        name,
        value
    }
})
export const SET_MY_ANNONCE_DETAIL_ERROR ="SET_MY_ANNONCE_DETAIL_ERROR";
export const setMyAnnonceDetailError = (name:string,value:string)=>( {
    type:SET_MY_ANNONCE_DETAIL_ERROR,
    payload:{
        name,
        value
    }
})

export const SET_MY_ANNONCES ="SET_MY_ANNONCES";
export const setMyAnnonces = (values:Array<object>)=>({
    type:SET_MY_ANNONCES,
    payload:{
        values
    }

})


