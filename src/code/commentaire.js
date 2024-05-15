import { bd, collBandes, collComs } from "./init";
import { getDocs, query, collection } from "firebase/firestore";

/**
 * Obtenir les commentaires d'une bande quotidienne.
 * @param {string} idBande Chaîne indiquant l'identifiant de la bande quotidienne
 * @returns {Promise<Array>} Tableau contenant les commentaires (info complète)
 * de la bande requise.
 */
export async function obtenir(idBande) {
  const commentaires = await getDocs(
    query(collection(bd, collBandes, idBande, collComs)) 
  );
  console.log(
    "Snapshot contenant les commentaires dans Firestore : ",
    commentaires
  );
  return commentaires.docs;
}
