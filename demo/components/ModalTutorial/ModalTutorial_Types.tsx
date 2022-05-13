export interface IProps {
  isVisible: boolean;
  onPressAgree: () => void;
  title: string;
  textContent: string;
  note: string;
  agree: string;
  content: string;
  onRequestClose: () => void;
}
