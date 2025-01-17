import React from "react";

const Pagination = ({currentPage, totalPages, totalItems}) => {

    const activePageClass = "btn btn-warning";
    const nonActivePageClass = "btn btn-default";
    

    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-center">
                    <span className="btn btn-default montserrat-normal">Prev</span>

                    {[...Array(totalPages)].map((_,page)=> (
                        <div className={currentPage === page + 1 ? activePageClass : nonActivePageClass} >
                            {page + 1}
                        </div>
                    ))}

                    <span className="btn btn-default montserrat-normal">Next</span>
                </div>
            </div>
        </>
    )
}

export default Pagination;