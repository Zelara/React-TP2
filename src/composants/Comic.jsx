import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./Comic.scss";
import Aime from "./Aime";
import { formatDate, parseDate } from "../code/formatDate";
import { bd, stockage, collBandes } from "../code/init";
import Boutons from "./Boutons";

function Comic() {
  const [bandesDessinees, setBandesDessinees] = useState([]);
  const [images, setImages] = useState([]);
  const [indexCourant, setIndexCourant] = useState(0);

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
    };

    const recupererImages = async () => {
      const refImages = ref(stockage, "jse-images/");
      try {
        const resultat = await listAll(refImages);
        const urlsImages = await Promise.all(
          resultat.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(urlsImages.filter((url) => !!url));
      } catch (erreur) {
        console.error("Erreur lors de la récupération des images: ", erreur);
      }
    };

    recupererBandesDessinees();
    recupererImages();
  }, []);

  const changerImagePrecedente = () => {
    setIndexCourant((indexPrecedent) =>
      indexPrecedent === 0 ? images.length - 1 : indexPrecedent - 1
    );
  };

  const changerImageSuivante = () => {
    setIndexCourant((indexPrecedent) =>
      indexPrecedent === images.length - 1 ? 0 : indexPrecedent + 1
    );
  };

  return (
    <div className="Comic">
      {bandesDessinees.map((bande, index) => (
        <div
          key={bande.id}
          style={{ display: index === indexCourant ? "block" : "none" }}
        >
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
      <div className="images-comic">
        {images.length > 0 && (
          <img
            key={indexCourant}
            src={images[indexCourant]}
            alt={`JSE image ${indexCourant}`}
          />
        )}
        <Aime />
      </div>
      <Boutons
        onPrecedent={changerImagePrecedente}
        onSuivant={changerImageSuivante}
      />
    </div>
  );
}

export default Comic;
