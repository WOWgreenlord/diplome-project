import { Links } from "./Links";

export interface Product {
    id: number;
    articul: string;
    description: string;
    current_price: {
        base_currency: number;
        usd_price: number;
        rub_price: number;
        warning: null;
    };
    regular_price: {
        base_currency: number;
        usd_price: number;
        rub_price: number;
        warning: null;
    };
    availability: {
        at_stock_r: string;
        at_stock_and_transit_r: string;
    };
    deliveries_info: null;
    vendor: {
        id: number;
        name: string;
    };
    images_links: Links[];
    
}