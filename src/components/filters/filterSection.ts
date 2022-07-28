import DOMElement from '@src/components/helpers/DOMElement';
import { FilterSearch } from '@src/components/filters/search';
import FilterSort from '@src/components/filters/sort';
import { FilterCategory } from '@src/components/filters/category';
import FilterSize from '@src/components/filters/size';
import { FilterColor } from '@src/components/filters/color';
import { FilterSale } from '@src/components/filters/sale';
import { FilterQuantity } from '@src/components/filters/quantity';
import { FilterPrice } from '@src/components/filters/price';
import { ResetFilters } from '@src/components/filters/resetFilters';
import Main from '@src/components/app/main';
import { FilterKeys, ProductButtonText, WarningMessage } from '@src/types/types';
import { ProductItem } from '@src/components/products/productItem';

export class Filters extends DOMElement {
    public search: FilterSearch;
    public sort: FilterSort;
    public category: FilterCategory;
    public size: FilterSize;
    public color: FilterColor;
    public sale: FilterSale;
    public quantityRange: FilterQuantity;
    public priceRange: FilterPrice;
    public main: Main;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, main: Main) {
        super(parentNode, tagName, className);
        this.main = main;

        this.search = new FilterSearch(this.element, 'div', 'filters__search', this);
        this.sort = new FilterSort(this.element, 'div', 'filters__sort', this);
        new DOMElement(this.element, 'h5', 'filters__title', 'Filter by');
        this.category = new FilterCategory(this.element, 'div', 'filters__category category', this);
        this.size = new FilterSize(this.element, 'div', 'filters__size size', this);
        this.color = new FilterColor(this.element, 'div', 'filters__color color', this);
        this.sale = new FilterSale(this.element, 'div', 'filters__wrapper', this);
        this.quantityRange = new FilterQuantity(this.element, 'div', 'range', this);
        this.priceRange = new FilterPrice(this.element, 'div', 'range', this);
        new ResetFilters(this.element, 'div', 'filters__reset reset', this);
    }

    updateFilters(filterType: FilterKeys, value: string | string[]): void {
        this.main.storage.setFiltersSetting(filterType, value);
        this.main.updateProducts();
    }

    resetFilters(): void {
        this.main.storage.resetFilters();
        this.main.updateProducts();
        this.setDefaultFiltersStyles();
    }

    resetSettings(): void {
        this.main.storage.resetSettings();
        this.main.updateProducts();
        this.setDefaultFiltersStyles();
        this.setDeafultCartStyle();
        this.setDefaultProductButtonStyle();
        this.setDefaultSortStyle();
    }

    setDefaultFiltersStyles(): void {
        this.search.reset();
        this.category.reset();
        this.size.reset();
        this.color.reset();
        this.sale.reset();
        this.quantityRange.reset();
        this.priceRange.reset();
    }

    setDeafultCartStyle(): void {
        this.main.counter.element.innerHTML = this.main.storage.getCartCounter();
    }

    setDefaultProductButtonStyle(): void {
        this.main.data.forEach((item: ProductItem): void => {
            if (item.button.element.classList.contains('item__button--added')) {
                item.button.element.classList.remove('item__button--added');
                item.button.element.innerHTML = ProductButtonText.add;
            }
        });
    }

    setDefaultSortStyle(): void {
        if (this.sort.sortSelect.element instanceof HTMLSelectElement) {
            this.sort.sortSelect.element.selectedIndex = 0;
        }
    }

    showWarningMessage(warningType: number): void {
        document.body.style.overflowY = 'hidden';
        const errorWrapper: DOMElement = new DOMElement(document.body, 'div', 'error');
        const errorMessage: DOMElement = new DOMElement(errorWrapper.element, 'div', 'error__message');

        switch (warningType) {
            case WarningMessage.settings:
                new DOMElement(
                    errorMessage.element,
                    'div',
                    'error__text',
                    'Are you sure you want to reset filters and empty your cart? Changes you made so far will not be saved.'
                );
                break;
            case WarningMessage.filters:
                new DOMElement(
                    errorMessage.element,
                    'div',
                    'error__text',
                    'Are you sure you want to reset filters? Changes you made so far will not be saved.'
                );
                break;
        }
        const buttonWrapper: DOMElement = new DOMElement(errorMessage.element, 'div', 'error__wrapper');

        const errorBtnOk: DOMElement = new DOMElement(
            buttonWrapper.element,
            'button',
            'error__button error__button--yes',
            'Yes'
        );
        const errorBtnNo: DOMElement = new DOMElement(
            buttonWrapper.element,
            'button',
            'error__button error__button--no',
            'No'
        );

        errorBtnOk.element.onclick = (): void => {
            errorWrapper.element.remove();
            document.body.style.overflowY = 'scroll';
            warningType === WarningMessage.settings ? this.resetSettings() : this.resetFilters();
        };

        errorBtnNo.element.onclick = (): void => {
            errorWrapper.element.remove();
            document.body.style.overflowY = 'scroll';
        };
    }
}
