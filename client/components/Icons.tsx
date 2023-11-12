interface IconProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  props?: string;
}
export function IconSm({ Icon, props }: IconProps) {
  return <Icon className={`${props} h-4 w-4 cursor-pointer`} />;
}
export function IconMd({ Icon, props }: IconProps) {
  return <Icon className={`${props} h-6 w-6 cursor-pointer`} />;
}
export function IconLg({ Icon, props }: IconProps) {
  return <Icon className={`${props} h-10 w-10 cursor-pointer`} />;
}
