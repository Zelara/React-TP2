import { useEffect, useState } from "react";
import { obtenir } from "../code/commentaire-modele";
import "./ListeCommentaires.scss";

export default function ListeCommentaires() {
    const [commentaires, setCommentaires] = useState([]);

    async function obtenirCommentaires() {
        const idBandeTest = "1qtIk4BrxKk1qTYYkctf";
        let coms = await obtenir(idBandeTest);
        setCommentaires(coms);
    }

    useEffect(() => {
        obtenirCommentaires();
    }, []);

    return (
        <div className="ListeCommentaires">
            <h2>Commentaires</h2>
            {commentaires.map(commentaire => {
                const votes = Object.values(commentaire.data().votes);
                const votePositif = votes.filter(vote => vote === 1).length;
                const voteNegatif = votes.filter(vote => vote === -1).length;

                return (
                    <div key={commentaire.id} className="BoiteCommentaire">
                        <p className="NomUtilisateur">Nom Utilisateur: {commentaire.data().nomUtil}</p>
                        <p>Texte: {commentaire.data().texte}</p>
                        <p>Votes positifs: {votePositif}</p>
                        <p>Votes négatifs: {voteNegatif}</p>
                        <p className="Likes">Total Likes: {votePositif + voteNegatif}</p>
                    </div>
                );
            })}
        </div>
    );
}
