import React , {useEffect} from "react";
import "./ProgressBar.css"

const ProgressBar = ({statusProgress, handleClickFirstDot}) => {

    useEffect(() => {
       console.log("child component ", statusProgress)
    }, [])

    const showShippingInfo = () => {
        handleClickFirstDot()
    }

    return (
        <div className="container_grey_dots d-flex align-items-center">
            <div onClick={() => showShippingInfo()} className={statusProgress === "shipping" || statusProgress === "order"
                ? "grey-dot bg-warning" : "grey-dot"}></div>
            <div className={statusProgress === "shipping" || statusProgress === "order"
                ? "line_1 bg-warning" : "line_1"}></div>
            <div className={ statusProgress === "order"
                ? "grey-dot bg-warning" : "grey-dot"}></div>
            <div className={statusProgress === "order" ? "line_2 bg-warning" : "line_2"}></div>
            <div className="grey-dot"></div>
    </div>
    )
}

export default ProgressBar