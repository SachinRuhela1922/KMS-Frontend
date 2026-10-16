import { Fragment } from 'react';
import usePageTitle from '../../lib/usePageTitle.js';
import SmartLink from './SmartLink.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img as optImg } from '../../lib/media.js';
import b from './PageBlocks.module.css';

// "line 1\n\nline 2" -> two paragraphs ; single line breaks stay as <br>
function Paragraphs({ text, className }) {
  const parts = String(text || '').split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  return parts.map((p, i) => (
    <p className={className} key={i}>
      {p.split('\n').map((line, k, arr) => (
        <Fragment key={k}>{line}{k < arr.length - 1 ? <br /> : null}</Fragment>
      ))}
    </p>
  ));
}

function Block({ block, s }) {
  const x = block || {};
  const title = x.title ? <h3 className={s.heading}>{x.title}</h3> : null;

  switch (x.type) {
    case 'heading':
      return x.level === 'h3' ? <h3 className={s.heading}>{x.text}</h3> : <h2 className={s.heading}>{x.text}</h2>;

    case 'paragraph':
      return <Paragraphs text={x.text} className={s.text} />;

    case 'list':
      return (
        <ul className={s.list}>
          {(x.bullets || []).filter((i) => i?.text).map((i, k) => <li key={k}>{i.text}</li>)}
        </ul>
      );

    case 'stats':
      return (
        <div className={s.stats}>
          {(x.stats || []).map((i, k) => (
            <div className={s.stat} key={k}>
              <strong>{i.value}</strong>
              <span>{i.label}</span>
            </div>
          ))}
        </div>
      );

    case 'cards':
      return (
        <>
          {title}
          <div className={b.cards}>
            {(x.cards || []).map((c, k) => (
              <div className={b.card} key={k}>
                {c.img ? <img className={b.cardImg} src={optImg(c.img, 600)} alt={c.title || ''} loading="lazy" /> : null}
                <div className={b.cardBody}>
                  {c.title ? <h4 className={b.cardTitle}>{c.title}</h4> : null}
                  {c.text ? <p className={b.cardText}>{c.text}</p> : null}
                  {c.href ? <SmartLink href={c.href} className={b.cardLink}>{c.linkLabel || 'Learn more'} →</SmartLink> : null}
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'steps':
      return (
        <>
          {title}
          <ol className={b.steps}>
            {(x.steps || []).map((c, k) => (
              <li key={k}>
                <span className={b.stepNo}>{k + 1}</span>
                <div>
                  <h4 className={b.stepTitle}>{c.title}</h4>
                  {c.text ? <p className={b.stepText}>{c.text}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </>
      );

    case 'faq':
      return (
        <>
          {title}
          <div className={b.faq}>
            {(x.faqs || []).map((f, k) => (
              <details key={k} className={b.faqItem}>
                <summary>{f.q}</summary>
                <Paragraphs text={f.a} className={b.faqAnswer} />
              </details>
            ))}
          </div>
        </>
      );

    case 'table': {
      const cols = [['col1', 'c1'], ['col2', 'c2'], ['col3', 'c3']].filter(([h, c]) => x[h] || (x.rows || []).some((r) => r?.[c]));
      return (
        <>
          {title}
          <div className={b.tableWrap}>
            <table className={b.table}>
              <thead><tr>{cols.map(([h]) => <th key={h}>{x[h]}</th>)}</tr></thead>
              <tbody>
                {(x.rows || []).map((r, k) => (
                  <tr key={k}>{cols.map(([h, c]) => <td key={h}>{r?.[c]}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    case 'quote':
      return (
        <blockquote className={b.quote}>
          <Paragraphs text={x.text} className={b.quoteText} />
          {x.author ? <footer>— {x.author}</footer> : null}
        </blockquote>
      );

    case 'callout':
      return (
        <div className={b.callout}>
          {x.title ? <strong>{x.title}</strong> : null}
          <Paragraphs text={x.text} className={b.calloutText} />
        </div>
      );

    case 'image':
      return x.img ? (
        <figure className={b.figure}>
          <img src={optImg(x.img, 1200)} alt={x.caption || ''} loading="lazy" />
          {x.caption ? <figcaption>{x.caption}</figcaption> : null}
        </figure>
      ) : null;

    case 'button':
      return x.label ? (
        <p>
          <SmartLink href={x.href || '#'} className={s.button}>{x.label}</SmartLink>
        </p>
      ) : null;

    default:
      return null;
  }
}

/**
 * Renders one inner page from the Admin Panel content.
 *  - `id`      : key inside content.pageContent  (ready-made pages)
 *  - `data`    : OR pass the page object directly (pages created in Admin -> New Pages)
 *  - `styles`  : the page's own CSS module (design stays per-page)
 */
export default function PageRenderer({ id, data, styles: s }) {
  const content = useContent();
  const page = data || content.pageContent?.[id] || {};
  usePageTitle(page.seoTitle || page.title);

  const hasBg = !!page.heroImage;
  const headerStyle = hasBg
    ? { background: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('${page.heroImage}') center/cover no-repeat` }
    : undefined;
  const onBg = hasBg ? { color: '#fff' } : undefined;

  return (
    <div className={s.page}>
      <section className={s.header} style={headerStyle}>
        <div className={s.headerInner}>
          <h1 className={s.title} style={onBg}>{page.title}</h1>
          {page.intro ? <p className={s.intro} style={onBg}>{page.intro}</p> : null}
        </div>
      </section>

      <section className={s.body}>
        <div className={s.container}>
          {(page.blocks || []).map((block, i) => (
            <Block key={i} block={block} s={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
