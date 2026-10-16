import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';
import SmartLink from '../common/SmartLink.jsx';

// Optional content: students.subtitle / students.highlights / students.note se override ho sakta hai.
const DEFAULT_HIGHLIGHTS = [
  { icon: 'fa-life-ring', title: 'Guidance & support', text: 'Mentors and counsellors are here to help you at every step.' },
  { icon: 'fa-users', title: 'Clubs & activities', text: 'Find a group, build a new skill and make friends along the way.' },
  { icon: 'fa-calendar', title: 'Events & celebrations', text: 'Fests, sports days and cultural programmes through the year.' },
];
const DEFAULT_CARD_TEXT = 'Resources, activities and support made for students like you.';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `sc-` se start hoti hain.
const css = `
.sc-section { position: relative; overflow: hidden; isolation: isolate; }
.sc-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%); mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.sc-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.sc-blob--one { width: 320px; height: 320px; top: -130px; left: -90px; background: rgba(255,193,7,.26); animation: sc-float 16s ease-in-out infinite alternate; }
.sc-blob--two { width: 300px; height: 300px; bottom: -130px; right: -100px; background: rgba(60,80,160,.11); animation: sc-float 20s ease-in-out infinite alternate-reverse; }
@keyframes sc-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes sc-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes sc-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* heading */
.sc-title { letter-spacing: -.015em; margin-bottom: 12px !important; animation: sc-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.sc-rule { display: block; width: 64px; height: 4px; margin-bottom: 14px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: sc-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.sc-subtitle { max-width: 54ch; margin: 0; color: #5b6170; line-height: 1.65; animation: sc-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }
.sc-section .links-btn-01 { display: inline-flex; align-items: center; gap: 8px; transition: gap .3s ease; animation: sc-rise .6s .2s cubic-bezier(.2,.7,.2,1) both; }
.sc-section .links-btn-01:hover { gap: 16px; }

/* image card with the text laid over the photo */
.sc-col { opacity: 0; animation: sc-rise .7s calc(.25s + var(--i, 0) * .12s) cubic-bezier(.2,.7,.2,1) forwards; }
.sc-section .sc-card {
  position: relative; overflow: hidden; isolation: isolate; height: 440px;
  border-radius: 22px; background: #1b1b2a;
  box-shadow: 0 22px 40px -26px rgba(20,30,70,.7);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease;
}
.sc-section .sc-card:hover { transform: translateY(-8px); box-shadow: 0 34px 52px -26px rgba(20,30,70,.8); }

.sc-section .sc-card .grid-style-04-image { position: absolute; inset: 0; margin: 0; height: 100%; }
.sc-section .sc-card .grid-style-04-image img {
  display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.001);
  transition: transform 1s cubic-bezier(.2,.7,.2,1);
}
.sc-section .sc-card:hover .grid-style-04-image img { transform: scale(1.1); }

/* shine across the photo on hover */
.sc-section .sc-card::before {
  content: ""; position: absolute; z-index: 3; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.3), transparent); transform: skewX(-18deg);
}
.sc-section .sc-card:hover::before { left: 160%; transition: left .9s ease; }

/* the panel at the bottom: reset theme positioning, then style */
.sc-section .sc-card .grid-style-04-content {
  position: absolute; z-index: 2; inset: auto 0 0 0; width: auto; height: auto; transform: none; opacity: 1; margin: 0;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
  padding: 90px 24px 24px !important;
  background: linear-gradient(to top, rgba(14,8,26,.92) 0%, rgba(14,8,26,.75) 45%, transparent 100%);
}
.sc-section .sc-card .grid-style-04-content h4 {
  position: relative; margin: 0 0 6px; padding-top: 16px; color: #fff; font-weight: 700; font-size: 1.35rem; line-height: 1.3;
}
.sc-section .sc-card .grid-style-04-content h4::before { /* yellow bar above the title */
  content: ""; position: absolute; top: 0; left: 0; width: 36px; height: 4px; border-radius: 4px; background: #ffc107; transition: width .45s ease;
}
.sc-section .sc-card:hover .grid-style-04-content h4::before { width: 72px; }

/* description: slides open on hover (always open on touch/mobile) */
.sc-section .sc-card .hover-content {
  display: block; margin: 0; max-height: 0; overflow: hidden; opacity: 0; transform: translateY(10px);
  color: rgba(255,255,255,.85); font-size: .95rem; line-height: 1.55;
  transition: max-height .5s ease, opacity .4s ease, transform .4s ease, margin .4s ease;
}
.sc-section .sc-card:hover .hover-content { max-height: 90px; opacity: 1; transform: none; margin-bottom: 4px; }

/* button: pill, fills yellow on hover */
.sc-section .sc-card .btn-outline-light {
  position: relative; overflow: hidden; margin-top: 12px;
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 999px !important; padding: 9px 22px; font-weight: 700;
  border: 1.5px solid rgba(255,255,255,.7); color: #fff;
  transition: background .3s ease, color .3s ease, border-color .3s ease, gap .3s ease, transform .2s ease;
}
.sc-section .sc-card .btn-outline-light:hover { background: #ffc107; border-color: #ffc107; color: #1c1c1c; gap: 14px; }
.sc-section .sc-card .btn-outline-light:active { transform: scale(.97); }
.sc-section a:focus-visible { outline: 3px solid #ffc107; outline-offset: 3px; }

/* highlights strip */
.sc-highlights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 44px; }
.sc-hl {
  display: flex; align-items: flex-start; gap: 16px; padding: 20px;
  background: #fff; border-radius: 18px; border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 14px 30px -24px rgba(20,30,70,.55);
  opacity: 0; animation: sc-rise .6s calc(.7s + var(--i, 0) * .1s) cubic-bezier(.2,.7,.2,1) forwards;
  transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .35s ease;
}
.sc-hl:hover { transform: translateY(-5px); border-color: rgba(255,193,7,.7); box-shadow: 0 24px 36px -24px rgba(20,30,70,.6); }
.sc-hl-icon {
  flex: 0 0 auto; width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center;
  background: #fff4cc; color: #b78300; font-size: 1.2rem; transition: transform .3s ease, background .3s ease, color .3s ease;
}
.sc-hl:hover .sc-hl-icon { transform: rotate(-8deg) scale(1.08); background: #ffc107; color: #1c1c1c; }
.sc-hl h6 { margin: 0 0 4px; font-weight: 700; font-size: 1rem; color: #1c1c1c; }
.sc-hl p { margin: 0; font-size: .9rem; line-height: 1.55; color: #5b6170; }

@media (max-width: 991.98px) {
  .sc-section .sc-card { height: 380px; }
  .sc-highlights { grid-template-columns: 1fr; margin-top: 28px; }
}
@media (hover: none), (max-width: 991.98px) {
  .sc-section .sc-card .hover-content { max-height: 90px; opacity: 1; transform: none; margin-bottom: 4px; }
}
@media (max-width: 575.98px) {
  .sc-section .sc-card { height: 360px; border-radius: 18px; }
  .sc-section .sc-card .grid-style-04-content { padding: 80px 18px 20px !important; }
}
@media (prefers-reduced-motion: reduce) {
  .sc-section *, .sc-section *::before, .sc-section *::after { animation: none !important; transition: none !important; opacity: 1 !important; }
}
`;

