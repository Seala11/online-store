import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, FilterSortOptions, IFilterSettings } from '@src/types/types';

class FilterSort extends DOMElement {
    public sortDropdown: DOMElement;
    public sortSelect: DOMElement;
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        new DOMElement(this.element, 'h5', 'filters__title', 'Sort');

        this.sortDropdown = new DOMElement(this.element, 'div', 'filters__select select');
        this.sortSelect = new DOMElement(this.sortDropdown.element, 'select', 'select__list');

        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'A - Z', [
            { key: 'value', value: `${FilterSortOptions.AZ}` },
        ]);
        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'Z - A', [
            { key: 'value', value: `${FilterSortOptions.ZA}` },
        ]);
        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'Price, low to high', [
            { key: 'value', value: `${FilterSortOptions.PriceLowHight}` },
        ]);
        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'Price, high to low', [
            { key: 'value', value: `${FilterSortOptions.PriceHightLow}` },
        ]);
        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'Quantity in stock, min to max', [
            { key: 'value', value: `${FilterSortOptions.QuantityMinMax}` },
        ]);
        new DOMElement(this.sortSelect.element, 'option', 'select__option', 'Quantity in stock, max to min', [
            { key: 'value', value: `${FilterSortOptions.QuantityMaxMin}` },
        ]);

        if (this.sortSelect.element instanceof HTMLSelectElement) {
            const sortInput: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(
                FilterKeys.sortType
            );

            if (sortInput && typeof sortInput === 'number') {
                this.sortSelect.element.selectedIndex = Number(sortInput);
            }
        }

        this.sortSelect.element.onchange = (): void => {
            if (this.sortSelect.element instanceof HTMLSelectElement) {
                const type = this.sortSelect.element.value;
                this.filters.updateFilters(FilterKeys.sortType, type);
            }
        };
    }
}

export default FilterSort;
