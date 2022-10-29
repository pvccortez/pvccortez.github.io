import { displayResults, getElement } from "./function.js";

const submitBtn = getElement('.submit-btn');
const inputField = getElement('.input');



submitBtn.addEventListener('click', e =>
{
    e.preventDefault();

    displayResults(inputField.value);

});