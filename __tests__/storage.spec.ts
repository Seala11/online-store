import { expect, describe, jest, it } from '@jest/globals';
import { StorageModel } from '../src/components/models/storageModel';

jest.mock('../src/components/models/storageModel');
const StorageClass = StorageModel as jest.Mock<StorageModel>;

beforeEach(() => {
    StorageClass.mockClear();
});

describe('StorageModel', (): void => {
    const model = new StorageClass();

    jest.spyOn(model, 'resetFilters');

    const resetSettings = jest.spyOn(model, 'resetSettings');
    resetSettings.mockImplementation(() => null);

    const getCounter = jest.spyOn(model, 'getCartCounter');
    getCounter.mockImplementation(() => '0');

    const setCounter = jest.spyOn(model, 'setCartCounter');
    setCounter.mockImplementation((option = 0 | 1, value = 1) => {
        const currVal = Number(model.getCartCounter()) || 0;
        if (value && typeof value === 'number') return option === 0 ? currVal + value : currVal - value;
    });

    const defaultFilters = {
        plantFamily: [],
        quantityRange: [1, 10],
        priceRange: [10, 100],
        color: [],
        size: [],
        sale: false,
        sortType: 0,
        cart: [],
        searchValue: '',
    };

    const getFilters = jest.spyOn(model, 'getFiltersStorage');
    getFilters.mockImplementation(() => {
        return defaultFilters;
    });

    it('test resetFilters method', () => {
        model.resetFilters();
        model.resetFilters();
        expect(model.resetFilters).toBeCalledTimes(2);
        expect(typeof model.resetFilters).toBe('function');
        expect(getCounter).toBeTruthy();
    });

    it('test resetSettings method', () => {
        model.resetSettings();
        expect(model.resetSettings).toHaveBeenCalled();
        expect(typeof model.resetSettings).toBe('function');
        expect(getCounter).toBeTruthy();
    });

    it('test getCartCounter method', () => {
        model.getCartCounter();
        expect(getCounter.mock.calls.length).toBe(1);
        expect(model.getCartCounter).toHaveBeenCalledTimes(1);
        expect(typeof model.getCartCounter).toBe('function');
        expect(getCounter).toBeTruthy();
    });

    it('test getCartCounter method value', () => {
        expect(model.getCartCounter()).toBe('0');
        expect(model.getCartCounter()).toEqual('0');
        getCounter.mockReturnValueOnce('20');
        expect(model.getCartCounter()).toBe('20');
    });

    it('test setCartCounter method value', () => {
        expect(model.setCartCounter(0)).toEqual(1);
        expect(model.setCartCounter(1)).toEqual(-1);
    });

    it('test getFiltersStorage method', () => {
        model.getFiltersStorage();
        expect(getFilters.mock.calls.length).toBe(1);
        expect(model.getFiltersStorage).toHaveBeenCalledTimes(1);
        expect(typeof model.getFiltersStorage).toBe('function');
        expect(getFilters).toBeTruthy();
    });

    it('test getFiltersStorage value', () => {
        expect(model.getFiltersStorage()).toEqual(defaultFilters);
    });
});
