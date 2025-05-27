import Tilt from 'react-parallax-tilt';
import '../../css/ImageTiltCard.css';

export default function BlockSlider({ files }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {files.map((file) => (
        <div className=''>
         <Tilt glareEnable={true} glareMaxOpacity={0.25} scale={1.0} transitionSpeed={450}>
      
        <img
          key={file.id}
          src={`http://localhost:1337${file.formats?.medium?.url || file.url}`}
          alt={file.name}
          className="rounded shadow-md object-cover w-full h-64 sm:h-96 transition-transform duration-300 transform hover:shadow-lg "
        />
        
        </Tilt>
        </div>
      ))}
    </div>
  );
}