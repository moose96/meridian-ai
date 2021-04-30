import 'flag-icon-css/css/flag-icon.min.css';

export default function FlagIcon({ id }) {
  return (
    <span
      className={`flag-icon flag-icon-${id}`}
      style={{ marginRight: '1rem' }}
    />
  );
}
