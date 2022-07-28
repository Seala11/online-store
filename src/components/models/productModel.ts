import { IProduct } from '@src/types/types';
import Main from '@src/components/app/main';
import { ProductItem } from '@src/components/products/productItem';

export class ProductModel {
    public data: ProductItem[];
    public main: Main;

    constructor(main: Main) {
        this.data = [];
        this.main = main;
    }

    public async showProducts(): Promise<void> {
        this.makeRequest().then((response: IProduct[]): void => {
            response.forEach((product: IProduct): void => {
                const newItem = new ProductItem(null, 'div', 'products__item', '', product, this);
                this.data.push(newItem);
            });
            this.main.updateProducts();
        });
    }

    private async makeRequest(): Promise<IProduct[]> {
        let info!: IProduct[];
        await import('@src/data/productData.json').then(({ default: productInfo }): void => {
            info = productInfo;
        });
        return info;
    }
}
