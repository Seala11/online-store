import { expect, describe, jest, it, beforeEach } from '@jest/globals';
import Main from '../src/components/app/main';
import { Filters } from '../src/components/filters/filterSection';
import DOMElement from '../src/components/helpers/DOMElement';
import { StorageModel } from '../src/components/models/storageModel';

jest.mock('../src/components/app/main');
jest.mock('../src/components/models/storageModel');
jest.mock('../src/components/filters/filterSection');

const StorageClass = StorageModel as jest.Mock<StorageModel>;
const MainClass = Main as jest.Mock<Main>;
const FiltersClass = Filters as jest.Mock<Filters>;

beforeEach(() => {
    StorageClass.mockClear();
    MainClass.mockClear();
    FiltersClass.mockClear();
});

enum FilterKeys {
    searchValue = 'searchValue',
    sortType = 'sortType',
    plantFamily = 'plantFamily',
    quantityRange = 'quantityRange',
    priceRange = 'priceRange',
    color = 'color',
    size = 'size',
    sale = 'sale',
}

describe('Filter class', (): void => {
    const model = new StorageClass();
    const headerCounter = new DOMElement(null, 'div', 'header');
    const body = document.createElement('div');
    const main = new MainClass(body, 'footer', 'footer', headerCounter, model);
    const filterSection = new FiltersClass(main, 'section', 'main__filters filters', main);

    const updateFilters = jest.spyOn(filterSection, 'updateFilters');
    const resetFilters = jest.spyOn(filterSection, 'resetFilters');
    const resetSettings = jest.spyOn(filterSection, 'resetSettings');
    const setDefaultFiltersStyles = jest.spyOn(filterSection, 'setDefaultFiltersStyles');
    const setDeafultCartStyle = jest.spyOn(filterSection, 'setDeafultCartStyle');
    const setDefaultProductButtonStyle = jest.spyOn(filterSection, 'setDefaultProductButtonStyle');
    const setDefaultSortStyle = jest.spyOn(filterSection, 'setDefaultSortStyle');
    const showWarningMessage = jest.spyOn(filterSection, 'showWarningMessage');
    showWarningMessage.mockImplementation((warningType = 0 | 1): boolean => {
        return !!warningType;
    });

    it('test updateFilters method', () => {
        expect(updateFilters).toHaveBeenCalledTimes(0);
        filterSection.updateFilters(FilterKeys.searchValue, 'here');
        expect(updateFilters).toHaveBeenCalledTimes(1);
        expect(typeof updateFilters).toBe('function');
        expect(updateFilters).toBeTruthy();
    });

    it('test resetFilters method', () => {
        expect(resetFilters).toHaveBeenCalledTimes(0);
        filterSection.resetFilters();
        expect(resetFilters).toHaveBeenCalledTimes(1);
        expect(typeof resetFilters).toBe('function');
        expect(resetFilters).toBeTruthy();
    });

    it('test resetSettings method', () => {
        expect(resetSettings).toHaveBeenCalledTimes(0);
        filterSection.resetSettings();
        expect(typeof resetSettings).toBe('function');
        expect(resetSettings).toBeTruthy();
    });

    it('test setDefaultFiltersStyles method', () => {
        expect(setDefaultFiltersStyles).toHaveBeenCalledTimes(0);
        filterSection.setDefaultFiltersStyles();
        expect(setDefaultFiltersStyles).toHaveBeenCalledTimes(1);
        expect(typeof setDefaultFiltersStyles).toBe('function');
        expect(setDefaultFiltersStyles).toBeTruthy();
    });

    it('test setDeafultCartStyle method', () => {
        expect(setDeafultCartStyle).toHaveBeenCalledTimes(0);
        filterSection.setDeafultCartStyle();
        expect(setDeafultCartStyle).toHaveBeenCalledTimes(1);
        expect(typeof setDeafultCartStyle).toBe('function');
        expect(setDeafultCartStyle).toBeTruthy();
    });

    it('test setDefaultProductButtonStyle method', () => {
        expect(setDefaultProductButtonStyle).toHaveBeenCalledTimes(0);
        filterSection.setDefaultProductButtonStyle();
        expect(setDefaultProductButtonStyle).toHaveBeenCalledTimes(1);
        expect(typeof setDefaultProductButtonStyle).toBe('function');
        expect(setDefaultProductButtonStyle).toBeTruthy();
    });

    it('test setDefaultSortStyle method', () => {
        expect(setDefaultSortStyle).toHaveBeenCalledTimes(0);
        filterSection.setDefaultSortStyle();
        expect(setDefaultSortStyle).toHaveBeenCalledTimes(1);
        expect(typeof setDefaultSortStyle).toBe('function');
        expect(setDefaultSortStyle).toBeTruthy();
    });

    it('test showWarningMessage method', () => {
        expect(filterSection.showWarningMessage(0)).toEqual(false);
        expect(filterSection.showWarningMessage(1)).toEqual(true);
    });
});
