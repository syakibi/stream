import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Tv, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const aboutSectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutExpanded(true);
        } else {
          setAboutExpanded(false);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);
  
  const featuredWorks = [
    {
      image: 'https://i.postimg.cc/Dy3ffS3G/art-gallery.gif', //art-gallery
      title: 'Art Gallery',
      description: 'A preview of my digital drawings and illustration in one place.',
      category: 'Portfolio',
      link: '/art'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Syakibi - Find Me on Twitch</title>
        <meta name="description" content="Join me for gaming content and open slots for face shot illustration. Visit Ko-fi to reserve a slot." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://i.postimg.cc/hhJTDhdR/showcase-19.png" //showcase19
                alt="Syakibi Twitch Banner"
                className="w-full h-full object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Syakibi on Twitch
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Join my twitch streams, and creative collaborations. May the community thrive!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200">
                    <Link to="/streamer" className="flex items-center gap-2">
                      Stream
                      <Tv className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm active:scale-[0.98] transition-all duration-200">
                    <Link to="/art" className="flex items-center gap-2">
                      View Works
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background" ref={aboutSectionRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8">About Syakibi</h2>
              </motion.div>

              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -40, rotateZ: -2 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, rotateZ: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 200 }}
                    onClick={() => setAboutExpanded(!aboutExpanded)}
                    className="md:col-span-1 cursor-pointer group w-full max-w-[360px] mx-auto"
                  >
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                      style={{ top: -4, left: -4, right: -4, bottom: -4 }}
                      animate={{ 
                        opacity: aboutExpanded ? 0.4 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <motion.div
                      animate={{ 
                        rotateY: aboutExpanded ? 12 : 0,
                        rotateZ: aboutExpanded ? -2 : 0
                      }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                      className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow border-2 border-accent/40 group-hover:border-accent"
                      style={{ perspective: '1200px', position: 'relative' }}
                    >
                      <motion.img
                        src="https://i.postimg.cc/zLJT8jC1/about.png" //about
                        alt="Syakibi"
                        className="w-full h-auto object-cover"
                        animate={{ 
                          scale: aboutExpanded ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: aboutExpanded ? 1.08 : 1.05 }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40, width: '0%' }}
                    whileInView={{ opacity: 1, x: 0, width: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className="md:col-span-2 space-y-6"
                  >
                    <motion.button
                      onClick={() => setAboutExpanded(!aboutExpanded)}
                      className="group relative inline-flex items-center gap-3 mb-6"
                    >
                      <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                        {aboutExpanded ? 'Hide Story' : 'Reveal Story'}
                      </span>
                      <motion.div
                        animate={{ rotate: aboutExpanded ? 180 : 0, x: aboutExpanded ? 6 : 0 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                      >
                        <ChevronDown className="w-6 h-6 text-accent" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-transparent"
                        animate={{ width: aboutExpanded ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: aboutExpanded ? 1 : 0, 
                        height: aboutExpanded ? 'auto' : 0 
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                      >
                        <div className="backdrop-blur-sm bg-gradient-to-br from-accent/10 via-secondary/5 to-primary/5 border border-accent/20 rounded-2xl p-8 space-y-4 cursor-pointer hover:border-accent/40 transition-colors" onClick={() => setAboutExpanded(false)}>
                          <motion.p 
                            className="text-lg leading-relaxed text-foreground font-medium"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            "Ah… you've found me."<br />
                            "I am a wandering monk… from Langkasari a lost realm."
                          </motion.p>
                          <motion.p 
                            className="text-lg leading-relaxed text-foreground"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            "Call me Syakibi — a Dino Monk who walks between the living and the forgotten. Half spirit, half survivor… fully committed to whatever chaos we're about to get into."
                          </motion.p>
                          <motion.p 
                            className="text-lg leading-relaxed text-foreground"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            "I've trained my body to endure… and my soul to linger."<br />
                            "So whether you're here for guidance… or just to watch me absolutely fail spectacular—"
                          </motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto mt-20">
                {featuredWorks.map((work, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateZ: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <Link to={work.link} className="group block">
                      <motion.div
                        className="relative overflow-hidden rounded-[2.25rem] shadow-2xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.3)] max-w-[420px] mx-auto"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-secondary/5 to-primary/10" />

                        <div className="relative overflow-hidden border border-white/10 rounded-[2.25rem] bg-slate-950">
                          <div className="aspect-[16/9] overflow-hidden bg-black">
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>

                          <div className="p-6 sm:p-8 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                              <span className="inline-flex rounded-full bg-primary/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-primary-foreground">
                                {work.category}
                              </span>
                              <span className="text-xs uppercase tracking-[0.24em] text-white/60">Featured</span>
                            </div>
                            <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">{work.title}</h3>
                            <p className="text-sm leading-6 text-white/70 max-w-xl">
                              {work.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 text-center"
              >
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-[0.98] transition-all duration-200">
                  <Link to="/art" className="flex items-center gap-2">
                    Explore full gallery
                    <Palette className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-muted-foreground">Open slots available</h2>
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                  I have a few slots open for face shot illustrations. If you'd like one, head over to my Ko-fi for details, pricing, and to reserve your spot.
                </p>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98] transition-all duration-200">
                  <a href="https://ko-fi.com/syakibi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Reserve on Ko-fi
                    <Heart className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;