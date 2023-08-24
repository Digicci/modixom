import React from "react";
import "./contact.scss"
import Header from "../../../components/Header";
import {IonContent, IonFooter, IonPage} from "@ionic/react";
import ContactFormInput from "../../../components/ContactFormInput";
import {useDispatch, useSelector} from "react-redux";
import {setContactFormError, setContactFormField} from "../../../store/actions/contactAction";
import {FormFields} from "./formConfig";
import {getContactFormError, getContactFormValues} from "../../../store/selectors/ContactSelectors";
import validator from "../../../utils/tools/validator";

const Contact: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector(getContactFormValues);
    const {validate, validateAll} = validator(FormFields, getContactFormValues, setContactFormError)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        dispatch(setContactFormField(name, value))
        validate(name, value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errors =validateAll()
        if (errors.length ===0) {
            console.log(data)
            //TODO: appelle a l'api pour envoyer le form contact
        }

    }
    return (
        <IonPage>
            <Header text={"Contact"} canGoBack={true} defaultHref={"/user"}/>
            <IonContent>
                <div className={"contact"}>
                    <h2>nous contacter</h2>
                    <form onSubmit={handleSubmit} className={"contact__container"}>
                        {
                            Object.keys(FormFields).map((item: any, index: number) => {
                                return (

                                    <ContactFormInput key={index}
                                        //@ts-ignore
                                         {...FormFields[item]}
                                         handleChange={handleChange}
                                         errorSelector={getContactFormError}/>
                                )
                            })
                        }

                        <IonFooter className={'contactButtonContainer'}>
                            <input type={"submit"} value={"envoyer"} className={"contactButton"}/>
                        </IonFooter>
                    </form>
                </div>
            </IonContent>
        </IonPage>

    )
}
export default Contact