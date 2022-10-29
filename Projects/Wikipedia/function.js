const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';


export function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error(`The element '${selector}' was not found in the DOM.`);
    }


    return element;
}



export async function displayResults(input)
{
    const results = await getData(input);

    const str = getResultStr(results);
    const resultContainer = getElement('.results');
    resultContainer.innerHTML = str;
}


async function getData(input)
{
    const response = await fetch(`${url}${input}`)
    const data = await response.json();

    return data.query.search;
}


function getResultStr(results)
{
    return results.map(result =>
        {
            return `
                    <a href="http://en.wikipedia.org/?curid=${result.pageid}" target='_blank'>
                        <h4>${result.title}</h4>
                        <p>
                            ${result.snippet}
                        </p>
                    </a>`
        }).join("");
}