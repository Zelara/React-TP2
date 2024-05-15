import "./Appli.scss";
import Entete from "./Entete";
import PiedDePage from "./PiedDePage";

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
    <div className="Appli">
      <Entete />
      <ListeCommentaires commentaires={commentaires} />
      <PiedDePage />
    </div>
  );
};

export default Appli;
