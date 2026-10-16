import { Link } from 'react-router-dom';
import { isInternal } from '../../lib/media.js';

/** Router <Link> for internal paths, plain <a> for external URLs. (Do not use inside Owl carousels.) */
export default function SmartLink({ href = '#', newTab, children, ...rest }) {
  if (isInternal(href) && !newTab) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = newTab || /^https?:\/\//.test(href);
  return (
    <a href={href} target={newTab ? '_blank' : undefined} rel={external && newTab ? 'noopener noreferrer' : undefined} {...rest}>
      {children}
    </a>
  );
}