export default function StudentsCorner() {
  const { students } = useContent();
  const highlights = students.highlights || DEFAULT_HIGHLIGHTS;
  return (
    <section className="pb-lg-70 pt-lg-70 pb-40 pt-40 bg-white-f1 sc-section">
      <style>{css}</style>
      <span className="sc-blob sc-blob--one" aria-hidden="true" />
      <span className="sc-blob sc-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row mb-lg-30 mb-20 align-items-end">
              <div className="col-md-6">
                <h2 className="font-weight-700 m-0 sc-title">{students.title}</h2>
                <span className="sc-rule" aria-hidden="true" />
                <p className="sc-subtitle">
                  {students.subtitle ||
                    'Everything a student needs in one place: learning resources, campus life and the support to make the most of both.'}
                </p>
              </div>
              <div className="col-md-6 text-lg-right">
                {students.linkLabel && (
                  <SmartLink href={students.linkHref} className="links-btn-01">
                    {students.linkLabel}{' '}
                    <span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                  </SmartLink>
                )}
              </div>
            </div>
            <div>
              <div className="row">
                {(students.items || []).map((c, i) => (
                  <div className="col-lg-4 sc-col" key={`${c.title}-${i}`} style={{ '--i': i }}>
                    <div className="grid-style-04 mb-lg-0 mb-20 sc-card">
                      <div className="grid-style-04-image">
                        <img src={img(c.img, 900)} width="100%" alt="" />
                      </div>
                      <div className="grid-style-04-content pt-lg-40 pb-lg-40 pt-20 pb-20 pl-20 pr-20">
                        <div>
                          <h4 className="font-weight-600">{c.title}</h4>
                          <p className="hover-content">{c.text || DEFAULT_CARD_TEXT}</p>
                        </div>
                        <SmartLink href={c.href} className="btn-outline-light btn rounded-0">
                          {students.buttonLabel}{' '}
                          <span>
                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                          </span>
                        </SmartLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {highlights.length > 0 && (
              <div className="sc-highlights">
                {highlights.map((h, i) => (
                  <div className="sc-hl" key={`${h.title}-${i}`} style={{ '--i': i }}>
                    <span className="sc-hl-icon" aria-hidden="true">
                      <i className={`fa ${h.icon || 'fa-star'}`}></i>
                    </span>
                    <div>
                      <h6>{h.title}</h6>
                      <p>{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}