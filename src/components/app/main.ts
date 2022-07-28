import { Filters } from '@src/components/filters/filterSection';
import DOMElement from '@src/components/helpers/DOMElement';
import { ProductModel } from '@src/components/models/productModel';
import { ProductItem } from '@src/components/products/productItem';
import { ProductSortKey, FilterSortOptions, CartCouterOptions } from '@src/types/types';
import { StorageModel } from '@src/components/models/storageModel';

class Main extends DOMElement {
    public sectionProducts: DOMElement;
    public sectionFilters: Filters;
    public model: ProductModel;
    public data: ProductItem[];
    public counter: DOMElement;
    public storage: StorageModel;

    constructor(
        parentNode: HTMLElement | null,
        tagName: string,
        className: string,
        cartCounter: DOMElement,
        storage: StorageModel
    ) {
        super(parentNode, tagName, className);
        this.storage = storage;
        this.counter = cartCounter;
        this.sectionFilters = new Filters(this.element, 'section', 'main__filters filters', this);
        this.sectionProducts = new DOMElement(this.element, 'section', 'main__products products');
        this.model = new ProductModel(this);
        this.model.showProducts();
        this.data = this.model.data;
    }

    public updateCartCounter(productId: string): void {
        const storedProducts: string[] = this.storage.getCartProducts();
        this.storage.setCartProducts(productId);

        storedProducts.includes(productId)
            ? this.storage.setCartCounter(CartCouterOptions.remove)
            : this.storage.setCartCounter(CartCouterOptions.add);

        this.counter.element.textContent = this.storage.getCartCounter();
    }

    public updateProducts(): void {
        const filterStorage = this.storage.getFiltersStorage();
        this.sectionProducts.element.remove();
        this.sectionProducts = new DOMElement(this.element, 'section', 'main__products products');
        let newData: ProductItem[] = [];

        const filterCategory = (categorySetting: string[], itemCategory: string): boolean => {
            return categorySetting.includes(itemCategory.toLowerCase()) || categorySetting.length === 0;
        };
        const filterSale = (saleSetting: boolean, itemSale: boolean): boolean => {
            return saleSetting === itemSale || saleSetting === false;
        };
        const filterRange = (rangeSetting: number[], itemNumber: number): boolean => {
            return itemNumber >= rangeSetting[0] && itemNumber <= rangeSetting[1];
        };
        const searchProduct = (productName: string, userInput: string): RegExpMatchArray | null => {
            const test = new RegExp(`${userInput.replace(/\s/g, '')}`);
            return productName.replace(/\s/g, '').toLowerCase().match(test);
        };

        this.data.forEach((item: ProductItem): void => {
            if (
                filterCategory(filterStorage.plantFamily, item.category) &&
                filterCategory(filterStorage.size, item.size) &&
                filterCategory(filterStorage.color, item.color) &&
                filterSale(filterStorage.sale, item.sale) &&
                filterRange(filterStorage.quantityRange, item.quantity) &&
                filterRange(filterStorage.priceRange, item.price) &&
                searchProduct(item.name, filterStorage.searchValue)
            ) {
                newData.push(item);
            }
        });

        const sortProducts = (productKey: keyof ProductItem, inAscendingOrder = false) => (
            a: ProductItem,
            b: ProductItem
        ) => {
            if (inAscendingOrder) {
                return a[productKey] == b[productKey] ? 0 : a[productKey] < b[productKey] ? -1 : 1;
            } else {
                return a[productKey] == b[productKey] ? 0 : a[productKey] < b[productKey] ? 1 : -1;
            }
        };

        if (filterStorage.sortType !== null) {
            switch (Number(filterStorage.sortType)) {
                case FilterSortOptions.AZ:
                    newData = newData.sort(sortProducts(ProductSortKey.name, true));
                    break;
                case FilterSortOptions.ZA:
                    newData = newData.sort(sortProducts(ProductSortKey.name));
                    break;
                case FilterSortOptions.PriceLowHight:
                    newData = newData.sort(sortProducts(ProductSortKey.price, true));
                    break;
                case FilterSortOptions.PriceHightLow:
                    newData = newData.sort(sortProducts(ProductSortKey.price));
                    break;
                case FilterSortOptions.QuantityMinMax:
                    newData = newData.sort(sortProducts(ProductSortKey.quantity, true));
                    break;
                case FilterSortOptions.QuantityMaxMin:
                    newData = newData.sort(sortProducts(ProductSortKey.quantity));
            }
        }

        if (newData.length <= 0) {
            const errorWrapper = new DOMElement(
                this.sectionProducts.element,
                'div',
                'products__error-wrapper error-wrapper'
            );
            new DOMElement(
                errorWrapper.element,
                'p',
                'error-wrapper__title',
                'Sorry, no products matched your selection.'
            );
            new DOMElement(
                errorWrapper.element,
                'p',
                'error-wrapper__title',
                'Please choose a different filter combination.'
            );
            return;
        }

        newData.forEach((item: ProductItem): void => this.sectionProducts.element.append(item.element));
    }

    showErrorMessage(): void {
        document.body.style.overflowY = 'hidden';
        const errorWrapper: DOMElement = new DOMElement(document.body, 'div', 'error');

        const errorMessage: DOMElement = new DOMElement(errorWrapper.element, 'div', 'error__message');
        new DOMElement(errorMessage.element, 'div', 'error__text', 'Sorry, the cart is already full.');
        const errorBtn: DOMElement = new DOMElement(errorMessage.element, 'button', 'error__button', 'ok');

        errorBtn.element.onclick = (): void => {
            errorWrapper.element.remove();
            document.body.style.overflowY = 'scroll';
        };
    }
}

export default Main;
