import React, {useEffect, useState} from "react";
import {IonContent, IonItem, IonList, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import Loader from "../../../components/Loader";
import {useApi} from "../../../services/ApiService";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import {endpoints, IFacture} from "../../../constants";



const Facture: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const token: string = useSelector(getUserToken)
    const api = useApi();
    const [factures, setFactures] = useState<Array<IFacture>>([])

    useEffect(() => {
        setIsLoading(true)
        api.get(endpoints.getFactures, {token})
            .then((res: Array<IFacture> | boolean) => {
                if (typeof res === "boolean") {
                    setFactures([])
                } else {
                    setFactures(res)
                }
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                setFactures([])
            })
    }, []);

    return (
        <IonPage className={"facture"}>
            <Header text={"factures"} canGoBack={true} defaultHref={"/user"} />
            {
                isLoading ? <Loader/> :
                    <IonContent className={"facture-container"}>
                        <IonList inset={false} lines={"full"} className={"facture-container-list"}>
                            {
                                factures.length ? (
                                    factures.map(facture => {
                                        return (
                                            <IonItem key={facture.id}>{facture.date}</IonItem>
                                        )
                                    })
                                ) : (
                                    <div className={"noItem"}>
                                        Aucune facture à afficher
                                    </div>
                                )
                            }
                        </IonList>
                    </IonContent>
            }
        </IonPage>
    )
}

export default Facture;