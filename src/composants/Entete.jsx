import "./Entete.scss";
import Avatar from "@mui/material/Avatar";
import btnGoogle from "/images/google-icone.png";
import { connexion } from '../code/utilisateur-modele';

export default function Entete() {
  return (
    <header className="Entete">
      <div className="logo-titre">
        <img className="logo" src="./images/LogoTP1.png" alt="Logo" />
        <h1>ComicMania</h1>
      </div>

      <div className="utilisateur">
        <Avatar />
        <div className="btn-google" onClick={connexion}>
          <img className="google-icone" src={btnGoogle} alt="" />
          Connexion avec Google
        </div>
      </div>
    </header>
  );
}
