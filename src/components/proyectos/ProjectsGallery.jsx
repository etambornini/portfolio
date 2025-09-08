import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from 'lucide-react';
import '../../css/ProjectsGallery.css';

const ProjectsGallery = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [masonryColumns, setMasonryColumns] = useState(3);
  const galleryRef = useRef(null);

  // Configuración responsive para columnas Masonry
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setMasonryColumns(1);
      else if (width < 1024) setMasonryColumns(2);
      else setMasonryColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribución de proyectos en columnas para efecto Masonry
  const distributeProjects = () => {
    const columns = Array.from({ length: masonryColumns }, () => []);
    projects.forEach((project, index) => {
      columns[index % masonryColumns].push(project);
    });
    return columns;
  };

  const openModal = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Manejo de teclado para navegación
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, selectedProject]);

  const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="project-card group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="project-image-container">
          <img 
            src={project.thumbnail || project.images?.[0]} 
            alt={project.title}
            className="project-image"
            loading="lazy"
          />
          <div className={`project-overlay ${isHovered ? 'active' : ''}`}>
            <div className="project-overlay-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.shortDescription}</p>
              <div className="project-tech-stack">
                {project.technologies?.slice(0, 3).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                <button 
                  onClick={() => openModal(project)}
                  className="action-btn primary"
                  aria-label={`Ver detalles de ${project.title}`}
                >
                  Ver Proyecto
                </button>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn secondary"
                    aria-label={`Ver sitio en vivo de ${project.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn secondary"
                    aria-label={`Ver código fuente de ${project.title}`}
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Modal = () => {
    if (!isModalOpen || !selectedProject) return null;

    return (
      <div className="modal-overlay " onClick={closeModal}>
        <div className="modal-content bg-amber-500" onClick={(e) => e.stopPropagation()}>
          <button 
            className="modal-close"
            onClick={closeModal}
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
          
          <div className="modal-body ">
            <div className="modal-image-section">
              {selectedProject.images && selectedProject.images.length > 0 && (
                <>
                  <div className="modal-image-container">
                    <img 
                      src={selectedProject.images[currentImageIndex]} 
                      alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                      className="modal-image"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button 
                          className="modal-nav-btn prev"
                          onClick={prevImage}
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          className="modal-nav-btn next"
                          onClick={nextImage}
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                  {selectedProject.images.length > 1 && (
                    <div className="modal-thumbnails">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img src={image} alt={`Miniatura ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="modal-info-section">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.fullDescription || selectedProject.shortDescription}</p>
              
              {selectedProject.technologies && (
                <div className="modal-tech-section">
                  <h3>Tecnologías utilizadas</h3>
                  <div className="modal-tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="modal-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedProject.features && (
                <div className="modal-features-section">
                  <h3>Características principales</h3>
                  <ul className="modal-features-list">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="modal-links">
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link primary"
                  >
                    <ExternalLink size={18} />
                    Ver Sitio en Vivo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link secondary"
                  >
                    <Github size={18} />
                    Ver Código
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="projects-empty">
        <p>No hay proyectos disponibles en este momento.</p>
      </div>
    );
  }

  const columns = distributeProjects();

  return (
    <div className="projects-gallery" ref={galleryRef}>
      <div className="masonry-container">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {column.map((project, projectIndex) => (
              <ProjectCard key={`${columnIndex}-${projectIndex}`} project={project} />
            ))}
          </div>
        ))}
      </div>
      <Modal />
    </div>
  );
};

export default ProjectsGallery;