import { SVGProps } from 'react';
import * as icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

const DEFAULT_SIZE = 24;

type IconType = keyof typeof icons;

interface Props extends SVGProps<SVGSVGElement> {
  iconType: IconType;
}

export default function Icon({ iconType, color, width = DEFAULT_SIZE, height = DEFAULT_SIZE, ...restProps }: Props) {
  const Icon = icons[iconType];

  return <Icon fill={color} width={width} height={height} className={cn({ 'fill-gray-500': !color })} {...restProps} />;
}
