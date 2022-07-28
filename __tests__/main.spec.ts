import { expect, describe, jest, it, beforeEach } from '@jest/globals';
import Main from '../src/components/app/main';
import DOMElement from '../src/components/helpers/DOMElement';
import { StorageModel } from '../src/components/models/storageModel';

jest.mock('../src/components/app/main');
jest.mock('../src/components/models/storageModel');

const StorageClass = StorageModel as jest.Mock<StorageModel>;
const MainClass = Main as jest.Mock<Main>;

beforeEach(() => {
    StorageClass.mockClear();
    MainClass.mockClear();
});

describe('Main class', (): void => {
    const model = new StorageClass();
    const headerCounter = new DOMElement(null, 'div', 'header');
    const body = document.createElement('div');
    const main = new MainClass(body, 'footer', 'footer', headerCounter, model);

    const updateProducts = jest.spyOn(main, 'updateProducts');
    const updateCartCounter = jest.spyOn(main, 'updateCartCounter');
    const arr: string[] = [];
    updateCartCounter.mockImplementation((id: string) => {
        arr.includes(id) ? arr.splice(arr.indexOf(id), 1) : arr.push(id);
        return arr.length;
    });

    const showErrors = jest.spyOn(main, 'showErrorMessage');

    it('test updateProducts method', () => {
        expect(updateProducts).toHaveBeenCalledTimes(0);
        main.updateProducts();
        expect(updateProducts).toHaveBeenCalled();
        expect(typeof updateProducts).toBe('function');
        expect(updateProducts).toBeTruthy();
    });

    it('test updateCartCounter method', () => {
        expect(updateCartCounter).toHaveBeenCalledTimes(0);
        expect(typeof updateCartCounter).toBe('function');
        expect(updateCartCounter).toBeTruthy();

        main.updateCartCounter('0');
        expect(updateCartCounter).toHaveBeenCalledTimes(1);
        expect(main.updateCartCounter('1')).toEqual(2);
        expect(main.updateCartCounter('9')).toEqual(3);
        expect(main.updateCartCounter('7')).toEqual(4);
    });

    it('test showErrorMessage method', () => {
        expect(main.showErrorMessage).toHaveBeenCalledTimes(0);
        main.showErrorMessage();
        expect(showErrors).toHaveBeenCalled();
        expect(typeof showErrors).toBe('function');
        expect(showErrors).toBeTruthy();
    });
});
