export interface IAnnonce {
    id: number;
    title: string;
    imgPath: string | null;
    description: string;
    oldPrice: string | number | null;
    newPrice: string | number;
    logoPath: string | null;
    priceEval: number;
    vendorEval: number;
}