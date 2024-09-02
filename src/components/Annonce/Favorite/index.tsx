// path : src/components/Annonce/Favorite/index.tsx
import "./style.scss";
import React from 'react'
import {IonIcon} from "@ionic/react";
import {heart, heartOutline} from "ionicons/icons";
import {IAnnonce} from "../../../models/IAnnonce";
import {useDispatch} from "react-redux";
import {updateAnnonce} from "../../../store/actions/annonceActions";


const Favorite: React.FC<IAnnonce> = (props: IAnnonce) => {

    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const annonce = {...props, favoris: !props.favoris}
        dispatch(updateAnnonce(annonce))
    }

    return <div className={"favorite-container"} onClick={handleClick}>
        <IonIcon src={props.favoris ? heart : heartOutline} size={"large"} />
    </div>
}

export default Favorite