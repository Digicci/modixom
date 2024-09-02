export interface IAnnonce {
    id: number;
    titre: string;
    images: string | null;
    description: string;
    prix: number;
    newprix?: number;
    logo?: string;
    moyAnnonce: number;
    moyEnseigne: number;
    adresse?: string;
    ville?: string;
    cp?: string;
    enseigne?: string;
    debut?: string;
    fin?: string;
    heures?: number;
    minutes?: number;
    secondes?: number;
    pourcentRemise?: number;
    quantite?: number;
    telephone?: string;
    nbNoteAnnonce?: number;
    favoris?: boolean;
}