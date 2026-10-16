import TourBox from './TourBox.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import SmartLink from '../common/SmartLink.jsx';
import './Programmes.css';

export default function Programmes() {
  const { programmes: p, tour } = useContent();
  return (
    <section className="pb-lg-60 pt-lg-60 pb-30 pt-30 pg-section">
      <span className="pg-blob pg-blob--one" aria-hidden="true" />
      <span className="pg-blob pg-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="pg-head text-center">
          <h2 className="font-weight-700 m-0 pg-title">{p.title}</h2>
          <span className="pg-rule" aria-hidden="true" />
          <p className="pg-subtitle">
            {p.subtitle || 'Explore our programmes, apply online and plan a visit, all in one place.'}
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              {/* Programme cards */}
              <div className="col-lg-7 mb-lg-0 mb-30">
                <div className="row no-gutters pg-grid">
                  {(p.items || []).map((it, i) => (
                    <div className="col-6 p-lg-2 p-1" key={`${it.title}-${i}`} style={{ '--i': i }}>
                      <SmartLink href={it.href} className="theme-bg-01 d-block rounded hover-effect-01 h-100 pg-card">
                        <h5 className="text-white pg-card-title">{it.title}</h5>
                        <div className="text-white pg-card-text">{it.text && <p>{it.text}</p>}</div>
                        <div className="pg-card-arrow">
                          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </div>
                      </SmartLink>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply / Know more / Tour */}
              <div className="col-lg-5">
                <div className="pg-side">
                  <div className="pg-action">
                    <span className="pg-action-icon" aria-hidden="true">
                      <i className="fa fa-graduation-cap"></i>
                    </span>
                    <div className="pg-action-body">
                      <p className="pg-action-text">{p.applyText}</p>
                      <SmartLink href={p.applyHref} className="font-weight-700 rounded-pill theme-bg-01 btn-warning btn text-white border-0 pg-btn">
                        {p.applyLabel}
                      </SmartLink>
                    </div>
                  </div>

                  <div className="pg-action">
                    <span className="pg-action-icon" aria-hidden="true">
                      <i className="fa fa-info-circle"></i>
                    </span>
                    <div className="pg-action-body">
                      <p className="pg-action-text">{p.knowText}</p>
                      <SmartLink href={p.knowHref} className="font-weight-700 rounded-pill theme-bg-01 btn-warning btn text-white border-0 pg-btn">
                        {p.knowLabel}
                      </SmartLink>
                    </div>
                  </div>

                  {tour.enabled && (
                    <div className="pg-tour">
                      <TourBox />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}