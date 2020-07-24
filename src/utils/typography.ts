import Typography from 'typography';
import noriegaTheme from 'typography-theme-noriega';

const typography = new Typography({
  ...noriegaTheme,
  googleFonts: [{ name: 'Montserrat', styles: ['400', '700'] }],
  headerFontFamily: ['Montserrat', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'sans-serif'],
});

export const { scale, rhythm, options } = typography;
export default typography;
