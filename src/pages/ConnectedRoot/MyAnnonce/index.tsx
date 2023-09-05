import React, {useEffect, useState} from "react";
import {IonContent, IonList, IonPage} from "@ionic/react";
import Header from "../../../components/Header";
import MyAnnonceComponents from "../../../components/MyAnnonceComponents";
import "./MyAnnoncescss.scss"
import {useDispatch, useSelector} from "react-redux";
import {getUserToken} from "../../../store/selectors/UserSelectors";
import {endpoints} from "../../../constants";
import {useApi} from "../../../services/ApiService";
import Loader from "../../../components/Loader";
import {setMyAnnonces} from "../../../store/actions/myAnnonceDetailAction";
import {getMyAnnonces} from "../../../store/selectors/myAnnonceSelectors";


const MyAnnonce: React.FC = () => {
    const [isloading, setIsLoading] = useState<boolean>(false)
    const token: string = useSelector(getUserToken)
    const api = useApi()
    const dispatch = useDispatch()
    const [annonces,setAnnonces]=useState<Array<object>>([]);

    const fetchAnnonce = () => {
        setIsLoading(true);
        api.get(endpoints.annonceUserDetail,{token}).then((res)=>{
            console.log(res)
            dispatch(setMyAnnonces(res))
            setIsLoading(false)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        fetchAnnonce()
    }, []);
    let annoncesTempo=(useSelector(getMyAnnonces))
    useEffect(() => {
        setAnnonces(annoncesTempo)
    }, [annoncesTempo]);




    return (
        <>
            { isloading? <Loader/>: <IonPage>
                <Header text={"annonces diffusées"} canGoBack={true}/>
                <IonContent className={"myAnnonce"}>
                    <IonList inset={false} lines={"full"} className={'myAnnonce__list'}>
                        {
                            annonces.map((item: any, index: number) => {
                                return (
                                    <MyAnnonceComponents key={index} titre={item.titre} date={item.date} id={item.id}  />
                                )
                            })
                        }
                    </IonList>
                </IonContent>
            </IonPage>
            }
        </>
    )
}

export default MyAnnonce