import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ArtCard = ({ image, title, category, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-card"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        {/* Loading skeleton */}
        {!isLoaded && isInView && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
        )}

        {/* Actual image */}
        {isInView && (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white font-semibold text-xl mb-1">{title}</h3>
        <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{category}</p>
      </div>
    </motion.div>
  );
};

export default ArtCard;