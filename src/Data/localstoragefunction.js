export const getFavourites = () => {
    const favourites = localStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
  };
  
  export const addFavourite = (property) => {
    const favourites = getFavourites();
    if (!favourites.find((fav) => fav.id === property.id)) {
      favourites.push(property);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  };
  
  export const removeFavourite = (propertyId) => {
    let favourites = getFavourites();
    favourites = favourites.filter((fav) => fav.id !== propertyId);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };
  