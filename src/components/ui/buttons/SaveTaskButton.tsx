import PrimaryButton from "components/shared/PrimaryButton";
type SaveTaskButtonProps = {
  onPress: () => void;
};
export default function SaveTaskButton({ onPress }: SaveTaskButtonProps) {
  return (
    <PrimaryButton onPress={onPress} style={{ marginTop: 30 }}>
      Save Changes
    </PrimaryButton>
  );
}
