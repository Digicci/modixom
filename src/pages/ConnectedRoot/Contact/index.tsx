import React from "react";
import "./contact.scss"
import Header from "../../../components/Header";
import {IonContent, IonPage} from "@ionic/react";
import ContactFormInput from "../../../components/ContactFormInput";
import {useDispatch} from "react-redux";
import {setContactFormField} from "../../../store/actions/contactAction";

const Contact : React.FC  = ()=>{
    const dispatch=useDispatch()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        dispatch(setContactFormField(name,value))
        console.log(name,value);
    }

    return(
        <IonPage>
            <Header text={"Contact"} canGoBack={true} defaultHref={"/user"}/>
            <IonContent>
                <div>
                    <h2>nous contacter</h2>
                    <ContactFormInput label={"nom"} type={"text"} handleChange={handleChange}/>
                    <ContactFormInput label={"prénom"} type={"text"} handleChange={handleChange}/>
                    <ContactFormInput label={"adresse email"} type={"email"} handleChange={handleChange}/>
                    <ContactFormInput label={"téléphone"} type={"tel"} handleChange={handleChange}/>
                    <ContactFormInput label={"motif de contact"} type={"text"} handleChange={handleChange}/>
                    <ContactFormInput label={"description"} type={"textarea"} handleChange={handleChange}/>
                </div>
            </IonContent>
        </IonPage>

    )
}
export default Contact