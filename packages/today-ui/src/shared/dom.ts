export const getAttach = (node: any): HTMLElement => {
    const attachNode = typeof node === 'function' ? node() : node;
    if (!attachNode) {
        return document.body;
    }
    if (isString(attachNode)) {
        return document.querySelector(attachNode);
    }
    if (attachNode instanceof HTMLElement) {
        return attachNode;
    }
    return document.body;
};


export const isString = (input: any) => {
    return (typeof input == 'string');
}
