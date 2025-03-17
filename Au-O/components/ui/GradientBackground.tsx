/**
 * Lineáris gradient hátteret adó komponens
 * @module ui/GradientBackground
 */
import { LinearGradient } from 'expo-linear-gradient';
/**
 * 
 * @property {any} colors Színek
 * @property {object} style Stílus
 * @property {any} children Gyerek elemek
 * @property {any} start Kezdőpont
 * @property {any} end Végpont
 * @returns 
 */
export default function GradientBackground({colors, style, children, start, end }: {colors?: any , style?: object, children?: any, start?:any, end?:any }) {
  return (
    <LinearGradient
      style={style}
      colors={colors || ['#4c669f', '#3b5998', '#192f6a']}
      start={start ||{ x: 0, y: 0 }}
      end={end || { x: 0, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
