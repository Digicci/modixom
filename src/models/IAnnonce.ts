export interface IAnnonce {
    id: number;
    titre: string;
    images: string | null;
    description: string;
    prix: string | number | null;
    newPrix?: string | number;
    logoPath?: string | null;
    moyAnnonce: number;
    moyEnseigne: number;
}