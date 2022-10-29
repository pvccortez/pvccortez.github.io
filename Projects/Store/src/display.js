import { formatPrice, getAllElements} from "./../function.js";
import { addItemToCart } from "./../Cart/addToCart.js"

function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error("Unable to find");
    }

    return element;
}

function displayButtons()
{
    const list = getAllElements('.single-product');

    list.forEach(item =>
        {
            item.addEventListener('mouseover', ()=>
            {
                const btns = item.querySelector('.product-btns');                
                btns.classList.add('show-product-btns');                
            });

            item.addEventListener('mouseout', ()=>
            {
                const btns = item.querySelector('.product-btns');
                btns.classList.remove('show-product-btns');
            });

            const id = item.dataset.id;

            const addToCartBtn = item.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () =>
            {
                addItemToCart(id);
            })
            
        });
}

export function displayProducts(products, container, applyingFilter = false)
{
    const productStr = products.map(item =>
        {
            return `<div class="single-product" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="product-img">
            <p class="product-name">${item.name}</p>
            <p class="product-company">${item.company}</p>
            <p class="product-price">${formatPrice(item.price)}</p>

            <div class="product-btns">
               <button class="search-btn product-btn">
                  <a href='./../singleProduct.html?id=${item.id}&name=${item.name}' target='_blank'>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </a>
               </button>

               <button class="add-to-cart-btn product-btn">
                  <i class="fa-solid fa-cart-shopping"></i>
               </button>
            </div>
         </div>`
        }).join("");

    container.innerHTML = productStr;
    
    if(!applyingFilter)
    {
        displayButtons();
    }
    
}