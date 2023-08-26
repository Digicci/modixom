import React from "react";
import {FormField} from "./FormField";
import {IonButton, IonFooter} from "@ionic/react";
import ContactFormInput from "../../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {setAddAnnonceError, setAddAnnonceField} from "../../../../store/actions/addAnnonceAction";
import validator from "../../../../utils/tools/validator";
import {getAddAnnonceValues} from "../../../../store/selectors/AddAnnonceSelectors";


const AddAnnonceForm: React.FC = () => {
    const dispatch = useDispatch()
    const {validate,validateAll}= validator(FormField,getAddAnnonceValues,setAddAnnonceError)
    const data = useSelector(getAddAnnonceValues)
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        console.log(name,value)
        dispatch(setAddAnnonceField(name,value))
        validate(name,value)
    }

    const handleSubmit =() =>{
        const errors=validateAll()
        if(errors.length===0)
        {
            console.log(data)
        }
    }
    return (
        <>
            <div>
                {

                    Object.keys(FormField).map((item: any, index: number) => {

                            return(
                                <ContactFormInput
                                    key={index}
                                    //@ts-ignore
                                    {...FormField[item]}
                                    handleChange={handleChange}
                                />
                            )


                    })
                }
            </div>
            <IonFooter>
                <IonButton onClick={handleSubmit}>valider</IonButton>
            </IonFooter>
        </>

    )
}
export default AddAnnonceForm;