import { useState } from 'react';
import { PageHeader } from '../../components/common/PageRenderer.jsx';
import { Reveal } from '../../components/common/Reveal.jsx';
import usePageTitle from '../../lib/usePageTitle.js';
import { useContent } from '../../context/ContentContext.jsx';
import { SCHOOL } from '../../data/school/site.js';
import shared from '../../components/common/InnerPage.module.css';
import s from './Contact.module.css';

const INFO = [
  { icon: 'fa-phone', title: 'Call us', lines: [SCHOOL.phone], href: `tel:+${SCHOOL.phoneRaw}` },
  { icon: 'fa-whatsapp', title: 'WhatsApp', lines: ['Chat with the school office'], href: `https://wa.me/${SCHOOL.phoneRaw}` },
  { icon: 'fa-envelope', title: 'Email', lines: [SCHOOL.admissionEmail, SCHOOL.email], href: `mailto:${SCHOOL.admissionEmail}` },
  { icon: 'fa-map-marker', title: 'Visit', lines: [SCHOOL.address, SCHOOL.officeHours], href: SCHOOL.mapUrl },
];

// Page: /contact-us  (no backend needed: the form opens WhatsApp with the message filled in)
export default function Contact() {
  const { pageContent, classes } = useContent();
  const page = pageContent['contact-us'];
  usePageTitle(page.title);
  const [f, setF] = useState({ name: '', phone: '', cls: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text = `Hello ${SCHOOL.name},\nName: ${f.name}\nPhone: ${f.phone}\nClass: ${f.cls || '-'}\n${f.msg}`;
    window.open(`https://wa.me/${SCHOOL.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <div className={shared.page}>
      <PageHeader page={page} s={shared} />
      <section className={shared.body}>
        <div className={s.wrap}>
          <div className={s.info}>
            {INFO.map((i, k) => (
              <Reveal key={i.title} delay={k * 80}>
                <a className={s.item} href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <span className={s.icon}><i className={`fa ${i.icon}`} aria-hidden="true"></i></span>
                  <span>
                    <strong>{i.title}</strong>
                    {i.lines.map((l) => <small key={l}>{l}</small>)}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className={s.formBox} delay={120}>
            <h2>Send us a message</h2>
            <p>Fill in the details and we will reply on WhatsApp the same day.</p>
            {sent && <div className={s.ok}><i className="fa fa-check-circle"></i> WhatsApp opened with your message. Thank you!</div>}
            <form onSubmit={submit}>
              <div className={s.row}>
                <label>Parent / student name<input required value={f.name} onChange={set('name')} placeholder="Your name" /></label>
                <label>Mobile number<input required type="tel" pattern="[0-9+ ]{10,14}" value={f.phone} onChange={set('phone')} placeholder="98765 43210" /></label>
              </div>
              <label>Class for admission
                <select value={f.cls} onChange={set('cls')}>
                  <option value="">Select class (optional)</option>
                  {(classes?.items || []).map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                </select>
              </label>
              <label>Message<textarea rows="4" required value={f.msg} onChange={set('msg')} placeholder="How can we help you?" /></label>
              <button type="submit">Send on WhatsApp <i className="fa fa-long-arrow-right"></i></button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
