import React, { useEffect, useState } from "react";
import { registerApi } from "../../config/axios";
import './gallery.css'; // Assuming CSS file for custom styles
import { motion } from "framer-motion";

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [modalData, setModalData] = useState(null); // For the pop-up data
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await registerApi.get('/user-gallery/get-gallery');
            console.log(response.data);
            setGallery(response.data);
        } catch (error) {
            console.error('Unable to display gallery!', error);
        }
    };

    const openModal = (item) => {
        setModalData(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };
    

    return (
        <div className="home-container">
            <motion.h1 
            className="title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            
          </motion.h1>
            <div className="gallery-grid">
                {gallery.map(item => (
                    <div 
                        className="gallery-tile" 
                        key={item.id}
                        onClick={() => openModal(item)} // Open modal on click
                    >
                        <img 
                            src={`${import.meta.env.VITE_BACKEND}/galleryuploads/${
                                Array.isArray(item.image) 
                                ? item.image[0] 
                                : JSON.parse(item.image.replace(/\\"/g, '"'))[0]
                            }`} 
                            alt={item.title} 
                            className="gallery-image"
                            />

                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && modalData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>×</button>
                        <img 
                            src={`${import.meta.env.VITE_BACKEND}/galleryuploads/${
                                Array.isArray(modalData.image) 
                                ? modalData.image[0] 
                                : JSON.parse(modalData.image.replace(/\\"/g, '"'))[0]
                            }`} 
                            alt={modalData.title} 
                            className="modal-image"
                            />

                        
                        <h3 className="modal-title">{modalData.title}</h3>
                        <p className="modal-description">{modalData.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
