import DOMElement from '@src/components/helpers/DOMElement';
import { FilterKeys, IFilterSettings } from '@src/types/types';
import { Filters } from '@src/components/filters/filterSection';

export class FilterSearch extends DOMElement {
    private searchElement: DOMElement;
    private searchWrapper: DOMElement;
    private clearInputBtn: DOMElement;
    public filters: Filters;

    constructor(
        parentNode: HTMLElement | null,
        tagName = 'div',
        className = 'filters__search search',
        filters: Filters
    ) {
        super(parentNode, tagName, className);
        this.filters = filters;

        new DOMElement(this.element, 'h5', 'filters__title', 'Search');
        this.searchWrapper = new DOMElement(this.element, 'div', 'search__wrapper');
        this.searchElement = new DOMElement(this.searchWrapper.element, 'input', 'search__input', '', [
            { key: 'type', value: 'text' },
            { key: 'placeholder', value: 'Plant name' },
            { key: 'id', value: 'filterInput' },
            { key: 'autocomplete', value: 'off' },
        ]);
        this.clearInputBtn = new DOMElement(null, 'button', 'search__input--clear');

        if (this.searchElement.element instanceof HTMLInputElement) {
            this.searchElement.element.focus();
            const userInput: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(
                FilterKeys.searchValue
            );
            if (userInput && typeof userInput === 'string') {
                this.searchElement.element.value = userInput;
                this.showClearBtn();
            } else {
                this.removeClearBtn();
            }
        }

        this.searchElement.element.onkeyup = (): void => {
            if (this.searchElement.element instanceof HTMLInputElement) {
                const userInput: string = this.searchElement.element.value.toLowerCase();
                this.filters.updateFilters(FilterKeys.searchValue, userInput);

                userInput ? this.showClearBtn() : this.removeClearBtn();
            }
        };

        this.clearInputBtn.element.onclick = (): void => {
            if (
                this.clearInputBtn.element instanceof HTMLButtonElement &&
                this.searchElement.element instanceof HTMLInputElement
            ) {
                this.searchElement.element.value = '';
                this.filters.updateFilters(FilterKeys.searchValue, '');
                this.removeClearBtn();
            }
        };
    }

    reset(): void {
        if (this.searchElement.element instanceof HTMLInputElement) {
            this.searchElement.element.value = '';
        }
        this.removeClearBtn();
    }

    removeClearBtn(): void {
        this.searchElement.element.classList.add('search__input--search');
        this.clearInputBtn.element.remove();
    }

    showClearBtn(): void {
        this.searchElement.element.classList.remove('search__input--search');
        this.searchWrapper.element.append(this.clearInputBtn.element);
    }
}
