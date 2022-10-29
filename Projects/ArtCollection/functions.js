import { artistArray } from "./data.js";
import { solnArray } from "./data.js";

export function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error(`The Element "${selector}" Was Not Found in the DOM`);
    }

    return element;
}


export function getList(selector)
{
    const list = document.querySelectorAll(selector);

    if(list.length === 0)
    {
        throw new Error(`No Such Element(s) of "${selector}" were Found in the DOM`);
    }

    return [...list];
}


export function displayFilter(image)
{
    const filter = image.querySelector('.filter-div');
    filter.style.zIndex = '2';
}


export function displaySolutionSection()
{
    const solutionContainer = getElement('.solutions-center');
    const htmlStr = solnArray.map(soln =>
        {
            return `
                    <div class="solution-div" data-id="${soln.id}">
                        <p id='soln-p'>
                            ${soln.info}
                        </p>

                        <div class="soln-img-wrapper">
                            <img src="${soln.editedImg}" alt="TBD" >

                            <div class="soln-filter">
                                <p>
                                    ${soln.filterTxt}
                                </p>
                            </div>
                        </div>

                    </div>`;
        }).join("");

    solutionContainer.innerHTML = htmlStr;



    const solutions =  getList('.solution-div');
    solutions.forEach(soln => 
    {
        soln.addEventListener('mouseover', e =>
        {
            const filter = e.currentTarget.querySelector('.soln-filter')
            const img = e.currentTarget.querySelector('img');
            const id = e.currentTarget.dataset.id;

            filter.classList.add('show-filter');
            img.src = solnArray[id].orgImg;
        });

        soln.addEventListener('mouseout', e =>
        {
            const filter = e.currentTarget.querySelector('.soln-filter');
            const img = e.currentTarget.querySelector('img');
            const id = e.currentTarget.dataset.id;

            filter.classList.remove('show-filter');
            img.src = solnArray[id].editedImg;
        });
    });
}


export function removerFilter(image)
{
    const filter = image.querySelector('.filter-div');
    filter.style.zIndex = '-1';
}

 
export function showDropdownMenu(e)
{
    const dropDown = getElement('.links-dropdown');
    dropDown.classList.toggle('show-links');
}


export function displayHomeImages(firstName, lastName)
{
    const artistName = `${firstName}_${lastName}`;
    const artArray = artistArray.find(artist => artistName);
    const imgContainer = getElement('.img-container');
    const length = artArray.length > 4? 4: artArray.length;
    let str = "";
    
    for(let i = 0; i < length; i++)
    {
        str = str.concat("", `<div class="img-wrapper" >
                                    <img src="./images/${artArray[i].imgSrc}" alt="">
                                    
                                    <a href="./steve.html?firstName=Steve&lastName=Thomas" target="_blank">
                                        <div class="filter-div">
                                            <p>
                                                ${artArray[i].title}
                                            </p>
                                        </div>
                                    </a>
                                    
                                </div>`);
    }

    imgContainer.innerHTML = str;


    const headerLinks = getList('.header a');
    const images =  getList('.img-wrapper');

    headerLinks.forEach(link =>
        {
            link.addEventListener('click', e =>
            {
                e.preventDefault();
                const target =  e.target.dataset.id;
                const link = getElement(target)

                const rect = link.getBoundingClientRect();
                const top = rect.top;
                
                window.scrollTo({left: 0, top: top})
                
            });
        })

    images.forEach(img =>
        {
            img.addEventListener('mouseover', (e) =>
            {
                
                displayFilter(e.currentTarget)
            });

            img.addEventListener('mouseout', e =>
            {
                removerFilter(e.currentTarget);
            });
        });
}


export function displayImages(imgArray)
{
    const container = getElement('.main-body');
    let ctr = 0;

    const imgsStr = imgArray.map(img => 
        {
            const str = 
            `
                <div class="img-container" data-id=${ctr++}>
                    <div class="img-wrapper">
                        <img src="./images/${img.imgSrc}" alt="">
                        
                    </div>

                    <p>${img.title}</p>

                    <div class="filter-div">
                        <p>${img.title}</p>
                    </div>
                </div>
            `;

            return str;
        }).join('');

    container.innerHTML = imgsStr;

    const images = getList('.img-container');

    images.forEach(img =>
        {
            img.addEventListener('mouseover', e =>
            {
                displayFilter(e.currentTarget);
    
                const title = e.currentTarget.querySelector('p');
                title.style.color = 'white';
    
                
            });
    
            img.addEventListener('mouseout', e =>
            {
                removerFilter(e.currentTarget);
    
                const title = e.currentTarget.querySelector('p');
                title.style.color = 'black';
            });

            img.addEventListener('click', (e) =>
            {
                console.log(imgArray);
                openModal(e.target, imgArray)
            });
        })
}


function openModal(item, imgArray)
{
    const modal = getElement('.modal');
    
    const index = item.parentElement.dataset.id;
    console.log(imgArray[index]);
    
    // Get html string for dropdown meny
    const sizesStr = getSizeAvailibility(imgArray[index].type, imgArray[index].availibility);
  
    

    // Set the inner HTML for the modal string
    modal.classList.add('show');
    modal.innerHTML= getModalHTML(imgArray[index], sizesStr);



    // Get and set the eventlistener for the close button
    const closeBtn = getElement('.close-btn');
    closeBtn.addEventListener('click', () =>
    {
        modal.classList.remove('show');
    });



    // Get and set the eventlistener for the dropdown menu
    const dropdownDisplay = getElement('.dropdown');
    const dropDownMenu = getElement('.dropdown-container ul');
    dropdownDisplay.addEventListener('click', () =>
    {
        const open = dropDownMenu.classList.contains('show-menu');
        const arrow = getElement('.dropdown i');

        if(!open)
        {
            dropDownMenu.classList.add('show-menu');
            arrow.classList.remove('fa-chevron-down')
            arrow.classList.add('fa-chevron-up');
        }

        else
        {
            dropDownMenu.classList.remove('show-menu');
            arrow.classList.remove('fa-chevron-up');
            arrow.classList.add('fa-chevron-down');
        }
    });

}


function getSizeAvailibility(sizes, availibility)
{
    const str = sizes.map((size, index = 0) =>
    {
        return `
        <li>
            <p>${size}</p>
            <p class="status">${availibility[index++]}</p>
        </li>`;
    }).join('');

    return str;
}


function getModalHTML(artArray, sizesStr)
{
    return `
        <button class="close-btn" type="button">
            <i class="fa-solid fa-circle-xmark"></i>
        </button>

        <div class="modal-center">
            <div class="modal-image">
                <div class="img-wrapper">
                    <img src="./images/${artArray.imgSrc}" alt="">
                    
                </div>
            </div>

            <div class="info-div">
                <p id="title"><span>Title: </span>${artArray.title}</p>
                <p id="artist"><span>Artist: </span>${artArray.artist}</p>
                <p id="availibility"><span>Availibility: </span></p>

                <div class="dropdown-container">

                    <div class="dropdown">
                        <p >Size Selection</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    

                    <ul class="">
                        ${sizesStr}
                    </ul>
                </div>
            </div>
        </div>`;

}