import './SplitPanelPreloader.css';

export function SplitPanelPreloader({ isAppLoaded }) {
  return (
    <div id="split-preloader" className={isAppLoaded ? 'is-loaded' : ''} aria-hidden="true">
      <div className="panel-left" />
      <div className="panel-right" />
    </div>
  );
}
