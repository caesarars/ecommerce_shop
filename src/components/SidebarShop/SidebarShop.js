import React, {useState} from "react";
import "./SidebarShop.css"
import Category from "./Category";
import Apparels from "./Apparels";
import Price from "./Price";
import Size from "./Size";

const SidebarShop = ({ handleFilterShop, applyFilter, clearFilter }) => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [filter, setFilter] = useState({})

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
    
        setFilter((prevFilter) => {
          const updatedFilter = { ...prevFilter, category };
          handleFilterShop(updatedFilter); 
          return updatedFilter;
        });
      };
    
      const handleApparelsSelect = (apparels) => {
        console.log("Selected apparels:", apparels);
    
        setFilter((prevFilter) => {
          const updatedFilter = { ...prevFilter, apparels };
          handleFilterShop(updatedFilter);
          return updatedFilter;
        });
      };
    
      const handleMinPrice = (price) => {
        console.log("Min Price:", price);
    
        setFilter((prevFilter) => {
          const updatedFilter = { ...prevFilter, minPrice: price };
          handleFilterShop(updatedFilter);
          return updatedFilter;
        });
      };
    
      const handleMaxPrice = (price) => {
        console.log("Max Price:", price);
    
        setFilter((prevFilter) => {
          const updatedFilter = { ...prevFilter, maxPrice: price };
          handleFilterShop(updatedFilter);
          return updatedFilter;
        });
      };
    
      const handleSelectSize = (size) => {
        console.log("Selected Size:", size);
    
        setFilter((prevFilter) => {
          const updatedFilter = { ...prevFilter, size };
          handleFilterShop(updatedFilter);
          return updatedFilter;
        });
      };

    return (
      <div style={{width:"20%"}}>
          <div className="container_sidebar">
            <div className="container mt-2">
                <Category  onCategorySelect={handleCategorySelect} />
                <Apparels onApparelsSelect={handleApparelsSelect}/>
                <Price onPriceMinSelect={handleMinPrice} onPriceMaxSelect={handleMaxPrice}/>
                <Size onSizeSelect={handleSelectSize}/>  
                <div className="btn btn-primary" onClick={() => applyFilter()}>Apply</div>   
                <div className="btn btn-default"  onClick={() => clearFilter()}>Clear Filter</div>   
            </div>
        </div>
      </div>
    )
}

export default SidebarShop;