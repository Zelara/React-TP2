import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "./Comic.scss";
import Aime from "./Aime";
import { formatDate, parseDate } from "../code/formatDate";
import { bd, stockage, collBandes } from "../code/init";
import Boutons from "./Boutons";
import ListeCommentaires from "./ListeCommentaires";
import { useAuth } from "../code/utilisateur-modele";

function Comic() {
  const [bandesDessinees, setBandesDessinees] = useState([]);
  const [images, setImages] = useState([]);
  const [indexCourant, setIndexCourant] = useState(0);
  const utilisateur = useAuth();

  useEffect(() => {
    const recupererBandesDessinees = async () => {
      const instantane = await getDocs(collection(bd, collBandes));
      const donneesBandesDessinees = instantane.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      donneesBandesDessinees.sort(
        (a, b) => parseDate(a.dpub) - parseDate(b.dpub)
      );
      setBandesDessinees(donneesBandesDessinees);
      setIndexCourant(donneesBandesDessinees.length - 1);
    };

    const recupererImages = async () => {
      const refImages = ref(stockage, "jse-images/");
      try {
        const resultat = await listAll(refImages);
        const urlsImages = await Promise.all(
          resultat.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(urlsImages.filter((url) => !!url));
        setIndexCourant(urlsImages.length - 1);
      } catch (erreur) {
        console.error("Erreur lors de la récupération des images: ", erreur);
      }
    };

    recupererBandesDessinees();
    recupererImages();
  }, []);

  const changerImagePrecedente = () => {
    setIndexCourant((indexPrecedent) =>
      indexPrecedent === 0 ? indexPrecedent : indexPrecedent - 1
    );
  };

  const changerImageSuivante = () => {
    setIndexCourant((indexPrecedent) =>
      indexPrecedent === images.length - 1 ? indexPrecedent : indexPrecedent + 1
    );
  };

  const allerPremierePage = () => {
    setIndexCourant(0);
  };

  const allerDernierePage = () => {
    setIndexCourant(images.length - 1);
  };

  const desactiverPrecedent = indexCourant === 0;
  const desactiverSuivant = indexCourant === images.length - 1;

  return (
    <div className="Comic">
      {/* Boucle pour afficher les bandes dessinées */}
      {bandesDessinees.map((bande, index) => (
        <div
          key={bande.id}
          style={{ display: index === indexCourant ? "block" : "none" }}
        >
          {/* Affichage de la date au-dessus de l'image */}
          <p>{formatDate(bande.dpub)}</p>
          <div>
            {bande.imageUrl && (
              <img
                className="bande"
                src={bande.imageUrl}
                alt={`JSE ${bande.imgNum}`}
              />
            )}
          </div>
        </div>
      ))}

      {/* Affichage des images en haut */}
      <div className="images-comic">
        {images.length > 0 && (
          <img
            key={indexCourant}
            src={images[indexCourant]}
            alt={`JSE image ${indexCourant}`}
          />
        )}
        {utilisateur && bandesDessinees.length > 0 && (
          <Aime
            utilisateur={utilisateur}
            bandeId={bandesDessinees[indexCourant].id}
          />
        )}
      </div>

      {/* Affichage des boutons de navigation */}
      <Boutons
        onPrecedent={changerImagePrecedente}
        onSuivant={changerImageSuivante}
        onPremierePage={allerPremierePage}
        onDernierePage={allerDernierePage}
        desactiverPrecedent={desactiverPrecedent}
        desactiverSuivant={desactiverSuivant}
      />

      {/* Affichage des commentaires en bas des boutons */}
      {bandesDessinees.length > 0 && (
        <ListeCommentaires bandeId={bandesDessinees[indexCourant].id} />
      )}
    </div>
  );
}

export default Comic;
