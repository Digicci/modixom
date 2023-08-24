import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setContactFormError, setContactFormField} from "../../../store/actions/contactAction";
import {getContactFormError, getContactFormValues} from "../../../store/selectors/ContactSelectors";
import {FormFields} from "./formConfig";
import validator from "../../../utils/tools/validator";
import ContactFormInput from "../../ContactFormInput";

import "./contactForm.scss"



const ContactForm: React.FC = () => {
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
        const errors = validateAll()
        if (errors.length === 0) {
            console.log(data)
            //TODO: appelle a l'api pour envoyer le form contact
        }
    }
    return (
        <>
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

                <div className={'contactButtonContainer'}>
                    <input type={"submit"} value={"envoyer"} className={"contactButton"}/>
                </div>
            </form>
        </>
    )
}
export default ContactForm;