import { stdin } from 'mock-stdin'
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const io = stdin();

async function answer(text: string) {
  io.send(text);
  io.send(`\n`);
  await delay(10);
}

export async function userSession(sequence: string[]) {
  const sendKeystrokes = async () => {
    for (let i = 0; i < sequence.length; i++) {
      await answer(sequence[i]);
    }
  };
  setTimeout(() => sendKeystrokes().then(), 5);

}
