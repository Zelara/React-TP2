// Pour afficher la bonne date
const formatDate = (dateStr) => {
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
  
    const year = dateStr.substring(0, 4);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1;
    const day = parseInt(dateStr.substring(6, 8), 10);
  
    const date = new Date(year, month, day);
    const jour = jours[date.getDay()];
    const moisNom = mois[month];
  
    return `${jour}, le ${day} ${moisNom} ${year}`;
  };
  
  export default formatDate;
  