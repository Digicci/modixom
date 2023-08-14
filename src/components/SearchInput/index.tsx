import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {setAnnonce, setIsLoadingAnnonces} from "../../store/actions/annonceActions";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {useApi} from "../../services/ApiService";
import {search} from "ionicons/icons";

const SearchInput: FC = () => {
    const api = useApi();
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        const {value} = e.target;
        if (value.length < 3) {
            dispatch(setIsLoadingAnnonces(true));
            api.get('searchAnnonces').then((res: any) => {
                dispatch(setAnnonce(res));
            });
            return;
        }
        dispatch(setIsLoadingAnnonces(true));
        api.get('searchAnnonces', {motscles: value}).then((res: any) => {
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