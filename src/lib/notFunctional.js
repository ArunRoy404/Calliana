/**
 * The `Button` props that mark an action as not wired up yet (rule 8), with
 * the toast copy taken from a content bundle's `notFunctionalMessage` /
 * `notFunctionalDescription`. Spread onto any `Button` or pass as a row's
 * `actionProps`.
 */
export function notFunctionalProps(content) {
  return {
    notFunctional: true,
    notFunctionalMessage: content?.notFunctionalMessage,
    notFunctionalDescription: content?.notFunctionalDescription,
  };
}
