const BREAKPOINTS = {
  mobileMax: 960,
  middleMin: 961,
  middleMax: 1600,
  nonMobileMin: 961,
};

export const MQ = {
  mobile: `(max-width: ${BREAKPOINTS.mobileMax}px)`,
  middle: `(min-width: ${BREAKPOINTS.middleMin}px) and (max-width: ${BREAKPOINTS.middleMax}px)`,
  nonMobile: `(min-width: ${BREAKPOINTS.nonMobileMin}px)`,
};
