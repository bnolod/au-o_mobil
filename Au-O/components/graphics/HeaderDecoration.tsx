import { Colors } from "@/constants/Colors";
import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";   
import type { SvgProps } from "react-native-svg";        
const SvgHeaderDecoration = (props: SvgProps & { boxWidth: number, theme?: string }) => (       
  <Svg
    viewBox={`0 0 ${props.boxWidth} 250`}
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    {...props}
  >
    <Mask
      id="HeaderDecoration_svg__a"
      width={props.boxWidth}
      height={202}
      
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path d={`M0 0h${props.boxWidth}v202H0z`} />        
    </Mask>
    <G mask="url(#HeaderDecoration_svg__a)">
      <Path
        fill={props.theme === 'dark' ? Colors.highlight.dark : Colors.highlight.light}
        d="M219.019 99.64c0 56.179-103.874 101.722-232.01 101.722C-141.125 201.362-245 155.819-245 99.639S-141.126-2.084-12.99-2.084c128.135 0 232.009 45.543 232.009 101.723"
      />
      <Path
        fill={props.theme === 'dark' ? Colors.highlight.dark : Colors.highlight.light}
        d="M532.933 151.447c-16.68 53.857-129.802 66.713-252.666 28.716S71.322 67.703 88.001 13.847s129.802-66.712 252.667-28.715C463.532 23.129 549.612 97.59 532.933 151.447"
      />
      <Path
        fill={Colors.highlight.main}
        d="M219.019 90.345c0 56.18-103.874 101.722-232.01 101.722C-141.125 192.067-245 146.525-245 90.345S-141.126-11.378-12.99-11.378c128.135 0 232.009 45.543 232.009 101.723"
      />
      <Path
        fill={Colors.highlight.main}
        d="M532.933 142.153c-16.68 53.856-129.802 66.713-252.666 28.715S71.322 58.409 88.001 4.553c16.68-53.857 129.802-66.713 252.667-28.716 122.864 37.997 208.944 112.46 192.265 166.316"
      />
    </G>
  </Svg>
);
export default SvgHeaderDecoration;