import DOMElement from '@src/components/helpers/DOMElement';

class Footer extends DOMElement {
    public wrapper: DOMElement;
    public footerGit: DOMElement;
    public span: DOMElement;
    public footerRSS: DOMElement;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string) {
        super(parentNode, tagName, className);
        this.wrapper = new DOMElement(this.element, 'div', 'footer__wrapper');
        this.footerGit = new DOMElement(this.wrapper.element, 'a', 'footer__link footer__link--git', ' Seala11', [
            { key: 'href', value: 'https://github.com/Seala11' },
            { key: 'target', value: '_blank' },
        ]);
        this.span = new DOMElement(this.wrapper.element, 'span', 'footer__date', ', 2022');
        this.footerRSS = new DOMElement(this.element, 'a', 'footer__link footer__link--rss', '', [
            { key: 'href', value: 'https://rs.school/js/' },
            { key: 'target', value: '_blank' },
        ]);
    }
}

export default Footer;
