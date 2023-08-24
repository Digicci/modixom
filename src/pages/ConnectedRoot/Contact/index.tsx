import React from "react";
import {IonContent, IonPage} from "@ionic/react";
import ContactForm from "./ContactForm";
import Header from "../../../components/Header";
import {useSelector} from "react-redux";
import {isUserPro} from "../../../store/selectors/UserSelectors";



const Contact: React.FC =() => {
    const isPro:boolean = useSelector(isUserPro);
    return (
        <IonPage>
            {isPro ? <Header text={"Contact"} canGoBack={true} defaultHref={"/user"}/>:<Header text={"Contact"}/>}
            <IonContent>
                <div className={"contact"}>
                    <h2>nous contacter</h2>
                    <ContactForm/>
                </div>
            </IonContent>
        </IonPage>

    )
}
export default Contact