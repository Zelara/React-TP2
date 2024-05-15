import React from 'react';
import Commentaire from './Commentaire';

const ListeCommentaires = ({ commentaires }) => {
  return (
    <div>
      {commentaires.map((commentaire, index) => (
        <Commentaire key={index} commentaire={commentaire} />
      ))}
    </div>
  );
};

export default ListeCommentaires;