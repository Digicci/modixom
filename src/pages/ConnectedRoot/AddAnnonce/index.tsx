import React from "react";
import "./AddAnnonce.scss"
import Header from "../../../components/Header";
import {IonButton, IonContent, IonPage} from "@ionic/react";
import AddAnnonceForm from "./AddAnnonceForm/AddAnnonceForm";

const AddAnnonce: React.FC = () => {

    return (
        <IonPage className={"addAnnonce"}>
            <Header text={"je dépose une annonce"}/>
            <IonContent >
                <div className={"addAnnonce__container"}>
                    <div className={"addAnnonce__container__credit"}>
                        <div>
                            <p>mon crédit : </p>
                            <span>12</span>
                        </div>
                        <IonButton>acheter du crédit</IonButton>
                    </div>
                    <div>
                        <AddAnnonceForm/>
                    </div>
                </div>
            </IonContent>

        </IonPage>
    )

}
export default AddAnnonce;