import { TDOMElementAttributes } from '@src/types/types';

class DOMElement {
    public element: HTMLElement;

    constructor(
        parentElement: HTMLElement | null,
        tagName: string,
        className: string,
        text?: string,
        attributes?: TDOMElementAttributes[]
    ) {
        let element;
        try {
            element = document.createElement(tagName);
        } catch (err) {
            throw new Error('Element tag name required');
        }

        if (className && typeof className === 'string') element.className = className;

        if (text && typeof text === 'string') element.textContent = text;

        if (attributes && Array.isArray(attributes)) {
            for (let i = 0; i < attributes.length; i++) {
                element.setAttribute(attributes[i].key, attributes[i].value);
            }
        }

        if (parentElement && parentElement instanceof HTMLElement) {
            parentElement.append(element);
        }

        this.element = element;
    }
}

export default DOMElement;
