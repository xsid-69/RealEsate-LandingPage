import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Cursor from '../components/Cursor';

const Experience = lazy(() => import('../components/Experience'));
const Properties = lazy(() => import('../components/Properties'));
const Neighbourhoods = lazy(() => import('../components/Neighbourhoods'));
const Process = lazy(() => import('../components/Process'));
const VideoTour = lazy(() => import('../components/VideoTour'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Team = lazy(() => import('../components/Team'));
const Awards = lazy(() => import('../components/Awards'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    gsap.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => setLoaded(true),
    });
  }, []);

  useEffect(() => {
    let current = 0;
    const tick = () => {
      current += (100 - current) * 0.08;
      if (current > 99) {
        setProgress(100);
        handleComplete();
        return;
      }
      setProgress(Math.floor(current));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [handleComplete]);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded]);

  return (
    <>
      {/* Preloader */}
      {!loaded && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#060606]"
          aria-hidden="true"
        >
          <div className="text-center">
            <h2 className="text-white text-[clamp(32px,7vw,56px)] font-normal leading-none tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              Nestara
            </h2>
            <p className="text-white/20 text-[11px] tracking-[4px] uppercase mt-3 font-medium">Pune</p>
          </div>
          <div className="mt-10 w-36 h-[1px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[var(--brand)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/15 text-[11px] mt-4 font-mono tracking-wider">{progress}%</span>
        </div>
      )}

      {/* Custom cursor - desktop only */}
      {loaded && <Cursor />}

      {/* Main content */}
      {loaded && (
        <main className="overflow-x-hidden w-full max-w-full cursor-none lg:cursor-none">
          <Navigation />
          <Hero />
          <Suspense fallback={null}>
            <Experience />
            <Properties />
            <Neighbourhoods />
            <Process />
            <VideoTour />
            <Testimonials />
            <Team />
            <Awards />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      )}
    </>
  );
}
