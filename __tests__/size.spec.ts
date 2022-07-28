import { expect, describe, jest, it, beforeEach } from '@jest/globals';
import { Filters } from '../src/components/filters/filterSection';
import FilterSize from '../src/components/filters/size';
import Main from '../src/components/app/main';
import DOMElement from '../src/components/helpers/DOMElement';
import { StorageModel } from '../src/components/models/storageModel';

jest.mock('../src/components/app/main');
jest.mock('../src/components/models/storageModel');
jest.mock('../src/components/filters/filterSection');
jest.mock('../src/components/filters/size');

const StorageClass = StorageModel as jest.Mock<StorageModel>;
const MainClass = Main as jest.Mock<Main>;
const SizeClass = FilterSize as jest.Mock<FilterSize>;
const FiltersClass = Filters as jest.Mock<Filters>;

beforeEach(() => {
    SizeClass.mockClear();
    FiltersClass.mockClear();
    MainClass.mockClear();
    StorageClass.mockClear();
});

describe('Filter class', (): void => {
    const model = new StorageClass();
    const headerCounter = new DOMElement(null, 'div', 'header');
    const body = document.createElement('div');
    const main = new MainClass(body, 'footer', 'footer', headerCounter, model);
    const filterSection = new FiltersClass(main, 'section', 'main__filters filters', main);
    const sizeFilter = new SizeClass(filterSection.element, 'div', 'filters__size size', filterSection);

    const existInStorage = jest.spyOn(sizeFilter, 'existInStorage');
    const sizes = ['m', 's'];
    existInStorage.mockImplementation((size: string): boolean | undefined => {
        if (sizes && size) return sizes.includes(size);
        return undefined;
    });

    const reset = jest.spyOn(sizeFilter, 'reset');

    it('test existInStorage method', () => {
        sizeFilter.existInStorage('s');
        expect(sizeFilter.existInStorage('s')).toEqual(true);
        expect(sizeFilter.existInStorage('')).toEqual(undefined);
        expect(sizeFilter.existInStorage('l')).toEqual(false);
        expect(sizeFilter.existInStorage).toBeCalledTimes(4);
    });

    it('test reset method', () => {
        expect(reset).toHaveBeenCalledTimes(0);
        sizeFilter.reset();
        expect(reset).toHaveBeenCalledTimes(1);
        expect(typeof reset).toBe('function');
        expect(reset).toBeTruthy();
    });
});
