import React from "react";
import Header from "../../../components/Header";
import {IonButton, IonPage} from "@ionic/react";

const AddAnnonce : React.FC=()=>{

    return(
        <IonPage className={"addAnnonce"}>
            <Header text={"je dépose une annonce"}/>
            <div>
                <div>
                    <p>mon crédit : </p>
                    <span>12</span>
                </div>
                <IonButton>acheter du crédit</IonButton>
            </div>
        </IonPage>
    )

}
export default AddAnnonce;