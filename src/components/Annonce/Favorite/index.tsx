// path : src/components/Annonce/Favorite/index.tsx
import "./style.scss";
import React from 'react'
import {IonIcon} from "@ionic/react";
import {heart, heartOutline} from "ionicons/icons";
import {IAnnonce} from "../../../models/IAnnonce";
import {useDispatch, useSelector} from "react-redux";
import {updateAnnonce} from "../../../store/actions/annonceActions";
import {useApi} from "../../../services/ApiService";
import {getUserId} from "../../../store/selectors/UserSelectors";
import {endpoints} from "../../../constants";


const Favorite: React.FC<IAnnonce> = (props: IAnnonce) => {

    const dispatch = useDispatch()
    const api = useApi()
    const userId = useSelector(getUserId)

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()

        if (!props.favoris) {
            console.log(userId)
            api.post(endpoints.updateFavoris, {annonceId: props.id, userId})
                .then((data) => {
                    console.log(data)
                })
        }

        const annonce = {...props, favoris: !props.favoris}
        dispatch(updateAnnonce(annonce))
    }

    return <div className={"favorite-container"} onClick={handleClick}>
        <IonIcon src={props.favoris ? heart : heartOutline} size={"large"} />
    </div>
}

export default Favorite