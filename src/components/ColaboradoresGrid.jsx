/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeaderTop from '../components/HeaderTop'
import '../css/colaboradores.css'
import { useState } from 'react'

const ColaboradoresGrid = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
  
    const colaboradores = [
      { id: 1, name: 'Colaborador 1', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731418/terraviva/colaboradores/CREDENCIALES_54x86-leo_copia_rkvutd.jpg' },
      { id: 2, name: 'Colaborador 2', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731418/terraviva/colaboradores/CREDENCIALES_54x86-manu_copia_ljrrto.jpg' },
      { id: 3, name: 'Colaborador 3', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731419/terraviva/colaboradores/CREDENCIALES_54x86-nestor_copia_ddmhxa.jpg' },
      { id: 4, name: 'Colaborador 4', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-omar_copia_c7jsb6.jpg' },
      { id: 5, name: 'Colaborador 5', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-sil_copia_cwo7ro.jpg' },
      { id: 6, name: 'Colaborador 6', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-cati_copia_ndayyi.jpg' },
      { id: 7, name: 'Colaborador 7', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-yanina_copia_e4j7mr.jpg' },
      { id: 8, name: 'Colaborador 8', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-kike_copia_grczwb.jpg' },
      { id: 9, name: 'Colaborador 9', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731417/terraviva/colaboradores/CREDENCIALES_54x86-agus_copia_pgjynm.jpg' },
      { id: 10, name: 'Colaborador 10', image: 'https://res.cloudinary.com/dwjhbrsmf/image/upload/v1737731418/terraviva/colaboradores/CREDENCIALES_54x86-junior_copia_qlcvwx.jpg' },
      // Agrega más colaboradores según sea necesario
    ];
  
    const openModal = (image) => {
      setModalImage(image);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setModalImage('');
    };
  return (
    <>
       {/* Sección de Colaboradores */}
       <div className="colaboradores-container container">
        <h2 className="colaboradores-title">Nuestros Colaboradores</h2>
        <div className="colaboradores-grid">
          {colaboradores.map((colaborador) => (
            <div
              key={colaborador.id}
              className="colaborador-item"
              onClick={() => openModal(colaborador.image)}
            >
              <img
                src={colaborador.image}
                alt={colaborador.name}
                className="colaborador-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Colaborador" className="modal-image" />
          </div>
        </div>
      )}
    </>
  )
}

export default ColaboradoresGrid