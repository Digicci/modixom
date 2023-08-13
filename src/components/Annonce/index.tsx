import React, {ReactNode} from "react";
import './annonce.scss';
import {IonImg, IonItem} from "@ionic/react";
import {IAnnonce} from "../../models/IAnnonce"

import Notation from "./Notation";

const Annonce: React.FC<IAnnonce> = (props: IAnnonce): ReactNode => {

    return (
        <IonItem routerLink={`/home/${props.id}`} routerDirection={"forward"}>
            <div className={'annonce'}>
                <div className={'annonce__top'}>
                    <div className={'annonce__top__img'}>
                        {
                            props.imgPath ?
                                <IonImg className={'img'} src={props.imgPath} alt={'Image produit'}/>
                                :
                                'Aucune image à charger'
                        }
                    </div>
                    <div className={'annonce__top__description'}>
                        <h1 className={'annonce__top__description__title'}>
                            {props.title || 'pas de titre'}
                        </h1>
                        <div className={'annonce__top__description__text'}>
                            {props.description || 'pas de déscription'}
                        </div>
                    </div>
                    <div className={'annonce__top__price'}>
                        <div className={'price'}>
                            {
                                props.oldPrice && (
                                    <div className={'price__old'}>
                                        {props.oldPrice + ' €'}
                                    </div>
                                )
                            }
                            <div className={'price__new'}>
                                {props.newPrice + ' €' || (Math.random() * 100) + ' €'}
                            </div>
                        </div>
                        <div className={'vendor'}>
                            {
                                props.logoPath ?
                                    <IonImg className={'vendor__img'} src={props.logoPath} alt={'logo de l\'enseigne'}/>
                                    :
                                    'Aucun logo'
                            }
                        </div>
                    </div>
                </div>
                <div className={'annonce__bottom'}>
                    <Notation priceNote={props.priceEval} vendorNote={props.vendorEval} />
                </div>
            </div>
        </IonItem>
    );
}

export default Annonce;