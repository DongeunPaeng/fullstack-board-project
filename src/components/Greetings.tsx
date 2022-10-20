import { GreetingsProps } from "types";

const Greetings: React.FunctionComponent<GreetingsProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-16">
      <div className="font-extrabold text-gray-900">{title}</div>
      <div className="text-gray-400">{subtitle}</div>
    </div>
  );
};

export default Greetings;
