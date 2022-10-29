import { getURLData } from "./src/getData.js"
import { checkStore } from "./function.js";
import { setupStore } from "./src/setupStore.js";
import { displayProducts } from "./src/display.js";
import { toggleCart } from "./homepage/toggleCart.js";
import { toggleSidebar} from "./src/toggleSidebar.js"
import { formatPrice } from "./function.js";
import { displayCart } from "./Cart/addToCart.js";


let currentBox = "";

window.addEventListener('DOMContentLoaded', async () =>
{
    let store = '';

    // Check to see if the store has been setup
    if(!checkStore())
    {
        const products = await getURLData();
        store = setupStore(products);
        localStorage.setItem('store', JSON.stringify(store));

    }

    const productContainer = document.querySelector('.product-container');
    const nameFilter = document.querySelector('.name-filter');
    const companyFilter = document.querySelector('.company-filter-div');

    store = JSON.parse(localStorage.getItem('store'));
    const cartLocalStorage = localStorage.getItem('cart');
    let cart = [];

    if(!cartLocalStorage)
    {
        cart = null;
    }

    else
    {
        cart = JSON.parse(cartLocalStorage);
    }
    

    displayProducts(store, productContainer);
    addNameFilter(store, nameFilter, productContainer);
    addCompanyFilter(store, companyFilter, productContainer);
    toggleSidebar();
    toggleCart();
    addPriceFilter(productContainer, store)
    displayCart(cart);


});


function addNameFilter(store, nameFilter, productContainer)
{
    nameFilter.addEventListener('input', (e) =>
    {
        const str = e.target.value.toLowerCase();

        const items = store.filter(item =>
            {
                if(item.name.includes(str))
                {
                    return item;
                }
            });

        displayProducts(items, productContainer, true);
    });
}


function addCompanyFilter(store, companyFilter, productContainer)
{
    companyFilter.innerHTML = setupCompanyFilter(store);
    currentBox = document.querySelector(`input[data-value='all']`);
    checkboxInput(companyFilter, productContainer, store);
    // const selectedCompanies = document.querySelectorAll();
}


function setupCompanyFilter(store)
{
    const initialStr = `<h3>Company</h3>
             
                        <label for="all" class="company-label">
                            <input  class="company-filter" type="checkbox" data-value="all" checked>
                            All
                        </label>`;

    let companyArray = store.map(item => 
        {
            return item.company;
        })

    const set = new Set();
    companyArray.forEach(company =>
        {
            set.add(company);
        });

    companyArray = [...set];

    const companyStr = companyArray.map(company =>
        {
            return `<label for="${company}}" class="company-label">
                            <input  class="company-filter" type="checkbox" data-company="${company}">
                            ${company}
                    </label>`
        }).join("");

    return `${initialStr}${companyStr}`;
}


function checkboxInput(companyFilter, productContainer, store)
{
    const checkboxes = [...companyFilter.querySelectorAll('.company-filter')];
    const allCheckbox = companyFilter.querySelector('input[data-value="all"]');
    const set = new Set();


    // Add Eventlistener to all checkboxes
    checkboxes.map(checkbox =>
        {
            checkbox.addEventListener('input', e =>
            {
                const company = e.target.dataset.company;
                const checked = e.target.hasAttribute('checked');


                // User checking a checkbox
                if(company !== 'all' && !checked)
                {
                    currentBox.checked = false;
                    currentBox.removeAttribute('checked');
                    e.target.setAttribute('checked', "");
                    currentBox = e.target;

                    // Filter products based on company selecter
                    const products = store.filter(item =>
                        {
                            if(item.company === company)
                            {
                                return item;
                            } 
                        });

                    displayProducts(products, productContainer, false);
                }

                // User unchecking a checkbox
                else if(company !== 'all' && checked)
                {
                    currentBox = companyFilter.querySelector('input[data-value="all"]');
                    e.target.checked = false;
                    e.target.removeAttribute('checked');
                    allCheckbox.checked = true;
                    displayProducts(store, productContainer, false);
                }
            });
        });
}


function addPriceFilter(productContainer, store)
{
    let maxPrice = 0;
    let price = 0;
    const priceFilter = document.querySelector('.price-filter');
    
    // Get the max price 
    store.forEach(item =>
        {
            if(maxPrice < item.price)
            {
                maxPrice = item.price;
            }
        });

    priceFilter.setAttribute('max', maxPrice);

    // finde price based on the price range input element
    priceInput(priceFilter, productContainer,store);
}


// Gets the products whose price is greater or equal to filter input price
function getProductsByPrice(price, store)
{
    const products = store.filter(item =>
        {
            if(item.price >= price)
            {
                return item;
            }
        });

    return products;
}


// Display products based on price range
function priceInput(priceFilter, productContainer,store)
{
    const filterTextValue = document.querySelector('.price-range-display span');

    priceFilter.addEventListener('input', e =>
    {
        const products = getProductsByPrice(e.target.value, store);
        filterTextValue.innerHTML = formatPrice(parseInt(e.target.value));
        displayProducts(products, productContainer, false);
    });
}