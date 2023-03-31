export default function genPosition(oldIndex) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
  } while (oldIndex === newIndex);
  return newIndex;
}
