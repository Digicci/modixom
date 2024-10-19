import React, {useEffect} from 'react';
import {IonButton, IonContent, IonFooter, IonPage, useIonToast, useIonRouter} from "@ionic/react";
// style import
import './alerte.scss';

// components import
import Loader from "../../../components/Loader";

// utils import

// store import
import {useDispatch, useSelector} from "react-redux";
import {getCategoryCollection} from "../../../store/selectors/CategorySelectors";
import {setCategoryCollection} from "../../../store/actions/categoryActions";
import {getAlerte, getAlerteRayon, isSelectedAlerteCategory} from "../../../store/selectors/AlerteSelectors";
import {resetAlerteFields, setAlerteFields, toggleAlerteCategory} from "../../../store/actions/alerteActions";
import {useApi} from "../../../services/ApiService";
import {endpoints, storageKeys} from "../../../constants";
import ICategory from "../../../models/ICategory";
import Item from "../../../components/Category/Item";
import RayonFilter from "../../../components/RayonFilter";
import Header from "../../../components/Header";
import {getUser} from "../../../store/selectors/UserSelectors";

const Alerte: React.FC = () => {

    const categoryCollection = useSelector(getCategoryCollection)
    const alerte = useSelector(getAlerte)
    const [present] = useIonToast()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const api = useApi();
    const user = useSelector(getUser)
    const router = useIonRouter()

    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res) => {
            dispatch(setCategoryCollection(res));
            setIsLoading(false);
        })
        categoryCollection.length > 0 && setIsLoading(false);
        return () => {
            dispatch(setCategoryCollection([]))
        }
    }, [])

    const handleValidate = () => {

        api.post(endpoints.addAlerte, {...alerte, mail: user.mail}).then(async (data) => {
            console.log(data)
            await present({
                message: 'Alerte enregistrée avec succès',
                color: 'success',
                duration: 5000,
            })
            dispatch(resetAlerteFields())
            router.goBack()
        })
    }

    return (
        <IonPage className={"page"}>
            <Header text={'je crée une alerte'} />
            <IonContent>
                <div className={'alerte'}>
                    <div className={'alerte__category'}>
                        {
                            isLoading ? <Loader/> :
                                (
                                    <div className={'alerte__category__grid'}>
                                        {
                                            categoryCollection.map(({id, libelle}: ICategory, index: number) => {
                                                return (
                                                    <Item key={index} name={libelle} id={id}
                                                          selector={isSelectedAlerteCategory}
                                                          dispatchFn={toggleAlerteCategory}/>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }

                    </div>
                    <div className={'alerte__rayon'}>
                        <div>
                            <h2>Choisir le périmètre</h2>
                        </div>
                        <RayonFilter
                            storageKey={storageKeys.alerteVille}
                            rayonSelector={getAlerteRayon}
                            reducerSelector={getAlerte}
                            dispatchFn={setAlerteFields}
                        />
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <div className={'footer'}>
                    <IonButton
                        onClick={handleValidate}
                        className={'footer__button validateButton'}
                    >
                        valider
                    </IonButton>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default Alerte;