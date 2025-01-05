import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const PropertyTabs = ({ property }) => {
    console.log(property.images[0])
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
<div className="property-tabs-layout">
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Description" style={{color:"#fff"}}/>
        <Tab label="Floor Plan" style={{color:"#fff"}}/>
        <Tab label="Google Map" style={{color:"#fff"}}/>
      </Tabs>
      {value === 0 && (
        <Box p={3}>
          <h2>Description</h2>
          <p>{property.longDescription}</p>
        </Box>
      )}
      {value === 1 && (
        <Box p={3}>
          <h2>Floor Plan</h2>
          <img src={`${process.env.PUBLIC_URL}/${property.floor_plan}`} alt={property.name} className='floor-plan'/>   
          </Box>
      )}
      {value === 2 && (
        <Box p={3}>
          <h2>Google Map</h2>
          <iframe
            src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      )}
    </Box>
</div>
  );
};

export default PropertyTabs;
