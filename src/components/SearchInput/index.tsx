import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAnnonce, setIsLoadingAnnonces, setWhere} from "../../store/actions/annonceActions";
import {getWhereClause} from "../../store/selectors/AnnonceSelectors";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {useApi} from "../../services/ApiService";
import {search} from "ionicons/icons";
import {endpoints} from "../../constants";

const SearchInput: FC = () => {
    const api = useApi();
    const dispatch = useDispatch();
    const where = useSelector(getWhereClause, (prev, next) => prev.motscles === next.motscles);

    const handleChange = (e: any) => {
        const {value} = e.target;
        dispatch(setWhere({motscles: value}))
    }

    useEffect(() => {
        if (where.motscles.length === 0) {
            dispatch(setIsLoadingAnnonces(true));
            api.get(endpoints.annonces).then((res: any) => {
                dispatch(setAnnonce(res));
            });
            return;
        }
        if (where.motscles.length < 3) {
            return;
        }
        dispatch(setIsLoadingAnnonces(true));
        api.get('searchAnnonces', where).then((res: any) => {
            dispatch(setAnnonce(res));
        });
    }, [where]);

    return (
        <IonItem className={'home__header__search'}>
            <IonInput
                className={'home__header__search__input'}
                type={'text'}
                placeholder={'Rechercher un produit / une enseigne'}
                onIonInput={handleChange}
            />
            <IonIcon icon={search} slot={'start'} className={'home__header__search__icon'}/>
        </IonItem>
    );
}

export default SearchInput;