import { doc, updateDoc } from "firebase/firestore";
import { bd } from "./init";

/**
 * Ajoute un vote à un commentaire dans Firestore.
 * @param {string} commentaireId ID du commentaire.
 * @param {string} utilisateurId ID de l'utilisateur qui vote.
 * @param {number} type Type de vote : 1 pour like, -1 pour dislike.
 * @returns {Promise<void>}
 */
export async function ajouterVote(commentaireId, utilisateurId, type) {
    const commentaireRef = doc(bd, "jse-bandes", commentaireId, "commentaires", commentaireId);
    await updateDoc(commentaireRef, {
        [`votes.${utilisateurId}`]: type
    });
}

/**
 * Supprime le vote d'un utilisateur pour un commentaire dans Firestore.
 * @param {string} commentaireId ID du commentaire.
 * @param {string} utilisateurId ID de l'utilisateur dont le vote doit être supprimé.
 * @returns {Promise<void>}
 */
export async function supprimerVote(commentaireId, utilisateurId) {
    const commentaireRef = doc(bd, "jse-bandes", commentaireId, "commentaires", commentaireId);
    await updateDoc(commentaireRef, {
        [`votes.${utilisateurId}`]: null
    });
}
