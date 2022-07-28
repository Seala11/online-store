import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, FilterCategoryButton, IFilterSettings } from '@src/types/types';

export class FilterCategory extends DOMElement {
    public categoryTitle: DOMElement;
    public categoryList: DOMElement;
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        this.categoryTitle = new DOMElement(this.element, 'h5', 'filters__subtitle', 'Category:');
        this.categoryList = new DOMElement(this.element, 'ul', 'list');

        const buttonClasses = (category: string): string =>
            `list__item ${this.existInStorage(category) ? 'list__item--active' : ''}`;

        new DOMElement(
            this.categoryList.element,
            'button',
            `${buttonClasses(FilterCategoryButton.aglaonema)}`,
            FilterCategoryButton.aglaonema
        );
        new DOMElement(
            this.categoryList.element,
            'button',
            `${buttonClasses(FilterCategoryButton.calathea)}`,
            FilterCategoryButton.calathea
        );
        new DOMElement(
            this.categoryList.element,
            'button',
            `${buttonClasses(FilterCategoryButton.pothos)}`,
            FilterCategoryButton.pothos
        );
        new DOMElement(
            this.categoryList.element,
            'button',
            `${buttonClasses(FilterCategoryButton.monstera)}`,
            FilterCategoryButton.monstera
        );
        new DOMElement(
            this.categoryList.element,
            'button',
            `${buttonClasses(FilterCategoryButton.philodendron)}`,
            FilterCategoryButton.philodendron
        );

        this.categoryList.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLButtonElement) {
                button.onclick = (): void => {
                    const categoryIsChosen: boolean | undefined = this.existInStorage(button.innerHTML);
                    if (categoryIsChosen) {
                        button.classList.remove('list__item--active');
                    } else {
                        button.classList.add('list__item--active');
                    }
                    this.filters.updateFilters(FilterKeys.plantFamily, button.innerHTML.toLowerCase());
                };
            }
        });
    }

    existInStorage(category: string): boolean | undefined {
        const storedCategories: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(
            FilterKeys.plantFamily
        );
        if (storedCategories && Array.isArray(storedCategories)) {
            return [...storedCategories].includes(category.toLowerCase());
        }
    }

    reset(): void {
        this.categoryList.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLElement) {
                button.classList.remove('list__item--active');
            }
        });
    }
}
