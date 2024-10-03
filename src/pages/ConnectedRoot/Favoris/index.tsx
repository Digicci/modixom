// path : src/pages/ConnectedRoot/Favoris/index.tsx
import "./style.scss";
import React, {useEffect, useState} from 'react'
import {IonContent, IonList, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import Loader from "../../../components/Loader";
import {IAnnonce} from "../../../models/IAnnonce";
import {useApi} from "../../../services/ApiService";
import {endpoints} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import Annonce from "../../../components/Annonce";
import {getAnnonces, isLoadingAnnonces} from "../../../store/selectors/AnnonceSelectors";
import {setAnnonce} from "../../../store/actions/annonceActions";

interface IFavoris {
}

const Favoris: React.FC<IFavoris> = () => {

    const api = useApi()
    const token = useSelector(getUserToken)
    const annonce = useSelector(getAnnonces)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const favAnnonces = annonce.filter((a: IAnnonce) => a.favoris)

    useEffect(() => {
        setIsLoading(true)
        api.get(endpoints.annonces, {token})
            .then(res => {
                dispatch(setAnnonce(res))
                setIsLoading(false)
            })
            .catch(console.error)
    }, []);

    return (
        <IonPage className={"favoris"}>
            <Header text={"mes favoris"} canGoBack={true} defaultHref={"/user"} />
            {
                isLoading ? <Loader /> :
                    <IonContent className={"favoris-container"}>
                        {
                            favAnnonces.length ?
                                <IonList>
                                    {
                                        favAnnonces.map((annonce: IAnnonce, index: number) => {
                                            return <Annonce key={index} {...annonce} />
                                        })
                                    }
                                </IonList>
                                :
                                <div className={"noFav"}>
                                    Vous n&apos;avez aucun favoris.
                                </div>
                        }
                    </IonContent>
            }
        </IonPage>
    )
}

export default Favoris