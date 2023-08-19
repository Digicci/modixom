import React from "react";
import './item.scss';

import check from '../../../../src/assets/img/checkmark-outline.svg';
import {IonIcon} from "@ionic/react";
import {useSelector, useDispatch} from "react-redux";


interface IItemProps {
    name: string;
    id: number;
    selector: (category: number) => (state: any) => any;
    dispatchFn: (category: number) => any;
}

// Item s'attend à recevoir un nom, un id, un selector (redux) et une dispatchFn (redux)
const Item: React.FC<IItemProps> = ({name, id, selector, dispatchFn}: IItemProps) => {
    const dispatch = useDispatch();
    const isSelected = useSelector(selector(id));

    const handleClick = () => {
        dispatch(dispatchFn(id));
    }

    const className = isSelected ? "category__item selected" : "category__item";

    return (
        <div className={className} onClick={handleClick}>
            <div className={"category__item__name"}>
                {name.replace("/", " ")}
            </div>
            {
                isSelected && (
                    <div className={"category__item__selected"}>
                        <IonIcon src={check}/>
                    </div>
                )
            }
        </div>
    );
};

export default Item;