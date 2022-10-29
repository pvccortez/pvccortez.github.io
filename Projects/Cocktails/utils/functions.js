
export function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw Error(`${selector}: Not Found in DOM`);
    }

    return element;
}




export function getElements(selector)
{
    const list = document.querySelectorAll(selector)

    if(!list)
    {
        throw Error(`No Element(s) of (${selector}) Was Found in DOM`);
    }

    return [...list];
}




export async function getData(url)
{
    try
    {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    catch(error)
    {
        return null;
    }
}




export async function displayDrinks(url,selector)
{
    const container = getElement(selector);

    try
    {
        
        const data = await getData(url);
        const drinksList = data.drinks;

        const drinkStr = drinksList.map(item =>
            {
                return `<!-- Single Drink -->
                <a class="drink-link" href="./drink.html?id=${item.idDrink}&name=${item.strDrink}" target="_blank">
                    <article>
                        <img src="${item.strDrinkThumb}" alt="" class="drink-img" data-id="${item.idDrink}">
                        <p class="drink-name">${item.strDrink}</p>
                    </article>
                </a>`
            }).join("");

        container.innerHTML = drinkStr;
    }

    catch(e)
    {
        container.innerHTML = ``;
        container.textContent = "Sorry, No Results Based on Search";
    }
}




export async function displaySingleDrink(url, selector)
{
    const container = getElement(selector);
    const data = await getData(url);
    const drink = data.drinks[0];

    console.log(drink);

    const drinkStr = 
    `<h2 class="name">${drink.strDrink}</h2>
    <div class="break-div"></div>

    <article class="single-drink">
        
        <span class="image-span">
            <img src="${drink.strDrinkThumb}" alt="Cocktail Image">
        </span>
        

        <div class="drink-info">
            <p class="drink-type"><span>Type:</span> ${drink.strCategory}</p>

            <div class="break-div"></div>

            <p class="info">
                <span>Instructions:</span> ${drink.strInstructions}
            </p>
            <div class="break-div"></div>



            <span>Ingredients:</span>
            <ul class="ingredients">
                ${getIngredients(drink)}
            </ul>

            <a href="./home.html">
                <button class="btn">All Cocktails</button>
            </a>
            
        </div>
    </article>`;

    container.innerHTML = drinkStr;
    getIngredients(drink);
}




function getIngredients(drink)
{
    const list = 
    [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
        drink.strIngredient6,
        drink.strIngredient7,
        drink.strIngredient8,
        drink.strIngredient9,
        drink.strIngredient10,
        drink.strIngredient11,
        drink.strIngredient12,
        drink.strIngredient13,
        drink.strIngredient14,
        drink.strIngredient15
    ];

    const str = list.map(item =>
        {
            if(item)
            {
                return `<li>
                        <i class="far fa-check-square"> ${item}</i>
                        </li>`
            }
            
        }).join("");

   return str;
}




export function toggleLoading()
{
    const loading = getElement('.loading');

    loading.classList.toggle('hide');
}