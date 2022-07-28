import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, IFilterSettings } from '@src/types/types';

export class FilterSale extends DOMElement {
    public saleCheckbox: DOMElement;
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        new DOMElement(this.element, 'h5', 'filters__subtitle', 'Sale:');
        const saleWrapper = new DOMElement(this.element, 'div', 'filters__sale sale');

        const label = new DOMElement(saleWrapper.element, 'label', 'sale__label', '', [
            { key: 'for', value: 'checkbox' },
        ]);
        this.saleCheckbox = new DOMElement(label.element, 'input', 'sale__input', '', [
            { key: 'type', value: 'checkbox' },
            { key: 'id', value: 'checkbox' },
        ]);
        new DOMElement(label.element, 'span', 'sale__checkmark');

        if (this.saleCheckbox.element instanceof HTMLInputElement) {
            const saleIsChosen: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(
                FilterKeys.sale
            );
            if (saleIsChosen && typeof saleIsChosen === 'boolean') {
                this.saleCheckbox.element.checked = true;
            }
        }

        this.saleCheckbox.element.onchange = (): void => {
            if (this.saleCheckbox.element instanceof HTMLInputElement) {
                const checked = this.saleCheckbox.element.checked;
                this.filters.updateFilters(FilterKeys.sale, `${checked}`);
            }
        };
    }

    reset(): void {
        if (this.saleCheckbox.element instanceof HTMLInputElement) {
            this.saleCheckbox.element.checked = false;
        }
    }
}
