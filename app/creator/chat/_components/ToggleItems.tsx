import { Switch } from "@/components/ui/switch";

interface Props {
  label: string;
  checked: boolean;
}

const ToggleItems = ({ label, checked }: Props) => {
  return (
    <>
      <div className="flex justify-between gap-60">
        <div className="text-xl">{label}</div>
        <Switch checked={checked} />
      </div>
    </>
  );
};

export default ToggleItems;
