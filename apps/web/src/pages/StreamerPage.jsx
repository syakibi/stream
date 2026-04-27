import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Twitch, Youtube, ExternalLink, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const StreamerPage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const MODERATOR_PASSWORD = 'syakib5249';
  const STREAM_TIME = '11:00 AM GMT+8';

  // Simple state without useLocalStorage for now
  const [schedule, setSchedule] = useState({
    'Monday': 'Stream Day',
    'Tuesday': 'Stream Day',
    'Wednesday': 'Stream Day',
    'Thursday': 'Stream Day',
    'Friday': 'Stream Day',
    'Saturday': 'Rest Day',
    'Sunday': 'Rest Day',
  });
  const [isModerator, setIsModerator] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [editDay, setEditDay] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleModeratorLogin = () => {
    if (passwordInput === MODERATOR_PASSWORD) {
      setIsModerator(true);
      setPasswordInput('');
    } else {
      alert('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleEditDay = (day) => {
    setEditDay(day);
    setEditValue(schedule[day] || '');
  };

  const handleSaveEdit = () => {
    setSchedule({
      ...schedule,
      [editDay]: editValue
    });
    setEditDay(null);
    setEditValue('');
  };

  const platforms = [
    {
      name: 'Syakibi',
      icon: Twitch,
      url: 'https://twitch.tv/syakibi',
      color: 'from-purple-600 to-purple-400'
    },
    {
      name: 'Syakibi',
      icon: Youtube,
      url: 'https://youtube.com/@syakibi_yt',
      color: 'from-red-600 to-red-400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Twitch Stream - Syakibi</title>
        <meta name="description" content="Check out my weekly streaming schedule." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://i.postimg.cc/HxC2607H/banner.png"
                alt="Streaming setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Live streams & content
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  Join me every day at <span className="font-semibold">{STREAM_TIME}</span> for art and gaming!
                </p>
              </div>
            </div>
          </section>

          {/* Schedule Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Weekly schedule</h2>
                    <p className="text-muted-foreground">All streams at {STREAM_TIME}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        {isModerator ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {isModerator ? 'Moderator: ON' : 'Moderator'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{isModerator ? 'Moderator Mode Active' : 'Enter Password'}</DialogTitle>
                      </DialogHeader>
                      {!isModerator ? (
                        <div className="space-y-4">
                          <Input
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleModeratorLogin()}
                          />
                          <Button onClick={handleModeratorLogin} className="w-full">Unlock</Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">Moderator mode is active.</p>
                          <Button variant="outline" onClick={() => setIsModerator(false)} className="w-full">
                            Lock
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Weekly Schedule Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg bg-card border">
                    <img
                      src="https://i.postimg.cc/kGLvzLjL/Weekly-Stream-Schedule.png"
                      alt="Weekly Stream Schedule"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Schedule Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {days.map((day) => (
                    <div
                      key={day}
                      className="bg-card border rounded-lg p-4 h-full hover:border-primary/50 transition-colors"
                    >
                      <div className="font-semibold text-lg mb-2">{day}</div>
                      <div className="text-sm text-muted-foreground mb-2">{STREAM_TIME}</div>
                      <div className="text-base font-medium mb-4 min-h-[2.5rem]">
                        {schedule[day] || <span className="text-muted-foreground italic">No event</span>}
                      </div>

                      {isModerator && (
                        <Dialog open={editDay === day} onOpenChange={(open) => !open && setEditDay(null)}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-full"
                              onClick={() => handleEditDay(day)}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit {day}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Event name"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button onClick={handleSaveEdit} className="flex-1">Save</Button>
                                <Button variant="outline" onClick={() => setEditDay(null)} className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Platforms Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Watch on</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className={`bg-gradient-to-br ${platform.color} p-8 rounded-2xl hover:shadow-lg transition-all`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <platform.icon className="w-12 h-12 text-white" />
                            <div>
                              <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                              <p className="text-white/80 text-sm">Follow for notifications</p>
                            </div>
                          </div>
                          <ExternalLink className="w-6 h-6 text-white/60" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StreamerPage;