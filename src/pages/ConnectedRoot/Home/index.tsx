import React, {useState, useEffect} from "react";
import {useApi} from "../../../services/ApiService";
import {useSelector, useDispatch} from "react-redux";

import './home.scss';
import {IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage} from "@ionic/react";
import {optionsOutline} from "ionicons/icons";

import Annonce from "../../../components/Annonce";
import SearchInput from "../../../components/SearchInput";

import {IAnnonce} from "../../../models/IAnnonce";
import Loader from "../../../components/Loader";
import {getAnnonces, isLoadingAnnonces} from "../../../store/selectors/AnnonceSelectors";
import {setAnnonce, setIsLoadingAnnonces} from "../../../store/actions/annonceActions";

const Home: React.FC = () => {

    const api = useApi();
    const dispatch = useDispatch();
    const annonces = useSelector(getAnnonces)
    const isLoading = useSelector(isLoadingAnnonces)

    useEffect(() => {
        dispatch(setIsLoadingAnnonces(true));
        api.get('searchAnnonces').then((res: IAnnonce[]) => {
            dispatch(setAnnonce(res));
        });
    }, []);


    return (
        <IonPage className={'home'}>
            <IonHeader className={'home__header'}>
                <SearchInput />
            </IonHeader>
            <IonContent>
                <div className={'home__content'}>
                    <div className={'home__content__filters'}>
                        <div className={'home__content__filters__category'}>
                            <IonButton className={'button'}>
                                Catégories
                            </IonButton>
                        </div>
                        <div className={'home__content__filters__button'}>
                            <IonButton className={'button'}>
                                Filtres
                                <IonIcon icon={optionsOutline} slot={'end'}/>
                            </IonButton>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            annonces.length > 0 ? (
                                <IonList>
                                    {
                                        annonces.map((product: IAnnonce, index: number) => (
                                            <Annonce key={index} {...product} />
                                        ))
                                    }
                                </IonList>
                            ) : (
                                <div className={'home__content__empty'}>
                                    Aucune annonce trouvée
                                </div>
                            )
                        )
                    }
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;