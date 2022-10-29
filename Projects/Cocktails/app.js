import { displayDrinks, toggleLoading, getElement} from "./utils/functions.js";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
const mainContainer = '.drinks';
const form = getElement('.search-form');



window.addEventListener("DOMContentLoaded", () =>
{
    displayDrinks(URL, mainContainer); 
    toggleLoading();
});


form.addEventListener('keyup', (e) => 
{
    const value = e.target.value;
    console.log(value);

    if(value.length === 0)
    {
        displayDrinks(URL, mainContainer);
    }

    else
    {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
        displayDrinks(url, mainContainer);
    }
});




