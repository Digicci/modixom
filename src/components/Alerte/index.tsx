// path : src/components/Alerte/index.tsx
import "./style.scss";
import React from 'react'
import IAlerte from "../../models/IAlerte";
import {IonButton, IonIcon, IonItem, useIonToast} from "@ionic/react";
import { closeOutline } from "ionicons/icons";

interface IProps extends IAlerte {
    position: number;
}

const Alerte: React.FC<IProps> = ({id, ville, rayon, category,position}: IProps) => {

    const [present] = useIonToast()
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        present({
            message: "En cours de développement",
            color: "warning",
            duration: 3000
        }).then()
    }

    return <IonItem className={"alert"} style={{
        "--i": `${position}00ms`
    }}>
        <div className="alert-item">
            <div className={"alert-item-content"}>
                <div className="alert-item-content-header">
                    <h2>
                        {category}
                    </h2>
                </div>
                <div className="alert-item-content-body">
                    <h3 className="town">{ville}</h3>
                    <div className="rayon">{rayon} km</div>
                </div>
            </div>
            <IonButton onClick={handleClick} color={"danger"} size={"small"} className={"delete"}>
                <IonIcon slot={"icon-only"} icon={closeOutline} size={"large"} aria-label={"Supprimer l'alerte"}/>
            </IonButton>
        </div>
    </IonItem>
}

export default Alerte