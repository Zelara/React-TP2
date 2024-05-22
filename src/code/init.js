import objetConfig from './config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Initialiser les services de Firebase (crééer une référence à une appli)
export const appli = initializeApp(objetConfig);

// Initialiser Firebase Authentication
export const firebaseAuth = getAuth(appli);

// Initialiser l'authentification fédérée avec Google (GoogleAuthProvider)
export const googleProvider = new GoogleAuthProvider(); 

// Storage
export const stockage = getStorage(appli);

// Initialiser Firestore
export const bd = getFirestore(appli);

// Raccourcis pour les collections utilisées
export const collBandes = "jse-bandes"
export const collComs = "commentaires";
export const collUtilisateurs = "jse-utilisateurs";

