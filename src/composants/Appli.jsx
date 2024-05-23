import "./Appli.scss";
import Entete from "./Entete";
import PiedDePage from "./PiedDePage";
import Comic from "./Comic";

import ListeCommentaires from "./ListeCommentaires";

export default function Appli() {
  return (
    <div className="Appli">
      <Entete />
      <Comic />
      <ListeCommentaires />
      <PiedDePage />
    </div>
  );
}
