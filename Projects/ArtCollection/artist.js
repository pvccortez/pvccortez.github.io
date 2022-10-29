import { getElement, getList, displayFilter, removerFilter, displayImages } from "./functions.js";
import { Steve_Thomas, artistArray } from "./data.js";


const params =  new URLSearchParams(window.location.search);
const artistName = `${params.get("firstName")} ${params.get("lastName")}`;
const arrayName = `${params.get("firstName")}_${params.get("lastName")}`;
const nameElement = getElement('.artist-name p');
nameElement.textContent = artistName;



const artist_Array = artistArray.find(artist => arrayName);


displayImages(artist_Array);








