import Header from '@src/components/app/header';
import Footer from '@src/components/app/footer';
import Main from '@src/components/app/main';
import DOMElement from '@src/components/helpers/DOMElement';
import { StorageModel } from '@src/components/models/storageModel';

class App extends DOMElement {
    main: DOMElement;
    footer: DOMElement;
    storage: StorageModel;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'content');
        this.storage = new StorageModel();
        const header = new Header(this.element, 'header', 'header', this.storage);
        this.main = new Main(this.element, 'main', 'main', header.cartCounter, this.storage);
        this.footer = new Footer(this.element, 'footer', 'footer');
    }
}

export default App;
