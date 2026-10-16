import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `fc-` se start hoti hain.
const css = `
.fc-section { position: relative; overflow: hidden; isolation: isolate; }
.fc-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .6;
  background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px); background-size: 24px 24px;
}
.fc-ring { position: absolute; z-index: -1; border-radius: 50%; pointer-events: none; }
.fc-ring--one { width: 380px; height: 380px; top: -170px; right: -120px; border: 44px solid rgba(255,255,255,.05); animation: fc-spin 60s linear infinite; }
.fc-ring--two { width: 300px; height: 300px; bottom: -140px; left: -110px; background: rgba(255,193,7,.16); filter: blur(70px); animation: fc-float 18s ease-in-out infinite alternate; }
@keyframes fc-spin { to { transform: rotate(360deg); } }
@keyframes fc-float { to { transform: translate3d(30px, -24px, 0) scale(1.12); } }
@keyframes fc-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes fc-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* heading */
.fc-title { letter-spacing: -.015em; margin-bottom: 12px; animation: fc-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.fc-rule { display: block; width: 64px; height: 4px; margin-bottom: 14px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: fc-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.fc-subtitle { max-width: 52ch; margin: 0; color: rgba(255,255,255,.78); line-height: 1.65; animation: fc-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }
.fc-section .links-btn-02 { display: inline-flex; align-items: center; gap: 8px; transition: gap .3s ease, color .3s ease; animation: fc-rise .6s .2s cubic-bezier(.2,.7,.2,1) both; }
.fc-section .links-btn-02:hover { gap: 16px; }

/* carousel */
.fc-stage { animation: fc-rise .7s .25s cubic-bezier(.2,.7,.2,1) both; position: relative; }
.fc-stage .owl-stage-outer { padding: 12px 2px 8px; }

/* faculty card */
.fc-section .fc-card { display: block; text-decoration: none; transition: transform .4s cubic-bezier(.2,.7,.2,1); }
.fc-section .fc-card:hover { text-decoration: none; transform: translateY(-8px); }
.fc-section .fc-card .faculty-image {
  position: relative; overflow: hidden; isolation: isolate; aspect-ratio: 4 / 5;
  border-radius: 18px; background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 22px 36px -22px rgba(0,0,0,.7);
  transition: box-shadow .4s ease, border-color .4s ease;
}
.fc-section .fc-card .faculty-image img {
  display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center;
  transform: scale(1.001); transition: transform .8s cubic-bezier(.2,.7,.2,1);
}
.fc-section .fc-card:hover .faculty-image { border-color: rgba(255,193,7,.8); box-shadow: 0 30px 44px -22px rgba(0,0,0,.8); }
.fc-section .fc-card:hover .faculty-image img { transform: scale(1.09); }

/* dark gradient + "view profile" pill that slides up on hover */
.fc-veil {
  position: absolute; z-index: 1; inset: 0; display: flex; align-items: flex-end; justify-content: flex-start; padding: 16px;
  background: linear-gradient(to top, rgba(20,4,10,.78) 0%, rgba(20,4,10,0) 55%); opacity: 0; transition: opacity .4s ease;
}
.fc-pill {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px;
  background: #ffc107; color: #1c1c1c; font-size: .85rem; font-weight: 700;
  transform: translateY(14px); transition: transform .4s cubic-bezier(.2,.7,.2,1);
}
.fc-pill i { transition: transform .3s ease; }
.fc-section .fc-card:hover .fc-veil { opacity: 1; }
.fc-section .fc-card:hover .fc-pill { transform: none; }
.fc-section .fc-card:hover .fc-pill i { transform: translateX(4px); }

/* shine across the photo on hover */
.fc-section .fc-card .faculty-image::after {
  content: ""; position: absolute; z-index: 2; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent); transform: skewX(-18deg);
}
.fc-section .fc-card:hover .faculty-image::after { left: 160%; transition: left .9s ease; }

/* name + role */
.fc-section .fc-card .faculty-content { position: relative; margin-top: 18px; padding-bottom: 12px; }
.fc-section .fc-card .faculty-content h5 { font-weight: 700; font-size: 1.1rem; }
.fc-section .fc-card .faculty-content p { margin: 0; font-size: .92rem; }
.fc-section .fc-card .faculty-content::after {
  content: ""; position: absolute; left: 0; bottom: 0; height: 3px; width: 28px; border-radius: 3px; background: #ffc107;
  transition: width .4s ease;
}
.fc-section .fc-card:hover .faculty-content::after { width: 64px; }

/* owl nav arrows as round buttons */
.fc-section .owl-nav button.owl-prev, .fc-section .owl-nav button.owl-next {
  width: 46px; height: 46px; border-radius: 50% !important;
  background: rgba(255,255,255,.14) !important; border: 1px solid rgba(255,255,255,.35) !important; color: #fff !important;
  transition: background .3s ease, color .3s ease, transform .3s ease;
}
.fc-section .owl-nav button.owl-prev:hover, .fc-section .owl-nav button.owl-next:hover {
  background: #ffc107 !important; color: #1c1c1c !important; border-color: #ffc107 !important; transform: scale(1.1);
}
.fc-section .owl-nav button.disabled { opacity: .35; pointer-events: none; }

/* closing line */
.fc-note { margin: 26px 0 0; text-align: center; color: rgba(255,255,255,.7); font-size: .92rem; animation: fc-rise .6s .45s cubic-bezier(.2,.7,.2,1) both; }

@media (max-width: 767.98px) {
  .fc-subtitle { margin-bottom: 8px; }
  .fc-section .fc-card .faculty-image { aspect-ratio: 1 / 1; }
  .fc-veil { opacity: 1; }   /* no hover on touch screens: keep the pill visible */
  .fc-pill { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .fc-section *, .fc-section *::before, .fc-section *::after { animation: none !important; transition: none !important; }
}
`;

