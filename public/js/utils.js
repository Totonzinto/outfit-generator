export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// Function to render a list of objects using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(templateFn);
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}