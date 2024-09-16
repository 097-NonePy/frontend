import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Predictions',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic-chat'),
  },
  {
    title: 'Compare',
    path: '/compare',
    icon: icon('ic-balance'),
  },
];
