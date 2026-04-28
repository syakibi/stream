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
    { image: 'https://i.postimg.cc/bG3kJtgN/showcase-0.png', title: 'Vector' },
    { image: 'https://i.postimg.cc/ns0BzD2L/showcase-1.png', title: 'Syakibi but Rappa Hat' },
    { image: 'https://i.postimg.cc/WDXg3k8F/showcase-2.png', title: 'Tall Clover Fanart' },
    { image: 'https://i.postimg.cc/CZTJpk1w/showcase-3.png', title: 'Ellie Fanart' },
    { image: 'https://i.postimg.cc/62qRGpb0/showcase-4.png', title: 'Oh Bubbles my Bubbles' },
    { image: 'https://i.postimg.cc/dk3dTVNr/showcase-5.png', title: 'Screen Idle' },
    { image: 'https://i.postimg.cc/tZJPV4v3/showcase-6.png', title: 'Clover and Klee' },
    { image: 'https://i.postimg.cc/7Gh7TZtg/showcase-7.png', title: 'Igni Fanart' },
    { image: 'https://i.postimg.cc/dkfCRcg8/showcase-8.png', title: 'Helix Fanart' },
    { image: 'https://i.postimg.cc/TLsbjvBq/showcase-9.png', title: 'Fi 1st Anniversary Fanart' },
    { image: 'https://i.postimg.cc/gX7hyb1M/showcase-10.png', title: 'Clover but Chimera' },
    { image: 'https://i.postimg.cc/LYWPkFG0/showcase-11.png', title: 'Starky Fanart' },
    { image: 'https://i.postimg.cc/tZc6dG88/showcase-12.png', title: 'Rice Shower' },
    { image: 'https://i.postimg.cc/ftPd7Q16/showcase-13.png', title: 'BlueFoxy Fanart' },
    { image: 'https://i.postimg.cc/64GvY1NF/showcase-14.png', title: 'Miki Fanart' },
    { image: 'https://i.postimg.cc/XGP5K6Tj/showcase-15.png', title: 'Lyraa but Bangboo' },
    { image: 'https://i.postimg.cc/tnVx2mjR/showcase-16.png', title: 'Jingyuan Fanart' },
    { image: 'https://i.postimg.cc/zHRg0Pr3/showcase-17.png', title: 'Fi Fanart' },
    { image: 'https://i.postimg.cc/jCWPxCJg/showcase-18.png', title: 'Overlord Fanart' },
    { image: 'https://i.postimg.cc/hhJTDhdR/showcase-19.png', title: 'Syakibi background' },
    { image: 'https://i.postimg.cc/xqkMfqzc/showcase-20.png', title: 'Small Clover Fanart' },
    { image: 'https://i.postimg.cc/GTvrmkRc/showcase-21.png', title: 'Clover 3rd Anniversary Fanart' },
    { image: 'https://i.postimg.cc/62ktKMkJ/showcase-22.png', title: 'Zombie Syakibi' },
    { image: 'https://i.postimg.cc/sQkszTkC/showcase-23.png', title: 'Syakibi Gloves' },
    { image: 'https://i.postimg.cc/xNLY1KQd/showcase-24.png', title: 'Overlord 2nd Anniversary Fanart' },
    { image: 'https://i.postimg.cc/V0X1kjwP/showcase-25.png', title: 'Spikibi' },
    { image: 'https://i.postimg.cc/9wyVQG2c/showcase-26.png', title: 'Evil Syakibi' }
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

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredArtworks.map((artwork, index) => (
                  <div key={index} className="w-full">
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