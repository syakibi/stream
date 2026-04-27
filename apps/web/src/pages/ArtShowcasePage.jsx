import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArtCard from '@/components/ArtCard.jsx';

const ArtShowcasePage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(9); // Start with 9 images
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);

  const artworks = [
    { image: 'https://i.postimg.cc/hjqr287x/showcase-0.png', title: 'Showcase 1' },
    { image: 'https://i.postimg.cc/qRdL1cC2/showcase-1.png', title: 'Showcase 2' },
    { image: 'https://i.postimg.cc/pTtZsQnZ/showcase-2.png', title: 'Showcase 3' },
    { image: 'https://i.postimg.cc/QMVz5qZK/showcase-3.png', title: 'Showcase 4' },
    { image: 'https://i.postimg.cc/tTtzw1hL/showcase-4.png', title: 'Showcase 5' },
    { image: 'https://i.postimg.cc/qRXGSt8b/showcase-5.png', title: 'Showcase 6' },
    { image: 'https://i.postimg.cc/DZdcHWqM/showcase-6.png', title: 'Showcase 7' },
    { image: 'https://i.postimg.cc/DZdcHWqY/showcase-7.png', title: 'Showcase 8' },
    { image: 'https://i.postimg.cc/ZnbLSTcD/showcase-8.png', title: 'Showcase 9' },
    { image: 'https://i.postimg.cc/3N8ZTKB6/showcase-9.png', title: 'Showcase 10' },
    { image: 'https://i.postimg.cc/kGJymnsd/showcase-10.png', title: 'Showcase 11' },
    { image: 'https://i.postimg.cc/D0vcT26F/showcase-11.png', title: 'Showcase 12' },
    { image: 'https://i.postimg.cc/mkLSsbjZ/showcase-12.png', title: 'Showcase 13' },
    { image: 'https://i.postimg.cc/SRSGhydN/showcase-13.png', title: 'Showcase 14' },
    { image: 'https://i.postimg.cc/90LYXvgX/showcase-14.png', title: 'Showcase 15' },
    { image: 'https://i.postimg.cc/0jkCs8nw/showcase-15.png', title: 'Showcase 16' },
    { image: 'https://i.postimg.cc/7hKnPptz/showcase-16.png', title: 'Showcase 17' },
    { image: 'https://i.postimg.cc/x863jWpG/showcase-17.png', title: 'Showcase 18' },
    { image: 'https://i.postimg.cc/T209cD26/showcase-18.png', title: 'Showcase 19' },
    { image: 'https://i.postimg.cc/VsgRFCsv/showcase-19.png', title: 'Showcase 20' },
    { image: 'https://i.postimg.cc/nV2k1DVY/showcase-20.png', title: 'Showcase 21' },
    { image: 'https://i.postimg.cc/sxN2Kc0Z/showcase-21.png', title: 'Showcase 22' },
    { image: 'https://i.postimg.cc/sxXXp8KX/showcase-22.png', title: 'Showcase 23' },
    { image: 'https://i.postimg.cc/6q33dSzq/showcase-23.png', title: 'Showcase 24' },
    { image: 'https://i.postimg.cc/fyrb5KgY/showcase-24.png', title: 'Showcase 25' },
    { image: 'https://i.postimg.cc/D0Mz5gY0/showcase-25.png', title: 'Showcase 26' },
    { image: 'https://i.postimg.cc/T14PQ9H5/showcase-26.png', title: 'Showcase 27' }
  ];

  const filteredArtworks = artworks.slice(0, visibleImages);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleImages < artworks.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleImages(prev => Math.min(prev + 9, artworks.length));
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleImages, loading, artworks.length]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredArtworks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  return (
    <>
      <Helmet>
        <title>Works - Syakibi</title>
        <meta name="description" content="Browse my portfolio of digital art, character designs, and illustrations. Commission work available." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Art gallery
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  Explore my collection of digital art, character designs, and creative illustrations.
                </p>
              </motion.div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredArtworks.map((artwork, index) => (
                  <div key={index} className="break-inside-avoid">
                    <ArtCard
                      image={artwork.image}
                      title={artwork.title}
                      category="Showcase"
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Section */}
              {visibleImages < artworks.length && (
                <motion.div
                  ref={loadMoreRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mt-12"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3 py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-muted-foreground">Loading more artwork...</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          setVisibleImages(prev => Math.min(prev + 9, artworks.length));
                          setLoading(false);
                        }, 500);
                      }}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      Load More Art
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              )}

              {/* Show total count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mt-8 text-sm text-muted-foreground"
              >
                Showing {filteredArtworks.length} of {artworks.length} artworks
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
            <div className="relative">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[4/3] flex items-center justify-center">
                <img
                  src={filteredArtworks[currentImageIndex]?.image}
                  alt={filteredArtworks[currentImageIndex]?.title}
                  className="max-h-[80vh] w-auto object-contain"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {filteredArtworks[currentImageIndex]?.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {currentImageIndex + 1} of {filteredArtworks.length}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ArtShowcasePage;