export default function Faculty() {
  const { faculty } = useContent();
  const items = faculty.items || [];
  return (
    <section className="pb-lg-70 pt-lg-70 pb-40 pt-40 theme-bg-01 fc-section">
      <style>{css}</style>
      <span className="fc-ring fc-ring--one" aria-hidden="true" />
      <span className="fc-ring fc-ring--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row mb-lg-30 mb-20 align-items-end">
              <div className="col-md-6">
                <h2 className="font-weight-700 text-white fc-title">{faculty.title}</h2>
                <span className="fc-rule" aria-hidden="true" />
                <p className="fc-subtitle">
                  {faculty.subtitle ||
                    'Learn from experienced teachers who care about your progress, in the classroom and beyond. Meet the people who guide you every day.'}
                </p>
              </div>
              <div className="col-md-6 text-lg-right">
                {faculty.linkLabel && (
                  <a href={faculty.linkHref} className="links-btn-02">
                    {faculty.linkLabel}{' '}
                    <span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                  </a>
                )}
              </div>
            </div>
            {items.length > 0 && (
              <div className="fc-stage">
                <OwlCarousel
                  key={useListKey(items)}
                  className="owl-carousel-04"
                  options={{
                    loop: false,
                    margin: 15,
                    nav: true,
                    dots: false,
                    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } },
                  }}
                >
                  {items.map((f, i) => (
                    <div className="item" key={`${f.href}-${i}`}>
                      <a href={f.href || '#'} target="_blank" rel="noopener noreferrer" className="faculty-box fc-card">
                        <div className="faculty-image">
                          <img src={img(f.img, 600)} alt={f.name} />
                          <span className="fc-veil" aria-hidden="true">
                            <span className="fc-pill">
                              View profile <i className="fa fa-long-arrow-right"></i>
                            </span>
                          </span>
                        </div>
                        <div className="faculty-content mt-20">
                          <h5 className="text-white mb-1">{f.name}</h5>
                          <p className="text-gray-lighter">{f.role}</p>
                        </div>
                      </a>
                    </div>
                  ))}
                </OwlCarousel>
                <p className="fc-note">{faculty.note || 'Use the arrows to meet more of our faculty'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}