// import { addItemToCart } from "./Cart/addToCart";

export function getAllElements(selector)
{
    const list = document.querySelectorAll(selector);

    if(!list)
    {
        throw new Error(`The element(s): (${selector} where not found in the DOM`);
    }

    return list;
}


export function setLocalStorage(name, item)
{
    localStorage.setItem(name, JSON.stringify(item));
}


export function getStorageItem(itemName)
{
    const storageItem = localStorage.getItem(itemName);

    if(!storageItem)
    {
        return [];
    }

    return JSON.parse(storageItem);
}


export function formatPrice(price)
{
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price.toFixed(2));
}


export function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error("Unable to find");
    }

    return element;
}


export function checkStore()
{
    const storageItem = localStorage.getItem('store');

    if(!storageItem)
    {
        return false;
    }

    const store = JSON.parse(storageItem);

    return true;

}
