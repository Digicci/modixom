// path : src/pages/ConnectedRoot/MyAlertes/index.tsx
import "./style.scss";
import React, {useEffect, useState} from 'react'
import {useApi} from "../../../services/ApiService";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import {endpoints} from "../../../constants";
import {IonContent, IonList, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import Loader from "../../../components/Loader";
import IAlerte from "../../../models/IAlerte";
import Alerte from "../../../components/Alerte";

interface IMyAlertes {
}

const MyAlertes: React.FC<IMyAlertes> = () => {

    const api = useApi()
    const token = useSelector(getUserToken)
    const [alertes, setAlertes] = useState<Array<IAlerte>>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(endpoints.getAlert, {token})
            .then(res => {
                setIsLoading(false)
                setAlertes(res)
            })
            .catch(console.error)
    }, []);

    return <IonPage className={""}>
        <Header text={"mes alertes"} canGoBack={true} defaultHref={"/user"}></Header>
        {
            isLoading ? <Loader /> :
                <IonContent className={"favoris-container"}>
                    {
                        alertes.length ?
                            <IonList>
                                {
                                    alertes.map((alerte, index) => {
                                        return <Alerte position={index} key={index} {...alerte} />
                                    })
                                }
                            </IonList>
                            :
                            <div className={"noAlerte"}>
                                Vous n&apos;avez aucune alerte.
                            </div>
                    }
                </IonContent>
        }
    </IonPage>
}

export default MyAlertes