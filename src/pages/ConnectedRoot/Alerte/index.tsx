import React, {useEffect} from 'react';
import {IonButton, IonContent, IonFooter, IonHeader, IonPage} from "@ionic/react";

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
import {setAlerteFields, toggleAlerteCategory} from "../../../store/actions/alerteActions";
import {useApi} from "../../../services/ApiService";
import {endpoints, storageKeys} from "../../../constants";
import ICategory from "../../../models/ICategory";
import Item from "../../../components/Category/Item";
import RayonFilter from "../../../components/RayonFilter";
import Header from "../../../components/Header";

const Alerte: React.FC = () => {

    const categoryCollection = useSelector(getCategoryCollection)
    const alerte = useSelector(getAlerte)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const api = useApi();

    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res) => {
            dispatch(setCategoryCollection(res));
            setIsLoading(false);
        })
        categoryCollection.length > 0 && setIsLoading(false);
    }, [])

    const handleValidate = () => {
        console.log({message: 'alerte validée', data: alerte});
    }

    return (
        <IonPage>
            <Header text={'je créer une alerte'} />
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