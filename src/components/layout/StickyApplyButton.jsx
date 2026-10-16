import { useContent } from '../../context/ContentContext.jsx';

export default function StickyApplyButton() {
  const { settings } = useContent();
  if (!settings.applyLabel) return null;
  return (
    <a href={settings.applyUrl} className="sticky-apply-now" target="_blank" rel="noopener noreferrer">
      {settings.applyLabel}
    </a>
  );
}
