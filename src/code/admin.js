/*
  Ce script permet de générer des données de test dans Firestore.
  Important : avant de l'utiliser, assurez-vous que vous avez les 
              permissions adéquates dans Firestore : 
                match /jse-bandes/{document=**} {
                  allow read, write : if true
                }
    **Et toute les autres restrictions enlevées (commentées si vous préférez).**
*/

import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { bd, stockage, collBandes, collComs } from "./init";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { loremIpsum } from "lorem-ipsum";

// Nom du dossier dans Firebase Storage
const nomDossierStorage = 'jse-images';

// Date de début et de fin pour les bandes disponibles (premier jour et dernier jour)
const debut = new Date(2023, 9, 5); // 5 octobre 2023
const fin = new Date(2024, 3, 24); // 24 avril 2024

// Utilisateurs fictifs
const nbUtilisateurs = 200;
let utilisateurs = [];

// Quantité de données à générer pour chaque bande
const nbMinAime = 1, 
      nbMaxAime = 40, 
      nbMinVotes = 0, 
      nbMaxVotes = 25,
      nbMinCommentaires = 2, 
      nbMaxCommentaires = 15;

// Dates et mots-clés associés aux bandes (par nom de fichier)
let infoBandes = {
  "jse-3.png": {
                mc: ["web", "tp"], 
                dpub: "20231005"
              },
  "jse-58.png": {
                mc: ["tim", "fille", "couleur"], 
                dpub: "20240401"
              },
  "jse-47.png": {
                mc: ["jeu", "mathieu", "couleur", "programmation"], 
                dpub: "20240321"
              },
  "jse-75.png": {
                mc: ["fille", "couleur", "profs"], 
                dpub: "20240424"
              },
  "jse-35.png": {
                mc: ["tp"], 
                dpub: "20240209"
              },
  "jse-16.png": {
                mc: ["couleur", "cauchemar", "css"], 
                dpub: "20231117"
              },
  "jse-39.png": {
                mc: ["labo", "jeu", "couleur", "feu"], 
                dpub: "20240224"
              },
  "jse-19.png": {
                mc: ["camille", "saq", "couleur", "feu", "web"], 
                dpub: "20231204"
              },
  "jse-73.png": {
                mc: ["git", "couleur", "feu", "profs"], 
                dpub: "20240422"
              },
  "jse-40.png": {
                mc: ["openai", "ia", "couleur", "martin", "tp"], 
                dpub: "20240305"
              }
}

/**
 * Obtient les URLs et noms de fichiers des images stockées dans Storage.
 * @returns {array} Tableau contenant des objets contenant les 'nom/url'
 *                  de chaque image.
 */
async function obtenirInfoImages() {
  const refImages = ref(stockage, nomDossierStorage);
  const listeImages = await listAll(refImages);
  const tabObjetsImagesDansStorage = listeImages.items;
  const tabInfoImages = [];
  for(let i=0; i< tabObjetsImagesDansStorage.length; i++) {
      tabInfoImages[i] = {
            nom: tabObjetsImagesDansStorage[i].name , 
            url: await getDownloadURL(tabObjetsImagesDansStorage[i])
      };
  }
  console.log("***********************");
  console.log("Tableau des images dans Storage : ", utilisateurs);
  console.log("***********************");
  return tabInfoImages;
}

/**
 * Génère un tableau contenant des identifiants d'utilisateurs fictifs.
 */
function genererUtilisateurs() {
  for(let i=0; i<nbUtilisateurs; i++) {
      utilisateurs.push({
        idUtil: crypto.randomUUID(), 
        nomUtil: (Math.random().toString(36).substring(2, 10) + '0'.repeat(8)).substring(0, 8)
      });
  }
  console.log("***********************");
  console.log("Tableau des utilisateurs : ", utilisateurs);
  console.log("***********************");
}

