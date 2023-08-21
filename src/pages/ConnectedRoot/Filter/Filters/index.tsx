import React from "react";
import {IonButton, IonContent, IonHeader, IonPage, useIonToast} from "@ionic/react";

//components imports
import OrderFilter from "../../../../components/OrderFilter";

//utils imports
import {generateHeaderClassName} from "../../../../utils/tools/classNameGenerator";
import {useSelector, useDispatch} from "react-redux";
import {isUserPro} from "../../../../store/selectors/UserSelectors";
import {resetWhere, setWhere} from "../../../../store/actions/annonceActions";

//style imports
import './filters.scss';
import RayonFilter from "../../../../components/RayonFilter";
import AnnonceTypeFilter from "../../../../components/AnnonceTypeFilter";
import {getRayon, getWhereClause} from "../../../../store/selectors/AnnonceSelectors";
import {storageKeys} from "../../../../constants";
const Filters: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);
    const dispatch = useDispatch();
    const [present] = useIonToast();

    const handleReset = () => {
        dispatch(resetWhere());
        present({
            message: "Les filtres ont été supprimés",
            duration: 2000,
            color: "success"
        });
    }

    return (
        <IonPage>
            <IonHeader className={headerClass}>
                <h1>FILTRES</h1>
            </IonHeader>
            <IonContent>
                <div className={'filters'}>
                    <div className={'filters__section'}>
                        <div className={'filters__section__title'}>
                            <h2>trier par</h2>
                        </div>
                        <div className={'filters__section__content'}>
                            <OrderFilter />
                        </div>
                    </div>
                    {
                        isPro && (
                            <div className={'filters__section'}>
                                <div className={'filters__section__title'}>
                                    <h2>annonces</h2>
                                </div>
                                <div className={'filters__section__content'}>
                                    <AnnonceTypeFilter />
                                </div>
                            </div>
                        )
                    }
                    <div className={'filters__section'}>
                        <div className={'filters__section__title'}>
                            <h2>périmètre</h2>
                        </div>
                        <div className={'filters__section__content'}>
                            <RayonFilter
                                dispatchFn={setWhere}
                                rayonSelector={getRayon}
                                reducerSelector={getWhereClause}
                                storageKey={storageKeys.filterVille}
                            />
                        </div>
                    </div>
                    <div className={'filters__section'}>
                        <button onClick={handleReset} className={'filters__section__suppress'}>
                            <h2>supprimer les filtres</h2>
                        </button>
                    </div>
                    <div className={'filters__section validateButtonContainer'}>
                        <IonButton routerLink={"/home"} routerDirection={"back"} className={'filters__section__validate validateButton'}>
                            <h2>Valider</h2>
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Filters;