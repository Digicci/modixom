import React from "react";
import Header from "../../../components/Header";
import "./AccountModif.scss"
import {IonPage} from "@ionic/react";

const AccountModif: React.FC =()=>{

    return(
        <IonPage>
            <Header text={"modifier mes coordonnées"} canGoBack={true} defaultHref={"/user/coordonnes"}/>
        </IonPage>
    )
}
export default AccountModif