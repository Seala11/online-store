import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, FilterSizeButtons, IFilterSettings } from '@src/types/types';

class FilterSize extends DOMElement {
    public sizeTitle: DOMElement;
    public sizeWrapper: DOMElement;
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        this.sizeTitle = new DOMElement(this.element, 'h5', 'filters__subtitle', 'Size:');
        this.sizeWrapper = new DOMElement(this.element, 'div', 'list');

        const buttonClasses = (size: string): string =>
            `list__item ${this.existInStorage(size) ? 'list__item--active' : ''}`;

        new DOMElement(this.sizeWrapper.element, 'button', `${buttonClasses(FilterSizeButtons.s)}`, 'Small', [
            { key: 'value', value: FilterSizeButtons.s },
        ]);
        new DOMElement(this.sizeWrapper.element, 'button', `${buttonClasses(FilterSizeButtons.m)}`, 'Medium', [
            { key: 'value', value: FilterSizeButtons.m },
        ]);
        new DOMElement(this.sizeWrapper.element, 'button', `${buttonClasses(FilterSizeButtons.l)}`, 'Large', [
            { key: 'value', value: FilterSizeButtons.l },
        ]);

        this.sizeWrapper.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLButtonElement) {
                button.onclick = (): void => {
                    const sizeIsChosen: boolean | undefined = this.existInStorage(button.value);
                    if (sizeIsChosen) {
                        button.classList.remove('list__item--active');
                    } else {
                        button.classList.add('list__item--active');
                    }
                    this.filters.updateFilters(FilterKeys.size, button.value.toLowerCase());
                };
            }
        });
    }

    existInStorage(size: string): boolean | undefined {
        const storedSizes: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(FilterKeys.size);
        if (storedSizes && Array.isArray(storedSizes)) {
            return [...storedSizes].includes(size.toLowerCase());
        }
    }

    reset(): void {
        this.sizeWrapper.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLElement) {
                button.classList.remove('list__item--active');
            }
        });
    }
}

export default FilterSize;
