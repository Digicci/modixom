import React from "react";
import "./addAnnonceValidate.scss";
import {IonButton, IonContent, IonPage} from "@ionic/react";
import Header from "../../../components/Header";


const AddAnnonceValidate: React.FC=()=>{

    return(
        <IonPage className={"addAnnonceValide"}>
            <Header text={"annonce validée"}/>
            <IonContent >
                <div className={"addAnnonceValide__container"}>
                    <h2>Merci pour votre confiance</h2>
                    <p>Votre annonce a bien été prise en compte et sera diffusée à partir du
                        <span>../../... à ...h...</span>
                        jusqu'au
                        <span>../../... à ...h...</span>
                        .
                    </p>
                    <IonButton>Passer une nouvelle annonces</IonButton>

                    <p>crédit restant : <span>........</span></p>
                    <IonButton>charger mon crédit</IonButton>

                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddAnnonceValidate;