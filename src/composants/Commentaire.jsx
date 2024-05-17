import React from "react";
import "./Commentaire.scss";

function Commentaire({ commentaire }) {
  return (
    <div className="Commentaire">
      <h2>{commentaire.titre}</h2>
      <p>{commentaire.texte}</p>
    </div>
  );
}

export default Commentaire;
