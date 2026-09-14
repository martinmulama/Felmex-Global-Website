import './SplitPanelPreloader.css';

export function SplitPanelPreloader({ isAppLoaded }) {
  return (
    <div id="split-preloader" className={isAppLoaded ? 'is-loaded' : ''} aria-hidden="true">
      <div className="split-preloader__wordmark">
        <svg viewBox="0 0 610 80" focusable="false">
          <path d="M0 0h82v17H20v16h54v17H20v30H0z M102 0h82v17h-62v14h55v17h-55v15h62v17h-82z M205 0h20v62h60v18h-80z M305 80V0h20l30 34 30-34h20v80h-20V29l-30 33-30-33v51z M426 0h78v17h-58v14h52v17h-52v15h58v17h-78z M520 0h23l22 26 22-26h23l-34 40 34 40h-23l-22-26-22 26h-23l34-40z" />
        </svg>
      </div>
    </div>
  );
}
