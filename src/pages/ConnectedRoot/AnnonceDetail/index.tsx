import React, {useEffect, useState} from "react";
import './annonceDetail.scss';
import {useParams} from "react-router";
import {IonPage, IonContent} from "@ionic/react";

import {IAnnonce} from "../../../models/IAnnonce";
import {useApi} from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import {endpoints} from "../../../constants";

import Header from "../../../components/Header";
import {getLocation} from "../../../services/LocationService";



const AnnonceDetail: React.FC = () => {
    const [annonce, setAnnonce] = useState<IAnnonce>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams<{ id: string }>();
    const api = useApi();

    useEffect(() => {
        api.get(endpoints.annonceDetail, {id: params.id}).then((res: IAnnonce) => {
            console.log(res);
            setAnnonce(res);
            setIsLoading(false);
        });
    }, [params.id]);

    const runGoogleMaps = () => {
        getLocation().then((res) => {
            const destination = res && encodeURIComponent(`${annonce?.adresse},${annonce?.ville?.toLowerCase()}`)
            console.log(destination)
            destination && window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`)
        })

    }

    return (
        <IonPage>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <Header text={annonce!.titre} canGoBack={true} defaultHref={'/home'}/>
                        <IonContent>
                            <div className={'annonceDetail'}>
                                <div className={'annonceDetail__part1'}>
                                    <div className={'annonceDetail__part1__img'}>
                                        <img src={annonce?.images!} alt={'image annonce'}/>
                                    </div>
                                    <div className={'annonceDetail__part1__description'}>
                                        {annonce?.description}
                                    </div>
                                </div>

                                <div className={'annonceDetail__part2'}>
                                    <div className={'annonceDetail__part2__hour'}>
                                        {
                                            annonce?.debut && annonce?.fin && (
                                                <>
                                                    Annonce valable de
                                                    <span className={'start'}>{annonce?.debut.split(' ')[1].replace(':', 'h')}</span>
                                                    à
                                                    <span className={'end'}>
                                                        {annonce?.fin.split(' ')[1].replace(":", "h")}
                                                    </span>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className={'annonceDetail__part2__qte'}>
                                        Quantité mise en vente : {annonce?.quantite}
                                    </div>
                                </div>
                                <div className={'annonceDetail__part3'}>
                                    <div className={'annonceDetail__part3__logo'}>
                                        <img src={annonce?.logo} alt={'logo enseigne'}/>
                                    </div>
                                    <div className={'annonceDetail__part3__info'}>
                                        <div className={'annonceDetail__part3__info__name'}>
                                            {annonce?.enseigne}
                                        </div>
                                        <div className={'annonceDetail__part3__info__address'}>
                                            {annonce?.adresse}
                                        </div>
                                        <div className={'annonceDetail__part3__info__city'}>
                                            {annonce?.ville}
                                        </div>
                                        <div className={'annonceDetail__part3__info__tel'}>
                                            {annonce?.telephone}
                                        </div>
                                    </div>
                                </div>
                                <div className={'annonceDetail__part4'} onClick={runGoogleMaps}>
                                    itinéraire
                                </div>
                            </div>
                        </IonContent>
                    </>
                )
            }
        </IonPage>
    );
}

export default AnnonceDetail;