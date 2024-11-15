import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setWhere} from "../../store/actions/annonceActions";

import {IonIcon, IonInput, IonItem} from "@ionic/react";
import {Keyboard} from "@capacitor/keyboard";
import {search} from "ionicons/icons";
import {getWhereClause} from "../../store/selectors/AnnonceSelectors";

const SearchInput: FC = () => {
    const dispatch = useDispatch();
    const value = useSelector(getWhereClause).motscles

    const handleChange = (e: any) => {
        const {value} = e.target;
        dispatch(setWhere({motscles: value}))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        Keyboard.hide().then()
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
                    value={value}
                    clearInput={true}
                />
                <IonIcon icon={search} slot={'start'} className={'home__header__search__icon'}/>
            </IonItem>
        </form>
    );
}

export default SearchInput;