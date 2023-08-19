import React, {useEffect, useState} from 'react';
import './category.scss';
import {IonButton, IonContent, IonHeader, IonPage} from "@ionic/react";
import {useApi} from "../../../../services/ApiService";
import {endpoints} from "../../../../constants";
import ICategory from "../../../../models/ICategory";

import {generateHeaderClassName} from "../../../../utils/tools/classNameGenerator";
import {useSelector, useDispatch} from "react-redux";
import {getCategoryCollection} from "../../../../store/selectors/CategorySelectors";
import {setCategoryCollection} from "../../../../store/actions/categoryActions";
import {isUserPro} from "../../../../store/selectors/UserSelectors";
import Loader from "../../../../components/Loader";
import Item from "../../../../components/Category/Item";
import {isSelectedCategory} from "../../../../store/selectors/AnnonceSelectors";
import {toggleCategoryFilter} from "../../../../store/actions/annonceActions";

const Category: React.FC = () => {
    const isPro: boolean = useSelector(isUserPro);
    const headerClass: string = generateHeaderClassName(isPro);
    const api = useApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const categoryCollection = useSelector(getCategoryCollection);

    useEffect(() => {
        categoryCollection.length === 0 && api.get(endpoints.categories).then((res: ICategory[]) => {
            setIsLoading(false);
            dispatch(setCategoryCollection(res));
        });
        categoryCollection.length > 0 && setIsLoading(false);
    }, []);

    return (
        <IonPage>
            <IonHeader className={headerClass}>
                <h1>Categories</h1>
            </IonHeader>
            <IonContent>
                <div className={'category'}>
                    {
                        isLoading ? (
                            <Loader/>
                        ) : categoryCollection.length > 0 ? (
                            <div className={'category__grid'}>
                                {

                                    categoryCollection.map((category: ICategory) => (
                                        <Item
                                            key={category.id}
                                            name={category.libelle}
                                            id={category.id}
                                            selector={isSelectedCategory}
                                            dispatchFn={toggleCategoryFilter}
                                        />
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
                        <IonButton className={'button validateButton'} routerLink={"/home"} routerDirection={"back"}>
                            Valider
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Category;