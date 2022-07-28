import DOMElement from '@src/components/helpers/DOMElement';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, FilterColorButtons, IFilterSettings } from '@src/types/types';

export class FilterColor extends DOMElement {
    public colorTitle: DOMElement;
    public colorWrapper: DOMElement;
    public filters: Filters;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        this.colorTitle = new DOMElement(this.element, 'h5', 'filters__subtitle', 'Pot Color:');
        this.colorWrapper = new DOMElement(this.element, 'div', 'color__wrapper');

        const buttonClasses = (color: string): string => {
            const colorExist = this.existInStorage(color);
            if (colorExist) {
                if (color == FilterColorButtons.black) {
                    return `color__item color__item--active-black`;
                } else {
                    return `color__item color__item--active`;
                }
            }
            return `color__item`;
        };

        new DOMElement(
            this.colorWrapper.element,
            'button',
            `${buttonClasses(FilterColorButtons.black)} color__item--black`,
            '',
            [
                {
                    key: 'value',
                    value: FilterColorButtons.black,
                },
            ]
        );
        new DOMElement(
            this.colorWrapper.element,
            'button',
            `${buttonClasses(FilterColorButtons.white)} color__item--white`,
            '',
            [
                {
                    key: 'value',
                    value: FilterColorButtons.white,
                },
            ]
        );
        new DOMElement(
            this.colorWrapper.element,
            'button',
            `${buttonClasses(FilterColorButtons.pink)} color__item--pink`,
            '',
            [
                {
                    key: 'value',
                    value: FilterColorButtons.pink,
                },
            ]
        );

        this.colorWrapper.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLButtonElement) {
                button.onclick = (): void => {
                    const colorIsChosen: boolean | undefined = this.existInStorage(button.value);
                    if (colorIsChosen) {
                        button.value === FilterColorButtons.black
                            ? button.classList.remove('color__item--active-black')
                            : button.classList.remove('color__item--active');
                    } else {
                        button.value === FilterColorButtons.black
                            ? button.classList.add('color__item--active-black')
                            : button.classList.add('color__item--active');
                    }
                    this.filters.updateFilters(FilterKeys.color, button.value.toLowerCase());
                };
            }
        });
    }

    existInStorage(color: string): boolean | undefined {
        const storedColors: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(FilterKeys.color);
        if (storedColors && Array.isArray(storedColors)) {
            return [...storedColors].includes(color.toLowerCase());
        }
    }

    reset(): void {
        this.colorWrapper.element.childNodes.forEach((button: ChildNode): void => {
            if (button instanceof HTMLElement) {
                button.classList.remove('color__item--active');
                button.classList.remove('color__item--active-black');
            }
        });
    }
}
