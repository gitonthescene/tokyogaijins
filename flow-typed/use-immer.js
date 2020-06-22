declare module "use-immer" {
  declare export function useImmer<S>(
    def: S
  ): [S, (f: (draft: S) => S | void) => void];
}
