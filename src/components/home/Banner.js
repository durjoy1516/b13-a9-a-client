'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const bannerSlides = [
  {
    id: 1,
    title: "Find Expert Tutors for Your Academic Journey",
    description: "Connect with certified medical, science, and general tutors to unlock your full potential through personalized 1-on-1 sessions.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Simplify Your Learning & Booking Experience",
    description: "No manual scheduling headaches. Select your preferred tutor, pick an available slot, and start learning seamlessly.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Guaranteed Digital Slots & Conflict-Free Booking",
    description: "MediQueue ensures direct token booking with real-time slot limits to keep your education organized.",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden bg-slate-900 text-white my-4 rounded-3xl max-w-7xl mx-auto shadow-2xl">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-105"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
      </div>

      {/* Slide Content */}
      <div className="relative z-10 h-full max-w-3xl flex flex-col justify-center px-8 md:px-16">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-300 uppercase bg-indigo-900/60 rounded-full w-fit backdrop-blur-md border border-indigo-500/30">
          MediQueue Tutor Platform
        </span>
        
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-md">
          {slide.title}
        </h1>

        <p className="text-slate-300 text-sm md:text-lg mb-8 leading-relaxed max-w-2xl">
          {slide.description}
        </p>

        {/* CTA Button */}
        <div>
          <Link 
            href="/tutors" 
            className="btn btn-indigo bg-indigo-600 border-none text-white hover:bg-indigo-700 px-8 py-3 text-base font-medium rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer"
          >
            Explore All Tutors ➔
          </Link>
        </div>
      </div>

      {/* Slide Indicators / Navigation Dots */}
      <div className="absolute bottom-6 right-8 z-10 flex space-x-3">
        {bannerSlides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-indigo-500' : 'w-3 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}