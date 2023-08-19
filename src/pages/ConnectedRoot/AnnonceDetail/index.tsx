import React, {useEffect, useState} from "react";
import './annonceDetail.scss';
import {useParams} from "react-router";
import {IonHeader, IonPage, IonContent, IonBackButton} from "@ionic/react";

import {IAnnonce} from "../../../models/IAnnonce";
import {useApi} from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import {useSelector} from "react-redux";
import {isUserPro} from "../../../store/selectors/UserSelectors";
import {endpoints} from "../../../constants";

import {generateHeaderClassName} from "../../../utils/tools/classNameGenerator";


const AnnonceDetail: React.FC = () => {
    const [annonce, setAnnonce] = useState<IAnnonce>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams<{ id: string }>();
    const api = useApi();
    const isPro = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);

    useEffect(() => {
        api.get(endpoints.annonceDetail, {id: params.id}).then((res: IAnnonce) => {
            console.log(res);
            setAnnonce(res);
            setIsLoading(false);
        });
    }, [params.id]);

    return (
        <IonPage>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <IonHeader className={headerClass}>
                            <IonBackButton defaultHref={'/home'} className={'header__back__button'}/>
                            <h1>{annonce?.titre}</h1>
                        </IonHeader>
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
                                                    Annonce valable du
                                                    <span className={'start'}>{annonce?.debut.split(' ')[0]}</span>
                                                    au
                                                    <span className={'end'}>
                                                        {annonce?.fin.split(' ')[0]}
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
                                <div className={'annonceDetail__part4'}>
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