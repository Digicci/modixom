import React from 'react';
import './annonceTypeFilter.scss';

import {useSelector, useDispatch} from "react-redux";
import {getWherePro} from "../../store/selectors/AnnonceSelectors";
import {setWhere} from "../../store/actions/annonceActions";

const AnnonceTypeFilter: React.FC = () => {

    const dispatch = useDispatch();
    const type = useSelector(getWherePro);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWhere({pro: e.target.value === 'pro'}));
    }

    return (
        <fieldset name={'annonce'} className={'annonceType'}>
            <div className={'annonceType__item'}>
                <div className={'annonceType__item__label'}>
                    particulier
                </div>
                <div className={'annonceType__item__checkbox'}>
                    <label htmlFor="typePart">
                        <input
                            type="radio"
                            checked={type === false}
                            onChange={handleChange}
                            id="typePart"
                            value={'part'}
                        />
                    </label>
                </div>
            </div>
            <div className={'annonceType__item'}>
                <div className={'annonceType__item__label'}>
                    professionnels
                </div>
                <div className={'annonceType__item__checkbox'}>
                    <label htmlFor="typePro">
                        <input
                            type="radio"
                            checked={type === true}
                            onChange={handleChange}
                            id="typePro"
                            value={'pro'}
                        />
                    </label>
                </div>
            </div>
        </fieldset>
    );
}

export default AnnonceTypeFilter;