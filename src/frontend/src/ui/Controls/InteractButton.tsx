import { useInputMode } from '../../game/Input/useInputMode';

export function InteractButton() {
  const { setInteractPressed } = useInputMode();

  const handlePress = () => {
    setInteractPressed(true);
    setTimeout(() => setInteractPressed(false), 100);
  };

  return (
    <button
      onTouchStart={handlePress}
      className="w-20 h-20 touch-none no-select active:scale-95 transition-transform"
      style={{
        backgroundImage: 'url(/assets/generated/mobile-interact-button.dim_256x256.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
      aria-label="Interact"
    />
  );
}
