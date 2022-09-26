export interface IYardSale {
    id: number;
    description: string;
    latitude: number;
    longitude: number;
    start_date: Date;
    end_date: Date;
}

export interface IYardSaleCreate {
    description: string;
    latitude: number;
    longitude: number;
    start_date: Date;
    end_date: Date;
}
