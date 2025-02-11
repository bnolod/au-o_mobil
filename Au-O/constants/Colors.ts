

const tintColorLight = '#232323';
const tintColorDark = '#F3E5E5';

export const Colors = {
  light: {
    background: '#FFF0F0',
    primary: '#F3E5E5',
    secondary: '#E7DADA',
    text: '#1B1B1B',
    tint: tintColorLight,
    icon: '#E7DADA',
    tabIconDefault: '#',
    tabIconSelected: '#f7898f',
  },
  dark: {
    background: '#1B1B1B',
    primary: '#232323',
    secondary: '#2b2b2b',

    text: '#FFF0F0',
    tint: tintColorDark,
    icon: '#2b2b2b',
    tabIconDefault: '#790e1c',
    tabIconSelected: "tintColorDark",
  },
  highlight: {
    main: "#EF1A2D",
    dark: "#790E1C",
    light: "#F7898F"
  }
};
export const Styles = {
  buttonShadow: {
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
  }
}
