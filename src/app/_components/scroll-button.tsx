// components/ScrollButton.tsx
import { useEffect, useState } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para verificar a posição do scroll
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-14 h-14 z-[1000] bg-[#ebffd2] text-[#ebffd2] rounded-full shadow-lg hover:shadow-2xl transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } flex items-center justify-center`}
    >
      <p className="bg-[#173811] w-12 h-12 rounded-full flex items-center justify-center text-lg">
        <span className="material-symbols-rounded">arrow_upward</span>
      </p>
    </button>
  );
  
};

export default ScrollButton;
