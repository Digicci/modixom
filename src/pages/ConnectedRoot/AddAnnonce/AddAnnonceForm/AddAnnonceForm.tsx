import React ,{useEffect} from "react";
import {FormField} from "./FormField";
import {IonButton, IonFooter} from "@ionic/react";
import ContactFormInput from "../../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {setAddAnnonceError, setAddAnnonceField} from "../../../../store/actions/addAnnonceAction";
import validator from "../../../../utils/tools/validator";
import {getAddAnnonceError, getAddAnnonceValues} from "../../../../store/selectors/AddAnnonceSelectors";
import {getCategoryCollection} from "../../../../store/selectors/CategorySelectors";
import {useApi} from "../../../../services/ApiService";
import {endpoints} from "../../../../constants";
import ICategory from "../../../../models/ICategory";
import {setCategoryCollection} from "../../../../store/actions/categoryActions";
import category from "../../Filter/Category";


const AddAnnonceForm: React.FC = () => {
    const dispatch = useDispatch()
    const {validate,validateAll}= validator(FormField,getAddAnnonceValues,setAddAnnonceError)
    const data = useSelector(getAddAnnonceValues)
    const categoryCollection =useSelector(getCategoryCollection);
    const api = useApi()
    useEffect(()=>{
        categoryCollection.length===0 && api.get(endpoints.categories).then((res:ICategory[])=>{
            dispatch(setCategoryCollection(res))
        })

    },[])
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,checked}=e.target
        console.log(name,value)
        const fieldValue =
            name ==="norme"?
            checked:
            value
        dispatch(setAddAnnonceField(name,fieldValue))
        validate(name,fieldValue)
    }
console.log(categoryCollection)

    const handleSubmit =() =>{
        const errors=validateAll()
        if(errors.length===0)
        {
            console.log(data)
        }
    }
    return (
        <>
            <div className={"addAnnonce__container__form"}>
                {

                    Object.keys(FormField).map((item: any, index: number) => {
                        if(item ==="categorie"){
                            return(
                                <ContactFormInput
                                    key={index}
                                    //@ts-ignore
                                    {...FormField[item]}
                                    categorie={categoryCollection}
                                    handleChange={handleChange}
                                    errorSelector={getAddAnnonceError}
                                    classPrefix={"addAnnonce__container__form__wrapper"}
                                />
                            )
                        }else{
                            return(
                                <ContactFormInput
                                    key={index}
                                    //@ts-ignore
                                    {...FormField[item]}
                                    handleChange={handleChange}
                                    errorSelector={getAddAnnonceError}
                                    classPrefix={"addAnnonce__container__form__wrapper"}
                                />
                            )
                        }



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