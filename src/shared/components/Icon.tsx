import { SVGProps } from 'react';
import * as icons from '@/assets/icons';

const DEFAULT_SIZE = 24;

type IconType = keyof typeof icons;

interface Props extends SVGProps<SVGSVGElement> {
  iconType: IconType;
}

export function Icon({
  iconType,
  color = '#6b7280',
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  ...restProps
}: Props) {
  const Icon = icons[iconType];

  return <Icon fill={color} width={width} height={height} {...restProps} />;
}
