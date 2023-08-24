import React from "react";
import {useSelector} from "react-redux";
import {isUserPro} from "../../store/selectors/UserSelectors";
import Header from "../Header";
import {IonContent} from "@ionic/react";
import ContactForm from "./ContactForm";

const ContactComponents:React.FC=()=>{
    const isPro:boolean=useSelector(isUserPro);
    return(
        <>
            {isPro ? <Header text={"Contact"} canGoBack={true} defaultHref={"/user"}/>:<Header text={"Contact"}/>}
            <IonContent>
                <div className={"contact"}>
                    <h2>nous contacter</h2>
                    <ContactForm/>
                </div>
            </IonContent>
        </>
    )
}
export default ContactComponents;