import "./Appli.scss";

import React, { useState } from "react";
import ListeCommentaires from "./ListeCommentaires";

const Appli = () => {
  const [commentaires, setCommentaires] = useState([
    { titre: "Premier commentaire", texte: "Ceci est le premier commentaire." },
    {
      titre: "Deuxième commentaire",
      texte: "Ceci est le deuxième commentaire.",
    },
  ]);

  return (
    <div>
      <h1>ComicMania</h1>
      <ListeCommentaires commentaires={commentaires} />
    </div>
  );
};

export default Appli;
