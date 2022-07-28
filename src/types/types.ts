export type TDOMElementAttributes = {
    key: string;
    value: string;
};

export interface IProduct {
    num: number;
    plantFamily: string;
    img: string;
    name: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
    sale: boolean;
}

export enum FilterSortOptions {
    AZ,
    ZA,
    PriceLowHight,
    PriceHightLow,
    QuantityMinMax,
    QuantityMaxMin,
}

export enum ProductSortKey {
    name = 'name',
    price = 'price',
    quantity = 'quantity',
}

export enum CartCouterOptions {
    add,
    remove,
}

export enum ProductButtonText {
    add = 'Add to cart',
    remove = 'Remove from cart',
}

export enum FilterKeys {
    searchValue = 'searchValue',
    sortType = 'sortType',
    plantFamily = 'plantFamily',
    quantityRange = 'quantityRange',
    priceRange = 'priceRange',
    color = 'color',
    size = 'size',
    sale = 'sale',
}

export interface IFilterSettings {
    plantFamily: string[];
    quantityRange: number[];
    priceRange: number[];
    color: string[];
    size: string[];
    sale: boolean;
    sortType: number | null;
    cart: number[];
    searchValue: string;
}

export enum FilterCategoryButton {
    aglaonema = 'Aglaonema',
    calathea = 'Calathea',
    pothos = 'Pothos',
    monstera = 'Monstera',
    philodendron = 'Philodendron',
}

export enum FilterSizeButtons {
    s = 'S',
    m = 'M',
    l = 'L',
}

export enum FilterColorButtons {
    black = 'Black',
    white = 'White',
    pink = 'Pink',
}

export enum StorageKey {
    filters = 'filters',
    counter = 'counter',
    products = 'cart_products',
}

export enum WarningMessage {
    settings,
    filters,
}
