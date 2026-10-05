/** "04:23" for 263 seconds — minutes and seconds, both two digits. */
export function formatElapsed(totalSeconds = 0) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = `${Math.floor(seconds / 60)}`.padStart(2, "0");
  return `${minutes}:${`${seconds % 60}`.padStart(2, "0")}`;
}
