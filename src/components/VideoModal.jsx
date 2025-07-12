import React, { useState } from 'react';
import { X, Play } from 'lucide-react';
import { Button } from './ui/button';
import demoVideo from '../assets/demo-complete.mp4';

export function VideoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handleVideoClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Video container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-video">
            {!isPlaying ? (
              <div 
                className="relative w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center cursor-pointer group"
                onClick={handleVideoClick}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Watch Rent Control Demo
                  </h3>
                  <p className="text-white/80 text-sm">
                    See how our platform simplifies property management
                  </p>
                </div>
              </div>
            ) : (
              <video
                className="w-full h-full"
                controls
                autoPlay
                muted
                onEnded={() => setIsPlaying(false)}
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-6 text-center">
          <Button size="lg" className="mr-4">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  );
}

