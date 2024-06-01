import React, { useEffect, useState } from 'react';
import './Entete.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import btnGoogle from '/images/google-icone.png';
import { connexion, deconnexion, observerEtatConnexion } from '../code/utilisateur-modele';
import Toast from './Toast'; // Importez le composant Toast

export default function Entete() {
  const [utilisateur, setUtilisateur] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  const gererConnexion = () => {
    connexion();
    setToastVisible(true);
    setToastMessage('Connecté avec succès'); // Message que vous souhaitez afficher
  };

  const gererDeconnexion = () => {
    deconnexion();
    setToastVisible(true);
    setToastMessage('Déconnecté avec succès'); // Message que vous souhaitez afficher
  };

  return (
    <header className="Entete">
      <div className="logo-titre">
        <img className="logo" src="./images/LogoTP1.png" alt="Logo" />
        <h1>ComicMania</h1>
      </div>

      <div className="utilisateur">
        {utilisateur ? (
          <React.Fragment>
            <Avatar src={utilisateur.photoURL} alt={utilisateur.displayName} />
            <span className="nom-utilisateur">{utilisateur.displayName}</span>
            <Button variant="contained" className="btn-deconnexion" onClick={gererDeconnexion}>
              Déconnexion
            </Button>
          </React.Fragment>
        ) : (
          <div className="btn-google" onClick={gererConnexion}>
            <img className="google-icone" src={btnGoogle} alt="Connexion avec Google" />
            Connexion avec Google
          </div>
        )}
      </div>

      {/* Affichage du Toast */}
      <Toast message={toastMessage} isVisible={toastVisible} setIsVisible={setToastVisible} />
    </header>
  );
}
