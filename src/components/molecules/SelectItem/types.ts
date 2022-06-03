export interface AccountProps {
  label: string;
  value: any;
  description?: string;
  checkboxId: string;
  onSelect: (key: any) => void;
  selected: boolean;
}
