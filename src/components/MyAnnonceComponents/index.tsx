import React from "react";
import {IonItem, IonLabel} from "@ionic/react";




interface IAnnonceRoute{
    titre:string,
    date:string,
    id:number,

}
const MyAnnonceComponents: React.FC<IAnnonceRoute>=(props)=>{
    return(
        <>
            <IonItem id={`${props.id}`}  className={'myAnnonce__list__item'}
            routerLink={`/user/myAnnonces/${props.id}`}>
                <IonLabel className={"myAnnonce__list__item__label"}>
                    <h2>{props.titre}</h2>
                    <p>diffusée le {props.date}</p>
                </IonLabel>
            </IonItem>
        </>
    )

}
export default MyAnnonceComponents