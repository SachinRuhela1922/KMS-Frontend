import { useEffect, useRef, useState } from 'react';
import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img, vid, videoPoster } from '../../lib/media.js';
import '../../assets/css/hero.css';

// All polish styles live right here in the JSX (rendered via <style> below).
const HERO_CSS = `
.hero-media { overflow: hidden; background: #0b0f14; }

/* Crisp, GPU-composited media that always fills the frame */
.hero-media .hero-poster,
.hero-media .hero-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
}
.hero-media .hero-video {
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-media .hero-video.is-playing { opacity: 1; }

/* Scrim: keeps white text sharp and readable on any footage */
.hero-scrim {
  position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5, 10, 18, 0.72) 0%, rgba(5, 10, 18, 0.35) 55%, rgba(5, 10, 18, 0.1) 100%),
    linear-gradient(0deg, rgba(5, 10, 18, 0.55) 0%, rgba(5, 10, 18, 0) 40%);
}

/* Typography */
.hero-copy { max-width: 62rem; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
.hero-eyebrow { letter-spacing: 0.02em; margin-bottom: 0.75rem; opacity: 0.92; }
.hero-title {
  letter-spacing: -0.015em;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
  text-wrap: balance;
}
.hero-tagline {
  max-width: 38rem; line-height: 1.55;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  text-wrap: pretty;
}
@media (max-width: 991.98px) {
  .hero-tagline { margin-left: auto; margin-right: auto; }
}

/* Buttons */
.hero-btn {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  min-height: 48px; border-width: 1.5px;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.06);
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.hero-btn i { transition: transform 0.25s ease; }
.hero-btn:hover, .hero-btn:focus-visible { background: #fff; color: #0b0f14; border-color: #fff; }
.hero-btn:hover i, .hero-btn:focus-visible i { transform: translateX(4px); }
.hero-btn:focus-visible { outline: 3px solid rgba(255, 255, 255, 0.55); outline-offset: 3px; }

/* Entrance: one orchestrated moment on the active slide only */
.owl-item.active .hero-copy { animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes hero-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .hero-media .hero-video, .hero-btn, .hero-btn i { transition: none; }
  .owl-item.active .hero-copy { animation: none; }
}
`;

// Sharper poster: request a larger source so it stays crisp on retina / 4K screens.
const HERO_W = 2560;

/**
 * Hero: the poster IMAGE is shown immediately, the VIDEO loads on top of it.
 * As soon as the video is really playing, it fades in over the image.
 * If the video is slow / blocked / fails, the image simply stays.
 */
function HeroMedia({ video, poster }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const posterSrc = img(poster, HERO_W) || videoPoster(video, HERO_W);
  const videoSrc = vid(video);

  useEffect(() => {
    setPlaying(false);
    setFailed(false);
    const v = videoRef.current;
    if (!v || !videoSrc) return undefined;
    v.muted = true; // React doesn't always render the muted attribute - needed for autoplay
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener('canplay', tryPlay);
    return () => v.removeEventListener('canplay', tryPlay);
  }, [videoSrc]);

  return (
    <div className="slider-video hero-media" aria-hidden="true">
      {posterSrc && <img className="hero-poster" src={posterSrc} alt="" fetchpriority="high" decoding="async" />}
      {videoSrc && !failed && (
        <video
          key={videoSrc}
          ref={videoRef}
          className={`hero-video${playing ? ' is-playing' : ''}`}
          src={videoSrc}
          poster={posterSrc || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
        />
      )}
      {/* readability scrim over the media */}
      <div className="hero-scrim" />
    </div>
  );
}

function Buttons({ buttons = [] }) {
  const list = buttons.filter((b) => b.label);
  if (!list.length) return null;
  return (
    <div className="row mt-lg-50 mt-40 hero-buttons">
      {list.map((b, i) => (
        <div className="col-lg-3 pr-2 pb-2 col-6" key={`${b.label}-${i}`}>
          <a href={b.href || '#'} className="btn btn-outline-light rounded-0 px-2 btn-block hero-btn" tabIndex={0}>
            <span>{b.label}</span> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function HeroBanner() {
  const { hero } = useContent();
  const slides = hero.slides || [];
  const key = useListKey(slides);

  return (
    <section className="relative hero-section">
      <style>{HERO_CSS}</style>
      <HeroMedia video={hero.video} poster={hero.poster} />
      <div className="slider-content">
        <OwlCarousel key={key} className="banner" options={{ loop: slides.length > 1, margin: 0, items: 1, nav: slides.length > 1 }}>
          {slides.map((s, i) => (
            <div className="item" key={i}>
              <div className="banner-item">
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-lg-11">
                      <div className="banner-text">
                        <div className="row justify-content-center">
                          <div className="col-lg-12 align-self-center">
                            <div className="px-lg-4 text-center text-lg-left py-lg-0 py-4 hero-copy">
                              {s.eyebrow && <h4 className="font-25 font-weight-600 text-white hero-eyebrow">{s.eyebrow}</h4>}
                              {s.line1 && <h2 className="font-54 text-white text-uppercase mb-0 font-weight-800 text-64 line-height-1 hero-title">{s.line1}</h2>}
                              {s.line2 && <h2 className="font-54 text-white text-uppercase font-weight-800 text-64 hero-title">{s.line2}</h2>}
                              {s.tagline && <p className="mt-4 text-white font-20 hero-tagline">{s.tagline}</p>}
                              <Buttons buttons={s.buttons} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}