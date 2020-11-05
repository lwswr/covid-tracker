export function unreachable(t: never) {
  throw new Error("unreachable " + t);
}
