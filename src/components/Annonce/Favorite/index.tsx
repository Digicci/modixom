// path : src/components/Annonce/Favorite/index.tsx
import "./style.scss";
import React from 'react'
import {IonIcon} from "@ionic/react";
import {heart, heartOutline} from "ionicons/icons";

interface IFavorite {
    isFavorite: boolean;
}

const Favorite: React.FC<IFavorite> = ({isFavorite = false}) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return <div className={"favorite-container"} onClick={handleClick}>
        <IonIcon src={isFavorite ? heart : heartOutline} size={"large"} />
    </div>
}

export default Favorite