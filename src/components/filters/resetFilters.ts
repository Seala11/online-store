import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { WarningMessage } from '@src/types/types';

export class ResetFilters extends DOMElement {
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        const resetFiltersButton = new DOMElement(this.element, 'button', 'reset__button', 'Reset Filters');

        resetFiltersButton.element.onclick = (): void => {
            this.filters.showWarningMessage(WarningMessage.filters);
        };

        const resetSettingsButtom = new DOMElement(this.element, 'button', 'reset__button', 'Reset Settings');

        resetSettingsButtom.element.onclick = (): void => {
            this.filters.showWarningMessage(WarningMessage.settings);
        };
    }
}
