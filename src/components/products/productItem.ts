import DOMElement from '@src/components/helpers/DOMElement';
import { IProduct, ProductButtonText } from '@src/types/types';
import { ProductModel } from '@src/components/models/productModel';

export class ProductItem extends DOMElement {
    public num: number;
    public name: string;
    public price: number;
    public category: string;
    public size: string;
    public color: string;
    public sale: boolean;
    public quantity: number;
    public model: ProductModel;
    public button: DOMElement;

    constructor(
        parentNode: HTMLElement | null,
        tagName: string,
        className: string,
        content: string,
        product: IProduct,
        prModel: ProductModel
    ) {
        super(parentNode, tagName, className, content);

        this.num = product.num;
        this.name = product.name;
        this.price = product.price;
        this.category = product.plantFamily;
        this.size = product.size;
        this.color = product.color;
        this.sale = product.sale;
        this.quantity = product.quantity;
        this.model = prModel;

        const img = new DOMElement(this.element, 'div', 'item__img');
        if (img.element instanceof HTMLDivElement) {
            img.element.style.backgroundImage = `url(${product.img})`;

            if (product.sale) {
                new DOMElement(img.element, 'div', 'item__img--sale');
            }
        }

        new DOMElement(this.element, 'p', 'item__desc item__name', product.name);
        new DOMElement(this.element, 'p', 'item__desc item__price', `Price: ${product.price}$`);
        new DOMElement(this.element, 'p', 'item__desc item__size', `Size: ${product.size}`);
        new DOMElement(this.element, 'p', 'item__desc item__color', `Color: ${product.color}`);
        new DOMElement(this.element, 'p', 'item__desc item__quantity', `Stock: ${product.quantity}`);

        const productAdded: boolean = this.checkProductInCart(this.num);
        const buttonText = productAdded ? ProductButtonText.remove : ProductButtonText.add;
        this.button = new DOMElement(
            this.element,
            'button',
            `item__button ${productAdded ? 'item__button--added' : ''}`,
            `${buttonText}`
        );
        this.button.element.onclick = (): void => {
            const productsList: string[] = this.model.main.storage.getCartProducts();
            const productAdded: boolean = productsList.includes(this.num.toString());

            if (!productAdded) {
                const cartIsFull: boolean = productsList.length >= 20;
                if (cartIsFull) {
                    this.model.main.showErrorMessage();
                    return;
                }

                this.button.element.classList.add('item__button--added');
                this.button.element.innerHTML = ProductButtonText.remove;
            } else {
                this.button.element.classList.remove('item__button--added');
                this.button.element.innerHTML = ProductButtonText.add;
            }
            this.model.main.updateCartCounter(product.num.toString());
        };
    }

    checkProductInCart(id: number): boolean {
        const productsList = this.model.main.storage.getCartProducts();
        return productsList.includes(id.toString());
    }
}
