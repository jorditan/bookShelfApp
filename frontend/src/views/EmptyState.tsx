import { Book } from "lucide-react";
import Button from "../components/Button";

interface Props {
  description: string;
  buttonLabel: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

const EmptyState = ({ description, buttonLabel, onClick, icon }: Props) => {
  return (
    <div className="flex items-center justify-center h-full w-full py-20 text-wrap">
      <div className="text-wrap w-2/4 gap-4 flex flex-col items-center">
        <div className="px-4 py-4 bg-default border border-gray-600 rounded-2xl">
          {icon ? icon : <Book className="w-12 h-12 text-body" />}
        </div>
        <p className="text-body text-center flex flex-col w-3/4">
          {description}
        </p>
        <Button label={buttonLabel} onClick={onClick} />
      </div>
    </div>
  );
};

export default EmptyState;
