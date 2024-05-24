import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth, googleProvider, bd, collUtilisateurs } from "./init";
import { doc, setDoc } from "firebase/firestore";

/**
 * Permet à un utilisateur de se connecter en utilisant l'authentification
 * fédérée Google.
 */
export function connexion() {
  signInWithPopup(firebaseAuth, googleProvider).catch(error => {
    console.error("Erreur lors de la connexion :", error);
  });
}

export function deconnexion() {
  signOut(firebaseAuth);
}

/**
 * Enregistre l'observateur de connexion Firebase Auth.
 * @param {function} mutateurUtil fonction de mutation de l'état 'utilisateur'.
 * @return void.
 */
export function observerEtatConnexion(mutateurUtil) {
  onAuthStateChanged(firebaseAuth, (u) => {
    if (u) {
      // Enregistrer les données de cet utilisateur dans Firestore
      setDoc(
        doc(bd, collUtilisateurs, u.uid),
        {
          nomComplet: u.displayName,
          avatar: u.photoURL,
          dcc: new Date().getTime(),
          courriel: u.email,
        },
        { merge: true }
      );
    }
    mutateurUtil(u);
  });
}

/**
 * Hook personnalisé pour obtenir l'utilisateur connecté.
 * @return {Object|null} L'utilisateur connecté ou null.
 */
export function useAuth() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const desabonner = onAuthStateChanged(firebaseAuth, (u) => {
      if (u) {
        // Enregistrer les données de cet utilisateur dans Firestore
        setDoc(
          doc(bd, collUtilisateurs, u.uid),
          {
            nomComplet: u.displayName,
            avatar: u.photoURL,
            dcc: new Date().getTime(),
            courriel: u.email,
          },
          { merge: true }
        );
      }
      setUtilisateur(u);
    });

    return () => desabonner();
  }, []);

  return utilisateur;
}
