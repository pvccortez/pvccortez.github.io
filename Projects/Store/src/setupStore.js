
export function setupStore(products)
{
    const store = products.map(product =>
        {
            let fields = product.fields;

            return {amount: 0, id: product.id, company: fields.company, colors: fields.colors, featured: fields.featured,
                    name: fields.name, price: fields.price, image: fields.image[0].thumbnails.large.url  };
        });

    return store;
}

export function getProductFromStore(id)
{
    const storageItem = localStorage.getItem('store');

    if(!storageItem)
    {
        return null;
    }

    const store = JSON.parse(storageItem);
    const product = store.find(item => item.id === id);

    
    if(!product)
    {
        return null;
    }

    return product;
}