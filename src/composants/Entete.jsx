import React, { useEffect, useState } from 'react';
import "./Entete.scss";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import btnGoogle from "/images/google-icone.png";
import { connexion, deconnexion, observerEtatConnexion } from '../code/utilisateur-modele';

export default function Entete() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

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
            <Button variant="contained" className="btn-deconnexion" onClick={deconnexion}>
              Déconnexion
            </Button>
          </React.Fragment>
        ) : (
          <div className="btn-google" onClick={connexion}>
            <img className="google-icone" src={btnGoogle} alt="Connexion avec Google" />
            Connexion avec Google
          </div>
        )}
      </div>
    </header>
  );
}
