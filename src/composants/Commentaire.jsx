import React from 'react';

const Commentaire = ({ commentaire }) => {
  return (
    <div>
      <h2>{commentaire.titre}</h2>
      <p>{commentaire.texte}</p>
    </div>
  );
};

export default Commentaire;