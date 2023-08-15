import React from "react";
import './item.scss';

import check from '../../../../src/assets/img/checkmark-outline.svg';
import {IonIcon} from "@ionic/react";
import {useSelector, useDispatch} from "react-redux";
import {toggleCategoryFilter} from "../../../store/actions/annonceActions";
import {isSelectedCategory} from "../../../store/selectors/AnnonceSelectors";


interface IItemProps {
  name: string;
  id: number;
}
const Item: React.FC<IItemProps> = ({name, id}: IItemProps) => {
    const dispatch = useDispatch();
    const isSelected = useSelector(isSelectedCategory(id));

    const handleClick = () => {
        dispatch(toggleCategoryFilter(id));
    }

    const className = isSelected ? "category__item selected" : "category__item";

  return (
      <div className={className} onClick={handleClick}>
        <div className={"category__item__name"}>
            {name}
        </div>
          {
                isSelected && (
                  <div className={"category__item__selected"}>
                      <IonIcon src={check} />
                  </div>
                )
          }
      </div>
  );
};

export default Item;