import { useEffect } from 'react';

const CSE_ID = 'gcse-script';
const CSE_SRC = 'https://cse.google.com/cse.js?cx=440427d6ee49f4362';

/** Full-width search overlay (Google Programmable Search), toggled from the Navbar search icon. */
export default function SearchPopup({ open, onToggle }) {
  useEffect(() => {
    if (document.getElementById(CSE_ID)) return;
    const s = document.createElement('script');
    s.id = CSE_ID;
    s.async = true;
    s.src = CSE_SRC;
    document.body.appendChild(s);
  }, []);

  return (
    <section>
      <div className={`search-input-area${open ? ' search-input-area-show' : ''}`}>
        <div className="search-input-inner">
          <div className="container">
            <form className="d-none" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Search by keyword or #" autoComplete="off" />
                <button className="btn btn-warning">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
            <div className="gcse-search"></div>
          </div>
          <div className="search-close-icon search-in-website" onClick={onToggle}>
            <i className="fa fa-times"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
