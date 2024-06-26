import React, {ReactNode} from "react";
import './annonce.scss';
import {IonImg, IonItem} from "@ionic/react";
import {IAnnonce} from "../../models/IAnnonce"

import Notation from "./Notation";

const Annonce: React.FC<IAnnonce> = (props: IAnnonce): ReactNode => {

    return (
        <div>
            <IonItem routerLink={`/home/${props.id}`} routerDirection={"forward"} detail={false}>
                <div className={'annonce'}>
                    <div className={'annonce__wrapper'}>
                        <div className={'annonce__wrapper__img'}>
                            {
                                props.images ?
                                    <IonImg className={'img'} src={props.images} alt={'Image produit'}/>
                                    :
                                    'Aucune image à charger'
                            }
                        </div>
                        <div className={'annonce__wrapper__information'}>
                            <h1 className={'annonce__wrapper__information__title'}>
                                {props.titre || 'pas de titre'}
                            </h1>
                            {/*notation ici*/}
                            <div className={'annonce__wrapper__information__notation'}>
                                {/*TODO changer l'id vendeur par la bonne une fois qu'on l'aura*/}
                                <Notation vendeur={props.enseigne} idVendeur={props.id} idProduit={props.id}
                                          titreAnnonce={props.titre} priceNote={props.moyAnnonce}
                                          vendorNote={props.moyEnseigne} nbNote={props.nbNote!}/>
                            </div>
                            <div className={'annonce__wrapper__information__description'}>
                                {props.description || 'pas de déscription'}
                            </div>

                            <div className={'annonce__wrapper__information__price'}>
                                <div className={'price'}>
                                    {
                                        props.newprix ? (
                                            <>
                                                <div className={'price__old'}>
                                                    {props.prix.toFixed(2) + ' €'}
                                                </div>
                                                <div className={'price__new'}>
                                                    {props.newprix.toFixed(2) + ' €'}
                                                </div>
                                            </>
                                        ) : (
                                            <div className={'price__new'}>
                                                {props.prix + ' €'}
                                            </div>
                                        )
                                    }
                                </div>
                                {/*<div className={'vendor'}>*/}
                                {/*    {*/}
                                {/*        props.logo &&*/}
                                {/*        <IonImg className={'vendor__img'} src={props.logo} alt={'logo de l\'enseigne'}/>*/}
                                {/*    }*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </IonItem>

        </div>
    );
}

export default Annonce;