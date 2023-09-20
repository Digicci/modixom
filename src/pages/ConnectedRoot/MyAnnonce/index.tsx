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
import ICategory from "../../../models/ICategory";
import {setCategoryCollection} from "../../../store/actions/categoryActions";
import {getCategoryCollection} from "../../../store/selectors/CategorySelectors";


const MyAnnonce: React.FC = () => {
    const [isloading, setIsLoading] = useState<boolean>(false)
    const token: string = useSelector(getUserToken)
    const api = useApi()
    const dispatch = useDispatch()
    const [annonces,setAnnonces]=useState<Array<object>>([]);
    const categoryCollection = useSelector(getCategoryCollection);


    const fetchAnnonce = () => {
        setIsLoading(true);
        api.get(endpoints.annonceUserDetail,{token}).then((res)=>{
            console.log(res)
            dispatch(setMyAnnonces(res))

        }).catch(error=>{
            console.log(error)
        })
    }
    const fetchCategorie=()=>{
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            dispatch(setCategoryCollection(res))
        })
    }

    useEffect(() => {
        fetchCategorie();

        if (categoryCollection.length > 0) {
            fetchAnnonce();
        }
        setIsLoading(false)
    }, [categoryCollection]);

    let annoncesTempo=(useSelector(getMyAnnonces))
    useEffect(() => {
        setAnnonces(annoncesTempo)
    }, [annoncesTempo]);




    return (
        <>
             <IonPage>
                <Header text={"annonces diffusées"} canGoBack={true} defaultHref={"/user"}/>
                 { isloading? <Loader/>:<IonContent className={"myAnnonce"}>
                    <IonList inset={false} lines={"full"} className={'myAnnonce__list'}>
                        {annonces ? (
                            annonces.map((item: any, index: number) => {
                                return (
                                    <MyAnnonceComponents key={index} titre={item.titre} date={item.date} id={item.id} />
                                )
                            })
                        ) : (
                            // Vous pouvez afficher un message ou une indication de chargement ici
                            <Loader/>
                        )}
                    </IonList>
                </IonContent>
                 }
            </IonPage>

        </>
    )
}

export default MyAnnonce