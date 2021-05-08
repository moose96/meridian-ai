const scrollSettings = (theme) => ({
  duration: 1000,
  smooth: true,
  offset: -(theme.sizes.header * theme.typography.htmlFontSize) + 1,
});

export default scrollSettings;
