import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {setWhere} from "../../store/actions/annonceActions";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {Keyboard} from "@capacitor/keyboard";
import {search} from "ionicons/icons";

const SearchInput: FC = () => {
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        const {value} = e.target;
        dispatch(setWhere({motscles: value}))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={'home__header__search'}>
            <IonItem className={'home__header__search'}>
                <IonInput
                    className={'home__header__search__input'}
                    type={'search'}
                    placeholder={'Rechercher un produit / une enseigne'}
                    onIonInput={handleChange}
                    enterkeyhint={"search"}
                    clearInput={true}
                />
                <IonIcon icon={search} slot={'start'} className={'home__header__search__icon'}/>
            </IonItem>
        </form>
    );
}

export default SearchInput;