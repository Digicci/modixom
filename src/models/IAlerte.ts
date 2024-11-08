interface IAlerte {
    id: number;
    category: string;
    rayon: number;
    ville: string;
    lng?: number | null;
    lat?: number | null;
}

export default IAlerte