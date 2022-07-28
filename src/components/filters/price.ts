import DOMElement from '@src/components/helpers/DOMElement';
import * as noUiSlider from 'nouislider';
import { Filters } from '@src/components/filters/filterSection';
import { FilterKeys, IFilterSettings } from '@src/types/types';

export class FilterPrice extends DOMElement {
    public filters: Filters;
    public slider: DOMElement;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, filters: Filters) {
        super(parentNode, tagName, className);
        this.filters = filters;

        new DOMElement(this.element, 'div', 'filters__subtitle', 'Price:');
        this.slider = new DOMElement(this.element, 'div', 'range');
        const sliderWr = new DOMElement(this.element, 'div', 'range__wrapper');
        const valueMin = new DOMElement(sliderWr.element, 'div', 'range__input', '1');
        const valueMax = new DOMElement(sliderWr.element, 'div', 'range__input', '10');
        const inputs = [valueMin.element, valueMax.element];

        noUiSlider
            .create(this.slider.element, {
                start: [10, 100],
                connect: true,
                step: 1,
                range: {
                    min: 10,
                    max: 100,
                },
            })
            .on('change', (values: (string | number)[]): void => {
                const val = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
                this.filters.updateFilters(FilterKeys.priceRange, val);
            });

        (this.slider.element as noUiSlider.target).noUiSlider?.on(
            'update',
            (values: (string | number)[], handle: number): void => {
                const val = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
                inputs[handle].innerHTML = val[handle];
            }
        );

        const storedSettings: IFilterSettings[FilterKeys] = this.filters.main.storage.getFiltersSetting(
            FilterKeys.priceRange
        );
        if (storedSettings && Array.isArray(storedSettings)) {
            (this.slider.element as noUiSlider.target).noUiSlider?.set(storedSettings);
        }
    }

    reset(): void {
        (this.slider.element as noUiSlider.target).noUiSlider?.reset();
    }
}