/**
 * Génère un tableau contenant des identifiants d'utilisateurs pris
 * aléatoirement dans le tableau des utilisateurs. La taille du tableau
 * est aussi déterminé aléatoirement selon les paramètres 'min/max' 
 * configurés ci-dessus.
 * @returns {array} Tableau d'identifiants-utilisateurs.
 */
function genererAimesAleatoires() {
  let tabAime = [];
  let nbAime = Math.floor(Math.random()*nbMaxAime) + nbMinAime;
  let utilisateurAime;
  while(tabAime.length < nbAime) {
    utilisateurAime = utilisateurs[Math.floor(Math.random()*utilisateurs.length)].idUtil;
      if(!tabAime.includes(utilisateurAime)) {
          tabAime.push(utilisateurAime);
      }
  }
  return tabAime;
}

/**
 * Génère un tableau associatif contenant en étiquette des identifiants  
 * d'utilisateurs aléatoires et en valeur -1 ou 1. La taille du tableau
 * est aussi déterminé aléatoirement selon les paramètres 'min/max' 
 * configurés ci-dessus.
 * @returns {object}
 */
function genererVotesAleatoires() {
  let mapVotes = {};
  let nbVotes = Math.floor(Math.random()*nbMaxVotes) + nbMinVotes;
  let utilisateurVote;
  while(Object.values(mapVotes).length<=nbVotes) {
      utilisateurVote = utilisateurs[Math.floor(Math.random()*utilisateurs.length)].idUtil;
      mapVotes[utilisateurVote] = Math.random()<0.5 ? 1 : -1;
  }
  return mapVotes;
}

/**
 * Génère un nombre aléatoire de commentaires ayant chacun un texte 
 * aléatoire, un utilisateur aléatoire, une date aléatoire, et un nombre
 * et des valeurs de votes aléatoires.
 * @param {string} idBande Identifiant de la bande
 */
async function insererCommentairesAleatoires(idBande) {
  let mapVotes = {};
  let nbComs = Math.floor(Math.random()*nbMaxCommentaires) + nbMinCommentaires;
  let utilisateurCom, docCom;
  for(let i=0; i<nbComs; i++) {
      utilisateurCom = utilisateurs[Math.floor(Math.random()*utilisateurs.length)];
      mapVotes = genererVotesAleatoires();

      docCom = await addDoc(collection(bd, collBandes, idBande, collComs), {
          texte: loremIpsum(),
          votes: mapVotes,
          idUtil: utilisateurCom.idUtil,
          nomUtil: utilisateurCom.nomUtil,
          timestamp: Math.floor(Math.random()*(fin.getTime() - debut.getTime())) + debut.getTime()
      });
  }
}

/**
 * Génère tous les documents de la collection jse-bandes.
 */
export default async function generer() {
  // Obtenir l'information sur les images stockées dans Storage
  const tabInfoImages = await obtenirInfoImages();
  
  // Générer des utilisateurs fictifs
  genererUtilisateurs();

  let docBande, refDocBande;
  let indexBande = 0;
  let tabAime = [];
  while(indexBande < Object.values(infoBandes).length) {
    // Générer un tableau de plébiscites aléatoires
    tabAime = genererAimesAleatoires();

    // Ajoute le document d'une bande dans Firestore
    refDocBande = doc(collection(bd, collBandes));
    docBande = await setDoc(refDocBande, {
        aime: tabAime,
        motsCles: infoBandes[tabInfoImages[indexBande].nom].mc,
        url: tabInfoImages[indexBande].url,
        dpub: infoBandes[tabInfoImages[indexBande].nom].dpub
    });

    console.log("***********************");
    console.log("Identifiant du document de bande quotidienne : ", refDocBande.id);
    console.log("***********************");
    
    // Générer des commentaires aléatoires pour cette bande
    insererCommentairesAleatoires(refDocBande.id);

    // Incrémenter la position de l'image
    indexBande++;
  }
}