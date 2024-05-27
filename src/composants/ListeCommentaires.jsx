import React, { useEffect, useState } from "react";
import { obtenir } from "../code/commentaire-modele";
import { ajouterVote, supprimerVote } from "../code/vote-modele"; // Importer les fonctions de vote
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IconButton from "@mui/material/IconButton";
import "./ListeCommentaires.scss";

export default function ListeCommentaires({ bandeId }) {
  const [commentaires, setCommentaires] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const [voteState, setVoteState] = useState({});

  async function obtenirCommentaires() {
    if (!bandeId) return; // S'assurer que l'ID de la bande est défini
    let coms = await obtenir(bandeId);
    setCommentaires(coms);
  }

  useEffect(() => {
    obtenirCommentaires();
  }, [bandeId]); // Ajouter bandeId comme dépendance pour relancer l'effet lorsque l'ID change

  const handleVote = async (commentaireId, type) => {
    // Vérifier si l'utilisateur est connecté
    if (!utilisateur) return;

    const commentaire = commentaires.find((c) => c.id === commentaireId);
    if (!commentaire) return;

    const votes = commentaire.data().votes;
    const userVote = votes[utilisateur.uid];

    if (userVote === type) return; // Ne rien faire si l'utilisateur a déjà voté de cette façon

    if (userVote) {
      await supprimerVote(commentaireId, utilisateur.uid); // Supprimer le vote existant
    }

    await ajouterVote(commentaireId, utilisateur.uid, type); // Ajouter le nouveau vote
    obtenirCommentaires(); // Rafraîchir les commentaires après le vote
  };

  const toggleVoteIcon = (commentaireId, type) => {
    setVoteState((prevState) => ({
      ...prevState,
      [commentaireId]: type === prevState[commentaireId] ? null : type,
    }));
  };

  return (
    <div className="ListeCommentaires">
      {commentaires.map((commentaire) => {
        const votes = commentaire.data().votes;
        const votePositif = Object.values(votes).filter(
          (vote) => vote === 1
        ).length;
        const voteNegatif = Object.values(votes).filter(
          (vote) => vote === -1
        ).length;

        const userVote = votes[utilisateur?.uid];
        const voteIcon = userVote === 1 ? ThumbUpAltIcon : ThumbUpOffAltIcon;
        const voteIconNegative =
          userVote === -1 ? ThumbDownAltIcon : ThumbDownOffAltIcon;

        return (
          <div key={commentaire.id} className="BoiteCommentaire">
            <p className="NomUtilisateur">
              Nom Utilisateur: {commentaire.data().nomUtil}
            </p>
            <p>Commentaire: {commentaire.data().texte}</p>
            <div className="VotesContainer">
              <IconButton
                onClick={() => {
                  toggleVoteIcon(commentaire.id, 1);
                  handleVote(commentaire.id, 1);
                }}
              >
                {voteState[commentaire.id] === 1 ? (
                  <ThumbUpAltIcon />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
              </IconButton>
              <span>{votePositif}</span>
              <IconButton
                onClick={() => {
                  toggleVoteIcon(commentaire.id, -1);
                  handleVote(commentaire.id, -1);
                }}
              >
                {voteState[commentaire.id] === -1 ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}
              </IconButton>
              <span>{voteNegatif}</span>
            </div>
            <p className="Likes">Total Aimes: {votePositif + voteNegatif}</p>
          </div>
        );
      })}
    </div>
  );
}
