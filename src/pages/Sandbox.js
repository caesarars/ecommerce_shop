import React , {useState} from "react"
import "./Sandbox.css"

const Sandbox = () => {

    const images = [
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+1',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+2',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+3',
        'https://via.placeholder.com/400x300/FF33A8/FFFFFF?text=Image+4',
        'https://via.placeholder.com/400x300/33A8FF/FFFFFF?text=Image+5',
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+6',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+7',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+8',
        'https://via.placeholder.com/400x300/33A8FF/FFFFFF?text=Image+123',
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+611',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+73',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+81',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const imagesToDisplay = images.slice(currentIndex, currentIndex + 4);

    // Fungsi untuk mengubah gambar ke kanan
    const nextImages = () => {
        if (currentIndex + 4 >= images.length) {
            setCurrentIndex(0); // Loop ke awal
        } else {
            setCurrentIndex(currentIndex + 4);
        }
    };

    // Fungsi untuk mengubah gambar ke kiri
    const prevImages = () => {
        if (currentIndex - 4 < 0) {
            setCurrentIndex(images.length - 4); // Loop ke akhir
        } else {
            setCurrentIndex(currentIndex - 4);
        }
    };

    return (
        <div className="container w-50 mt-5">
            <div className="box mb-5"></div>

            <div className="carousel-container">
            <div
                className="carousel-images"
                style={{
                    transform: `translateX(-${currentIndex * 25}%)`, // Geser gambar
                    transition: 'transform 0.5s ease-in-out', // Animasi geser
                }}
            >
                {imagesToDisplay.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`carousel-image-${index}`}
                        className="carousel-image"
                    />
                ))}
            </div>
            <button className="carousel-button prev" onClick={prevImages}>
                Prev
            </button>
            <button className="carousel-button next" onClick={nextImages}>
                Next
            </button>
        </div>

            <div className="box2"></div>
            <div className="box3"></div>
            <div className="box4"></div>
            <div className="box5"></div>
        </div>
    )
}

export default Sandbox;