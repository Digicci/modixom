import React, {useEffect, useState} from 'react';
import './category.scss';
import {IonButton, IonContent, IonHeader, IonPage} from "@ionic/react";
import {useApi} from "../../../../services/ApiService";
import {endpoints} from "../../../../constants";
import ICategory from "../../../../models/ICategory";

import {generateHeaderClassName} from "../../../../utils/tools/classNameGenerator";
import {useSelector} from "react-redux";
import {isUserPro} from "../../../../store/selectors/UserSelectors";
import Loader from "../../../../components/Loader";
import Item from "../../../../components/Category/Item";

const Category: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);
    const api = useApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
      api.get(endpoints.categories).then((res: ICategory[]) => {
        console.log(res);
        setCategories(res);
        setIsLoading(false);
      })
    }, [])

    return (
        <IonPage>
            <IonHeader className={headerClass}>
                <h1>Categories</h1>
            </IonHeader>
            <IonContent>
                <div className={'category'}>
                    {
                        isLoading ? (
                            <Loader />
                        ) : categories.length > 0 ? (
                            <div className={'category__grid'}>
                                {

                                    categories.map((category: ICategory) => (
                                        <Item key={category.id} name={category.libelle} id={category.id} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className={'category__no-result'}>
                                Aucune catégorie trouvée
                            </div>
                        )
                    }
                    <div className={'category__validation'}>
                        <IonButton className={'button'} routerLink={"/home"} routerDirection={"back"}>
                            Valider
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Category;