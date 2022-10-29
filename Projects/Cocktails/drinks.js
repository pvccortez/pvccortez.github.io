import { toggleLoading, displaySingleDrink } from "./utils/functions.js";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const drinkName = queryParams.get('name');

window.addEventListener("DOMContentLoaded", () =>
{
    let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    toggleLoading();
    displaySingleDrink(url, '.main-section');
});