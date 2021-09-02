import { Svg } from './Svg';

type ApiCompProps = {
  color: string;
  onClick: () => void;
};
export const MinimalApiComp = ({ color, onClick }: ApiCompProps) => (
  <div>
    <button onClick={onClick}>
      <Svg color={color} />
    </button>
  </div>
);
