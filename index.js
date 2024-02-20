//import * as cheerio from "cheerio";
const co = require("cheerio");
const crypto = require("crypto");

//const fetch = require('node-fetch');

const centris = "https://www.centris.ca/fr/propriete~a-vendre~trois-rivieres?view=Thumbnail&uc=1";
const padMapper = "https://www.padmapper.com/apartments/dorval-qc";

function calculateChecksum(htmlMarkup, algorithm = "sha256") {
  //Création d'un objet hash
  const hash = crypto.createHash(algorithm);
  //Mise à jour du hash avec les données à hacher
  hash.update(htmlMarkup);
  //calcul du hash
  return hash.digest("hex");
}
//return the html texts
async function fetchWebToHash(url) {
  //fetch le contenu du url et le mets dans la variable response
  let response = await fetch(url);
  //transfrome le fetch value en string et le met dans html markup
  let htmlMarkup = await response.text();
  //met le htmlMarkup dans la methode qui transforme le contenue en hashcode
  let hashCode = await calculateChecksum(htmlMarkup);

  console.log("Le HashCode: " + hashCode);
  return hashCode;
}

async function checkUrl(url){
const response = await fetch(url);
const htmlText = await response.text();
let apartmentId = '';
let lesApartments = [];
console.log("run");
const $ = co.load(htmlText);

//console.log("Div Main Result: " + $('.row.thumbnail-content'))

$(".a-more-detail").each((i, element) =>{
  apartmentId = `${$(element).attr('href')} `;
  //console.log('AppartmentId: ' + apartmentId);
  lesApartments.push(apartmentId);


})
lesApartments.forEach(id => {
  console.log("le id : " + id);
})

}

async function compareFetch(url) {
  const firstHash = await fetchWebToHash(url, calculateChecksum);
  const secondHash = await fetchWebToHash(url, calculateChecksum);

  const areEqual = firstHash === secondHash;
  console.log("Are the hash codes equal?", areEqual);

  return areEqual;
}

checkUrl(centris)




