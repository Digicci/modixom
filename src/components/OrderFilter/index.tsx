import React from "react";

//style imports
import './orderFilter.scss';

// utils imports
import {useSelector, useDispatch} from "react-redux";
import {getWhereOrder} from "../../store/selectors/AnnonceSelectors";
import {setWhere} from "../../store/actions/annonceActions";

const OrderFilter: React.FC = () => {
    const dispatch = useDispatch();
    const order = useSelector(getWhereOrder);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWhere({tri: e.target.value}));
    }

    return (
        <fieldset name={'order'} className={'orderFilter'}>
            <div className={'orderFilter__item'}>
                <div className={'orderFilter__item__label'}>
                    prix croissant
                </div>
                <div className={'orderFilter__item__checkbox'}>
                    <label htmlFor="order1">
                        <input type="radio" onChange={handleChange} checked={order === 'ASC'} id="order1" value={'ASC'}/>
                    </label>
                </div>
            </div>
            <div className={'orderFilter__item'}>
                <div className={'orderFilter__item__label'}>
                    prix décroissant
                </div>
                <div className={'orderFilter__item__checkbox'}>
                    <label htmlFor="order2">
                        <input type="radio" onChange={handleChange} checked={order === 'DESC'} id="order2" value={'DESC'}/>
                    </label>
                </div>
            </div>
        </fieldset>
    );
}

export default OrderFilter;