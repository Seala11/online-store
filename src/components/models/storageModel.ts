import { IFilterSettings, FilterKeys, StorageKey, CartCouterOptions } from '@src/types/types';

export class StorageModel {
    defaultFilters: IFilterSettings;
    defaultCounterValue: string;

    constructor() {
        this.defaultCounterValue = '0';
        this.defaultFilters = {
            plantFamily: [],
            quantityRange: [1, 10],
            priceRange: [10, 100],
            color: [],
            size: [],
            sale: false,
            sortType: 0,
            cart: [],
            searchValue: '',
        };
        this.initFiltersSetting();
    }

    private initFiltersSetting(): void {
        const filterStorage: string | null = localStorage.getItem(StorageKey.filters);
        if (!filterStorage) {
            localStorage.setItem(StorageKey.filters, JSON.stringify(this.defaultFilters));
        }
    }

    resetFilters(): void {
        localStorage.removeItem(StorageKey.filters);
        this.initFiltersSetting();
    }

    resetSettings(): void {
        localStorage.removeItem(StorageKey.counter);
        localStorage.removeItem(StorageKey.filters);
        localStorage.removeItem(StorageKey.products);
        this.initFiltersSetting();
    }

    getCartCounter(): string {
        const storedCounter: string | null = localStorage.getItem(StorageKey.counter);
        return storedCounter ? storedCounter : this.defaultCounterValue;
    }

    setCartCounter(option: CartCouterOptions, value = 1): void {
        const currCounterValue = Number(this.getCartCounter());

        switch (option) {
            case CartCouterOptions.add:
                localStorage.setItem(StorageKey.counter, `${currCounterValue + value}`);
                break;
            case CartCouterOptions.remove:
                localStorage.setItem(StorageKey.counter, `${currCounterValue - value}`);
        }
    }

    getCartProducts(): string[] {
        const storedProducts: string | null = localStorage.getItem(StorageKey.products);
        const defautProductsValue: string[] = [];
        return storedProducts ? JSON.parse(storedProducts) : defautProductsValue;
    }

    setCartProducts(productId: string): void {
        const storedProducts: string[] = this.getCartProducts();

        if (storedProducts.includes(productId)) {
            storedProducts.splice(storedProducts.indexOf(productId), 1);
        } else {
            storedProducts.push(productId);
        }
        localStorage.setItem(StorageKey.products, JSON.stringify(storedProducts));
    }

    getFiltersStorage(): IFilterSettings {
        const filterStorage: string | null = localStorage.getItem(StorageKey.filters);
        if (!filterStorage) throw new Error('filter storage should be initialized');
        return JSON.parse(filterStorage);
    }

    getFiltersSetting(key: FilterKeys): IFilterSettings[FilterKeys] {
        const filterStorage: string | null = localStorage.getItem(StorageKey.filters);
        if (!filterStorage) throw new Error('filter storage should be initialized');
        const filterObject: IFilterSettings = JSON.parse(filterStorage);
        return filterObject[key];
    }

    setFiltersSetting(key: FilterKeys, value: string | string[]): void {
        const filterStorage: string | null = localStorage.getItem(StorageKey.filters);
        if (!filterStorage) throw new Error('filter storage should be initialized');

        const filterObject: IFilterSettings = JSON.parse(filterStorage);

        switch (key) {
            case FilterKeys.searchValue:
                filterObject[key] = `${value}`;
                break;
            case FilterKeys.sortType:
                filterObject[key] = Number(value);
                break;
            case FilterKeys.plantFamily:
            case FilterKeys.size:
            case FilterKeys.color:
                if (typeof value === 'string') {
                    filterObject[key].includes(value)
                        ? filterObject[key].splice(filterObject[key].indexOf(value), 1)
                        : filterObject[key].push(value);
                }
                break;
            case FilterKeys.sale:
                filterObject[key] = value === 'true' ? true : false;
                break;
            case FilterKeys.quantityRange:
            case FilterKeys.priceRange:
                if (Array.isArray(value)) filterObject[key] = value.map((el: string): number => +el);
                break;
        }
        localStorage.setItem(StorageKey.filters, JSON.stringify(filterObject));
    }
}
