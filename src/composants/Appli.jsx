import "./Appli.scss";
import Entete from "./Entete";
import PiedDePage from "./PiedDePage";
import Comic from "./Comic";
import Bouton from "./Boutons";

import React, { useState } from "react";
import ListeCommentaires from "./ListeCommentaires";

export default function Appli() {
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
      <Comic />
      <Bouton />
      <ListeCommentaires commentaires={commentaires} />
      <PiedDePage />
    </div>
  );
}
