import React from "react";
import ProductItem from "../ProductItem/ProductItem";


const ShopProducts = ({error, loading, data}) => {
    return (
        <div style={{width:"80%"}}>
            {!loading && !error && 
                    (
                        <div className="d-flex flex-wrap justify-content-between flex-wrap">
                            {data && data.map((el) => (
                                <div key={el._id} className="mb-3"> {/* Use el._id as the unique key */}
                                    <ProductItem 
                                        id={el._id}
                                        name={el.name} 
                                        fileUrl={el.imageUrl[0]}
                                        price={el.price}
                                        stock={el.stock}    
                                    />
                                </div>
                            ))}
                        </div>
                    )}
        </div>
    )
}

export default ShopProducts;