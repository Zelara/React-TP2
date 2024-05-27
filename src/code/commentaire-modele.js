import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { bd, collBandes, collComs } from "./init";

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
    "Snapshot contenant les commentaires dans Firestore :",
    commentaires
  );
  return commentaires.docs;
}

/**
 * Ajouter un commentaire à une bande quotidienne.
 * @param {string} idBande Chaîne indiquant l'identifiant de la bande quotidienne
 * @param {string} idUtilisateur Chaîne indiquant l'identifiant de l'utilisateur
 * @param {string} commentaire Contenu du commentaire à ajouter
 * @returns {Promise<void>} Promesse résolue une fois le commentaire ajouté avec succès
 */
export async function ajouterCommentaire(idBande, idUtilisateur, commentaire) {
  try {
    const docRef = await addDoc(collection(bd, collBandes, idBande, collComs), {
      idUtilisateur,
      commentaire,
      date: new Date().toISOString(), // Ajoutez une date pour la référence temporelle
    });
    console.log("Commentaire ajouté avec ID :", docRef.id);
  } catch (error) {
    throw new Error("Erreur lors de l'ajout du commentaire :", error);
  }
}