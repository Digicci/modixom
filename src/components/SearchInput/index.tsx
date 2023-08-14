import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAnnonce, setIsLoadingAnnonces, setWhere} from "../../store/actions/annonceActions";
import {getWhereClause} from "../../store/selectors/AnnonceSelectors";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {useApi} from "../../services/ApiService";
import {search} from "ionicons/icons";

const SearchInput: FC = () => {
    const api = useApi();
    const dispatch = useDispatch();
    const where = useSelector(getWhereClause);

    const handleChange = (e: any) => {
        const {value} = e.target;
        dispatch(setWhere({motscles: value}))
        if (value.length === 0) {
            dispatch(setIsLoadingAnnonces(true));
            api.get('searchAnnonces').then((res: any) => {
                dispatch(setAnnonce(res));
            });
            return;
        }
        if (value.length < 3) {
            return;
        }
        dispatch(setIsLoadingAnnonces(true));
        api.get('searchAnnonces', where).then((res: any) => {
            dispatch(setAnnonce(res));
        });
    }

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