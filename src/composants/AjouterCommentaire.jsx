import React, { useState } from "react";
import "./AjouterCommentaire.scss";
import { ajouterCommentaire } from "../code/commentaire-modele";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


export default function AjouterCommentaire({ bandeId, utilisateur }) {
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");

  const handleChange = (e) => {
    setNouveauCommentaire(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nouveauCommentaire.trim()) return; // Ne pas envoyer de commentaire vide

    try {
      await ajouterCommentaire(bandeId, utilisateur.uid, nouveauCommentaire);
      setNouveauCommentaire(""); // Effacer le champ après l'envoi
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={nouveauCommentaire}
        onChange={handleChange}
        label="Ajouter un commentaire..."
        variant="filled"
      />
      <Button variant="contained" endIcon={<SendIcon />}>
        Envoyer
      </Button>
    </form>
  );
}
