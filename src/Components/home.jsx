import estateData from "../Data/estateData.json";
import { RiHome5Line } from "react-icons/ri";
import { LuBedSingle } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavourites, removeFavourite, addFavourite } from "../Data/localstoragefunction";
import { AiOutlineDelete } from "react-icons/ai";

function Home() {
  const [favourites, setFavourites] = useState([]);
  const [filteredEstates, setFilteredEstates] = useState(estateData.estates);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  // Filter function
  const handleSearch = () => {
    const filtered = estateData.estates.filter((estate) => {
      return (
        (searchInput.type === '' || estate.type.toLowerCase().includes(searchInput.type.toLowerCase())) &&
        (searchInput.minPrice === '' || estate.price >= parseInt(searchInput.minPrice)) &&
        (searchInput.maxPrice === '' || estate.price <= parseInt(searchInput.maxPrice)) &&
        (searchInput.bedrooms === '' || estate.bedrooms >= parseInt(searchInput.bedrooms))
      );
    });
    setFilteredEstates(filtered);
  };

  const RedirectPage = (id) => {
    navigate(`property/${id}`);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, estate) => {
    e.stopPropagation(); 
    e.dataTransfer.setData('estateId', estate.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const estateId = e.dataTransfer.getData('estateId');
    const estate = estateData.estates.find(estate => estate.id === parseInt(estateId));
    
    if (estate && !favourites.some(fav => fav.id === estate.id)) {
      addFavourite(estate);
      setFavourites([...favourites, estate]);
    }
  };

  const handleFavoriteDragStart = (e, favourite) => {
    e.stopPropagation();
    e.dataTransfer.setData('favouriteId', favourite.id);
  };

  const handleEstatesDrop = (e) => {
    e.preventDefault();
    const favouriteId = e.dataTransfer.getData('favouriteId');
    if (favouriteId) {
      removeFromFavourites(parseInt(favouriteId));
    }
  };

  function removeFromFavourites(id) {
    removeFavourite(id);
    setFavourites(getFavourites());
  }

  const clearFavourites = () => {
    localStorage.removeItem('favourites');
    setFavourites([]);
  };

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  return (
    <div className="container">
      <div 
        className="left-content"
        onDragOver={handleDragOver}
        onDrop={handleEstatesDrop}
      >
        <div className="search-form">
          <input
            type="text"
            name="type"
            placeholder="Type (House, Flat, etc.)"
            value={searchInput.type}
            onChange={handleInputChange}
          />
          <div className="line"></div>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={searchInput.minPrice}
            onChange={handleInputChange}
          />
          <div className="line"></div>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={searchInput.maxPrice}
            onChange={handleInputChange}
          />
          <div className="line"></div>
          <input
            type="number"
            name="bedrooms"
            placeholder="Min Bedrooms"
            value={searchInput.bedrooms}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <div className="container-title">
            <h1>Latest Estates Result</h1>
          </div>

          <div className="estate-data">
            {filteredEstates.map((item, index) => (
              <div
                className="estate"
                key={index}
                onClick={() => RedirectPage(item.id)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                <img src={item.thumbnail} alt={item.name} />
                <div className="estate-texts">
                  <h2>{item.name}</h2>
                  <p>{item.description.length > 85 ? item.description.substring(0,83) + " .." : item.description}</p>
                  <h1 className="price-text">${item.price}</h1>
                </div>
                <div className="estate-details">
                  <div className="estate-features">
                    <div className="icon">
                      <RiHome5Line color="#fff" />
                    </div>
                    <div className="value">
                      <p>{item.type}</p>
                    </div>
                  </div>
                  <div className="estate-features">
                    <div className="icon">
                      <LuBedSingle color="#fff" />
                    </div>
                    <div className="value">
                      <p>{item.bedrooms} Bedrooms</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div 
        className="right-content"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="favourites-bar">
          <div className="favourite-title">
            <h1>Favourites</h1>
            <button onClick={clearFavourites} className="clear-favourites">
              Clear All
            </button>
          </div>
          <div className="favourites-content">
            {favourites.map((item, index) => (
              <div 
                className="favourite"
                key={index}
                draggable
                onDragStart={(e) => handleFavoriteDragStart(e, item)}
              >
                <div className="fav-visual">
                  <div className="fav-img">
                    <img src={item.thumbnail} alt="" />
                  </div>
                  <div className="fav-data">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="delete-fav" onClick={() => removeFromFavourites(item.id)}>
                  <AiOutlineDelete color="#fff"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;