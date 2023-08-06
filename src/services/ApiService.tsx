import React, {createContext, useContext} from "react";
import axios from "axios";

const Api = axios.create({
    baseURL: 'https://deamonerp.fr/modixom/public/index.php/api/',
})

// Définition du type pour le contexte
interface IApiContext {
    get: (url: string, params?: any) => Promise<any>;
    post: (url: string, data?: any) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    remove: (url: string) => Promise<any>;
}

const ApiContext = createContext<IApiContext | null>(null);

export const useApi = () => {
    const api = useContext(ApiContext);
    if (!api) {
        throw new Error('useApi must be used within a ApiProvider');
    }
    return api;
}

interface IProviderProps {
    children: React.ReactNode;
}

export function ProvideApi({ children }: IProviderProps) {
    const api = useProvideApi();
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}


//ToDo : Ajouter des fonctions pour chaque requête necesaire, les endpoints doivent être définis dans un fichier à part
function useProvideApi(): IApiContext{
    const get = async (url, params = {}) => {
        try {
            const response = await Api.get(url, {params});
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const post = async (url, data = {}) => {
        try {
            const response = await Api.post(url, data);
            return response.data;
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }

    const put = async (url, data = {}) => {
        try {
            const response = await Api.put(url, data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const remove = async (url) => {
        try {
            const response = await Api.delete(url);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    return {
        get,
        post,
        put,
        remove
    }
}

