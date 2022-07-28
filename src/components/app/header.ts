import DOMElement from '@src/components/helpers/DOMElement';
import { StorageModel } from '@src/components/models/storageModel';

class Header extends DOMElement {
    public cartCounter: DOMElement;
    public storage: StorageModel;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string, storage: StorageModel) {
        super(parentNode, tagName, className);
        this.storage = storage;
        new DOMElement(this.element, 'h1', 'header__title', 'Plants Store');
        const cartWrapper = new DOMElement(this.element, 'div', 'header__trolley');

        const counterValue = this.storage.getCartCounter();
        this.cartCounter = new DOMElement(cartWrapper.element, 'span', 'header__counter', `${counterValue}`);
    }
}

export default Header;
