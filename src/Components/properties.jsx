import { useParams } from "react-router-dom"
import estateData from "../Data/estateData.json";
import { FaHeart } from "react-icons/fa";
import { RiArrowLeftSLine ,RiArrowRightSLine} from "react-icons/ri";
import { addFavourite, getFavourites, removeFavourite } from "../Data/localstoragefunction";
import { useEffect, useState } from "react";
import PropertyTabs from "./propertyTabs";

function Properties(){
    const [favourites,setFavourites] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const {id} = useParams();
    const property = estateData.estates.filter((item) =>item.id == id)[0]
    const isFavourite = favourites.filter((item) => item.id == id)
    function HandleAddToFavourites(){
        addFavourite(property)
        setFavourites(getFavourites())
    }
    
    function HandleRemoveFromFavourites(){
        removeFavourite(property.id)
        setFavourites(getFavourites())
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % property.images.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
      };
    
    useEffect(() =>{
        setFavourites(getFavourites())
    },[])

    return(
        <div className="properties">
           <div className="properties-layout">
            <div className="property-content">
                <div className="property-image">
                    <div className="primary-image">
                        <img src={property.images[currentIndex]} alt={property.name}/>   
                        <div className="arrows">
                            <div className="arrow" onClick={handlePrev}>
                                <RiArrowLeftSLine color="#fff"/>
                            </div>
                            <div className="arrow" onClick={handleNext}>
                                <RiArrowRightSLine color="#fff"/>
                            </div>
                        </div>  
                    </div>
                    <div className="sub-images">
                        {property.images.map((item,index) =>{
                            return(
                                <img src={item} alt={item.name}/>     
                            )
                        })}  
                        
                    </div> 
                </div>
                <div className="property-desc">
                    <h1>{property.name}</h1>
                    <p>{property.description}</p>
                    <h2>${property.price}</h2>
                        {isFavourite.length>0 ? 
                    <div className="favourites-btn" onClick={()=> HandleRemoveFromFavourites()}>
                        <div className="icon">
                            <FaHeart size={25} color='#fff'/>
                        </div>
                        <div className="value">
                           <p>Remove From Favourites</p>

                        </div>
                    </div>
                                    :
                    <div className="favourites-btn" onClick={()=> HandleAddToFavourites()}>
                        <div className="icon">
                            <FaHeart size={25} color='#fff'/>
                        </div>
                        <div className="value">
                        <p>Add To Favourites</p>
                        </div>
                    </div>
                    }
                        
                       
                </div>
            </div>
                <div className="property-tabs">
                    <PropertyTabs property={property}/>
                </div>
           </div>
        </div>
    )
}

export default Properties