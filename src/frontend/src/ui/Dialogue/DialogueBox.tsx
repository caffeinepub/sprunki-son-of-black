import { useDialogue } from '../../game/Dialogue/DialogueContext';

export function DialogueBox() {
  const { currentLine, isVisible } = useDialogue();

  if (!isVisible || !currentLine) return null;

  return (
    <div className="relative w-full px-4 pb-4">
      <div 
        className="relative mx-auto max-w-4xl bg-cover bg-center p-6 jagged-border"
        style={{
          backgroundImage: 'url(/assets/generated/dialogue-box-frame.dim_1024x256.png)',
          backgroundSize: '100% 100%',
          minHeight: '120px'
        }}
      >
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="threat-text text-2xl md:text-3xl text-center">
            {currentLine}
          </p>
        </div>
      </div>
    </div>
  );
}
