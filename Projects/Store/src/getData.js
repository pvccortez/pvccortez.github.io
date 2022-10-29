const allProductsUrl = 'https://course-api.com/javascript-store-products';
const singleProductUrl = 'https://course-api.com/javascript-store-single-product?id=';

export async function getURLData() 
{
   try
   {
      const response = await fetch(allProductsUrl);

      if(!response.ok)
      {
         console.log(`Fetche respons.ok: ${response.ok}`);
         throw new Error('Unable to fetch data from URL: Server Error');
      }

      const data = await response.json();

      return data;   
   } 
   
   catch (error)
   {
      console.log(error.message);    
   }

}