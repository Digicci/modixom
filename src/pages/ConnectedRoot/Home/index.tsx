import React, {useEffect} from "react";
import {useApi} from "../../../services/ApiService";
import {useSelector, useDispatch} from "react-redux";

import './home.scss';
import {IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage} from "@ionic/react";
import {optionsOutline} from "ionicons/icons";

import Annonce from "../../../components/Annonce";
import SearchInput from "../../../components/SearchInput";

import {IAnnonce} from "../../../models/IAnnonce";
import Loader from "../../../components/Loader";
import {getAnnonces, getWhereClause, isLoadingAnnonces} from "../../../store/selectors/AnnonceSelectors";
import {setAnnonce, setIsLoadingAnnonces} from "../../../store/actions/annonceActions";
import {endpoints} from "../../../constants";
import topToBottomAnimation from "../../../utils/tools/topToBottomAnimation";
import {UserState} from "../../../store/reducers/UserReducer";
import {apiUserDataAdapter} from "../../../utils/tools/apiDataAdapter";
import {setNewUserField, setUser} from "../../../store/actions/userActions";
import {getUserToken} from "../../../store/selectors/UserSelectors";

const Home: React.FC = () => {

    const api = useApi();
    const dispatch = useDispatch();
    const annonces = useSelector(getAnnonces)
    const isLoading = useSelector(isLoadingAnnonces)
    const where = useSelector(getWhereClause);
    const token = useSelector(getUserToken)

    const fetchUser = () =>{
        api.get(endpoints.profilDetail, {token}).then((res) => {
            console.log(res);
            const apiUser: UserState = apiUserDataAdapter(res);
            dispatch(setUser(apiUser));
            dispatch(setNewUserField("id", apiUser.id!));
            dispatch(setNewUserField('isPro', apiUser.isPro!));
        })
    }

    useEffect(() => {
        fetchUser()
        dispatch(setIsLoadingAnnonces(true));
        let data = {};
        if(where.motscles.length < 3) {
            const {motscles, ...rest} = where;
            data = {...rest};
        } else {
            data = {...where};
        }

        api.get(endpoints.annonces, data).then((res: IAnnonce[]) => {
            dispatch(setAnnonce(res));
            console.log(res)
        });
    }, [where]);


    return (
        <IonPage className={'home'}>
            <IonHeader className={'home__header'}>
                <SearchInput />
            </IonHeader>
            <IonContent>
                <div className={'home__content'}>
                    <div className={'home__content__filters'}>
                        <div className={'home__content__filters__category'}>
                            <IonButton
                                className={'button'}
                                routerLink={"/home/filter/category"}
                                routerDirection={"forward"}
                                routerAnimation={topToBottomAnimation}
                            >
                                Catégories
                            </IonButton>
                        </div>
                        <div className={'home__content__filters__button'}>
                            <IonButton
                                className={'button'}
                                routerLink={"/home/filter/filters"}
                                routerDirection={"forward"}
                                routerAnimation={topToBottomAnimation}
                            >
                                Filtres
                                <IonIcon icon={optionsOutline} slot={'end'}/>
                            </IonButton>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            annonces?.length > 0 ? (
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