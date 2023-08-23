export const SET_CONTACTFORM_FIELD="SET_CONTACTFORM_FIELD";

export  const setContactFormField=(name:string,value:string)=>({
    type:SET_CONTACTFORM_FIELD,
    payload:{
        name,
        value
    }
});