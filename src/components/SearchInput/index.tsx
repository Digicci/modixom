import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {setWhere} from "../../store/actions/annonceActions";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {search} from "ionicons/icons";

const SearchInput: FC = () => {
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        const {value} = e.target;
        dispatch(setWhere({motscles: value}))
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