import { getElement, getList, displayFilter, removerFilter, showDropdownMenu, displayHomeImages, displaySolutionSection} from "./functions.js";



const toggleBtn = getElement('.toggle-btn');
//const solutions =  getList('.solution-div');


displayHomeImages('Steve', 'Thomas');


toggleBtn.addEventListener('click', (e) =>
{
    e.preventDefault();
    showDropdownMenu(e);
})



displaySolutionSection();








