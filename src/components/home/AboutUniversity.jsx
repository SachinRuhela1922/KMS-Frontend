import { Fragment } from 'react';
import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';
import './AboutUniversity.css';

function SlideButtons({ slide }) {
  const buttons = (slide.buttons || []).filter((b) => b.label);
  if (!buttons.length) return null;

  if (slide.inlineButtons) {
    return (
      <div className="kms-about__btns kms-about__btns--inline">
        {buttons.map((b, i) => (
          <Fragment key={`${b.href}-${i}`}>
            <a
              className="btn btn-warning kms-about__btn kms-about__btn--sm"
              href={b.href}
              tabIndex={0}
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.label}
            </a>
          </Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="kms-about__btns">
      {buttons.map((b, i) => (
        <Fragment key={`${b.href}-${i}`}>
          <a href={b.href} className="btn btn-warning kms-about__btn" tabIndex={0}>
            {b.label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}

export default function AboutUniversity() {
  const { about } = useContent();
  const slides = about.slides || [];

  return (
    <section className="kms-about pb-lg-60 pt-lg-20 pt-30 pb-30">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="text-center mb-lg-30 mb-20 kms-about__head">
              <h2 className="font-weight-700 kms-about__title">{about.title}</h2>
              <span className="kms-about__line" aria-hidden="true" />
            </div>

            <div className="col-md-10 m-auto p-0 text-center mb-lg-40 mb-30">
              <div className="col-md-10 m-auto p-0 text-center mb-lg-40 mb-30 kms-about__intro">
                {about.intro && <h6 className="kms-about__lead">{about.intro}</h6>}
                {about.body && <p className="kms-about__body">{about.body}</p>}
              </div>
            </div>

            {slides.length > 0 && (
              <div className="kms-about__slider-wrap">
                <OwlCarousel
                  key={useListKey(slides)}
                  className="about-slider"
                  options={{ loop: slides.length > 1, margin: 0, dots: true, items: 1, nav: false }}
                >
                  {slides.map((slide, i) => (
                    <div className="item" key={`${slide.title}-${i}`}>
                      <div className="about-slider-items kms-about__card">
                        <div className="row align-items-center no-gutters">
                          <div className="col-md-7">
                            <div className="kms-about__imgbox">
                              <img
                                src={img(slide.img, 1400)}
                                alt={slide.alt || slide.title}
                                className="about-slider-items-thumb"
                              />
                              <span className="kms-about__imgshade" aria-hidden="true" />
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="about-slider-items-content kms-about__content text-white p-lg-30 pt-lg-40 pb-lg-40 p-30">
                              <h5 className="text-gray-silver font-24 kms-about__sub">{slide.sub}</h5>
                              <h3 className="font-weight-700 mb-lg-20 kms-about__slide-title">{slide.title}</h3>
                              <SlideButtons slide={slide} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}