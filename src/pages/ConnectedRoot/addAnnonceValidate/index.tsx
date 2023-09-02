import React from "react";
import "./addAnnonceValidate.scss";
import {IonButton, IonContent, IonPage, useIonRouter} from "@ionic/react";
import Header from "../../../components/Header";


const AddAnnonceValidate: React.FC=()=>{
    const {push} =useIonRouter()
    const dateDebut="30/08/2023";
    const dateFin="31/08/2023";
    const heureDebut = "21h17";
    const heureFin ="22h00";

    return(
        <IonPage className={"addAnnonceValide"}>
            <Header text={"annonce validée"}/>
            <IonContent >
                <div className={"addAnnonceValide__container"}>
                    <h2>Merci pour votre confiance</h2>
                    <p>Votre annonce a bien été prise en compte et sera diffusée à partir du
                        <span>{` ${dateDebut} à ${heureDebut} `}</span>
                         jusqu'au
                        <span>{` ${dateFin} à ${heureFin} `}</span>
                        .
                    </p>
                    <IonButton onClick={()=>{push("/addAnnonce","back")}}>Passer une nouvelle annonces</IonButton>

                    <p>crédit restant : <span>........</span></p>
                    <IonButton>charger mon crédit</IonButton>

                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddAnnonceValidate;