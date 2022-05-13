export interface IProps {
  onConfirmClick: () => void;
  onRejectClick: () => void;
  confirmText: string;
  title: string;
  content: string;
  rejectText: string;
}
