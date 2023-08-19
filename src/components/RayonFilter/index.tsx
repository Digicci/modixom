import React, {useState, useEffect} from "react";
import './rayonFilter.scss';
import {useApi} from "../../services/ApiService";
import {endpoints} from "../../constants";
import {IonButton, IonIcon} from "@ionic/react";
import {locationOutline} from "ionicons/icons";
import {useSelector, useDispatch} from "react-redux";
import {getLocation} from "../../services/LocationService";

import Loader from "../Loader";
import CityProposal from "./CityProposal";
interface IRayonFilterProps {
    storageKey: string;
    reducerSelector: (state: any) => any;
    rayonSelector: (state: any) => any;
    dispatchFn: (value: any) => any;
}

const RayonFilter: React.FC<IRayonFilterProps> = ({storageKey, rayonSelector, reducerSelector, dispatchFn}: IRayonFilterProps) => {
    const [ville, setVille] = useState<string>(localStorage.getItem(storageKey) ?? '');
    const [villes, setVilles] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuggest, setShowSuggest] = useState<boolean>(false);
    const suggestClass: string = showSuggest ?
        'rayonFilter__inputGroup__suggest show'
        :
        'rayonFilter__inputGroup__suggest';
    const api = useApi();
    const dispatch = useDispatch();
    const rayon = useSelector(rayonSelector);
    const where = useSelector(reducerSelector);
    const whereVille = where.ville;
    const position = {lng: where.lng, lat: where.lat};
    const positionLabel: string = 'Ma position';

    const changeVille = (ville: string) => {
        setVille(ville);
        localStorage.setItem(storageKey, ville);
    }

    useEffect(() => {
        if (whereVille === null && position.lat === null && position.lng === null) {
            changeVille('');
        }
        if ((position.lat === null || position.lng === null) && whereVille === null) {
            changeVille('');
        }
    }, [whereVille, position.lat, position.lng])

    const handleVilleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (ville === positionLabel && value.length === ville.length - 1) {
            changeVille('');
            setIsLoading(false);
            setShowSuggest(false);
            dispatch(dispatchFn({ville: null, rayon: null, lat: null, lng: null}));
            return;
        }
        setIsLoading(true)
        changeVille(value);
        if(value.length > 0) {
            setShowSuggest(true);
        } else {
            setShowSuggest(false);
        }

        if (value === positionLabel) {
            setIsLoading(false);
            return;
        }

        if (value.length > 2) {
            api.get(endpoints.city, {q: value}).then((res: any) => {
                setVilles(res)
                setIsLoading(false)
            })
        } else {
            setVilles([])
        }
    }

    const handleVilleClick = (ville: any) => {
        if (ville === null) {
            changeVille('');
            setShowSuggest(false);
            setVilles([])
            setIsLoading(false)
            dispatch(dispatchFn({ville: null, rayon: null}));
            return;
        }
        changeVille(ville.nom);
        setShowSuggest(false);
        setVilles([])
        setIsLoading(false)
        dispatch(dispatchFn({ville: ville.id, rayon: rayon ?? 50}));
    }

    const handleRayonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        value.length > 0 ?
        dispatch(dispatchFn({rayon: parseInt(value)})) : dispatch(dispatchFn({rayon: null})) ;
    }

    const handleLocationClick = () => {
        getLocation().then((res: any) => {
            console.log(res)
            dispatch(dispatchFn({lat: res.coords.latitude, lng: res.coords.longitude, rayon: rayon ?? 50, ville: null}));
            changeVille(positionLabel);
        })
    }

    return (
        <div className={'rayonFilter'}>
            <div className={'rayonFilter__inputGroup'}>
                <input
                    type={'text'}
                    onChange={handleVilleChange}
                    placeholder={'Ville de départ'}
                    name={'depart'}
                    value={ville}
                />
                <IonButton className={'rayonFilter__inputGroup__button'} onClick={handleLocationClick}>
                    <IonIcon icon={locationOutline} slot={'end'}/>
                </IonButton>
                <div className={suggestClass}>
                    {
                        !isLoading ?
                            (
                                <CityProposal
                                    villes={villes}
                                    classPrefix={'rayonFilter__inputGroup__suggest'}
                                    click={handleVilleClick}
                                />
                            )
                            :
                            (<Loader/>)
                    }
                </div>
            </div>
            <label htmlFor={'rayonInput'} className={'rayonFilter__distanceGroup'}>
                <span>rayon de </span>
                <input
                    type={'text'}
                    pattern={'[0-9]*'}
                    id={'rayonInput'}
                    value={rayon ?? ''}
                    placeholder={'50'}
                    maxLength={3}
                    name={'distance'}
                    onChange={handleRayonChange}
                />
                <span> km</span>
            </label>
        </div>
    );
}

export default RayonFilter;