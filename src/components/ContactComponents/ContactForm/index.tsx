import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setContactFormError, setContactFormField} from "../../../store/actions/contactAction";
import {getContactFormError, getContactFormValues} from "../../../store/selectors/ContactSelectors";
import {FormFields} from "./formConfig";
import validator from "../../../utils/tools/validator";
import ContactFormInput from "../../ContactFormInput";

import "./contactForm.scss"
import {getUser, getUserToken} from "../../../store/selectors/UserSelectors";
import {endpoints} from "../../../constants";
import {UserState} from "../../../store/reducers/UserReducer";
import {apiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {setNewUserField, setUser} from "../../../store/actions/userActions";

import {useApi} from "../../../services/ApiService";
import Loader from "../../Loader";
import {IonButton, IonFooter} from "@ionic/react";


const ContactForm: React.FC = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const data = useSelector(getContactFormValues);
    const user: UserState = useSelector(getUser)
    const api = useApi();
    const token: string = useSelector(getUserToken);

    const {validate, validateAll} = validator(FormFields, getContactFormValues, setContactFormError)

    const fetchUser = () => {
        setIsLoading(true);
        api.get(endpoints.profilDetail, {token}).then((res) => {
            console.log(res);
            const apiUser: UserState = apiUserDataAdapter(res);
            dispatch(setUser(apiUser));
            dispatch(setNewUserField("id", apiUser.id!));
            dispatch(setNewUserField('isPro', apiUser.isPro!));
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchUser()

        Object.keys(FormFields).map((item:any)=>{
            Object.keys(user).map((userItem:any)=>{
                if(item===userItem){
                    //@ts-ignore
                    dispatch(setContactFormField(item,user[userItem]))
                }
            })
        })
        return () => {
            //reset le form
        };
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        dispatch(setContactFormField(name, value))
        validate(name, value)
    }

    const handleSubmit = () => {
        const errors = validateAll()
        if (errors.length === 0) {
            console.log(data)
            //TODO: appelle a l'api pour envoyer le form contact
        }
    }
    return (
        <>
            {isLoading? <Loader/>:(
            <>
                <div className={"contact__formContainer"} >
                {
                    Object.keys(FormFields).map((item: any, index: number) => {

                        //@ts-ignore

                        return (

                            <ContactFormInput key={index}
                                //@ts-ignore
                                              {...FormFields[item]}
                                              handleChange={handleChange}
                                              errorSelector={getContactFormError}
                                //@ts-ignore
                                              value={user[item]}
                            />

                        )
                    })
                }
                </div>
                <IonFooter className={'validateButtonContainer'}>
                    <IonButton className={"validateButton"} onClick={handleSubmit}>valider</IonButton>
                </IonFooter>
            </>
            )}
        </>
    )
}
export default ContactForm;