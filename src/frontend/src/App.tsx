import { GameView } from './game/GameView';
import { ThemeProvider } from 'next-themes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <GameView />
    </ThemeProvider>
  );
}
