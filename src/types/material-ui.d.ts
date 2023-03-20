import { myTheme } from '@/theme';

type MyTheme = typeof myTheme;

type MyMakeStyles = {
  <Params = void, RuleNameSubsetReferencableInNestedSelectors extends string = never>(
    params?:
      | {
          name?: string | Record<string, unknown> | undefined | null;
          uniqId?: string | undefined;
        }
      | undefined,
  ): <RuleName extends string>(
    cssObjectByRuleNameOrGetCssObjectByRuleName:
      | Record<RuleName, import('./types').CSSObject>
      | ((
          theme: MyTheme,
          params: Params,
          classes: Record<RuleNameSubsetReferencableInNestedSelectors, string>,
        ) => Record<
          RuleNameSubsetReferencableInNestedSelectors | RuleName,
          import('./types').CSSObject
        >),
  ) => (
    params: Params,
    styleOverrides?:
      | {
          props: any;
          ownerState?: Record<string, unknown> | undefined;
        }
      | undefined,
  ) => {
    classes: Record<RuleName, string>;
    theme: MyTheme;
    css: import('./types').Css;
    cx: import('./types').Cx;
  };
};

type ModifyDeep<A, B extends DeepPartialAny<A>> = {
  [K in keyof A | keyof B]: K extends keyof A // For all keys in A and B: // ───┐
    ? K extends keyof B // ───┼─ key K exists in both A and B
      ? A[K] extends AnyObject //    │  ┴──┐
        ? B[K] extends AnyObject //    │  ───┼─ both A and B are objects
          ? ModifyDeep<A[K], B[K]> //    │     │  └─── We need to go deeper (recursively)
          : B[K] //    │     ├─ B is a primitive 🠆 use B as the final type (new type)
        : B[K] //    │     └─ A is a primitive 🠆 use B as the final type (new type)
      : A[K] //    ├─ key only exists in A 🠆 use A as the final type (original type)
    : B[K]; //    └─ key only exists in B 🠆 use B as the final type (new type)
};

type AnyObject = Record<string, any>;

// This type is here only for some intellisense for the overrides object
type DeepPartialAny<T> = {
  /** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};

declare module '@mui/material/styles' {
  export interface Theme extends MyTheme {}
  export interface ThemeOptions extends MyTheme {}
}

declare module 'tss-react/mui' {
  export interface Theme extends MyTheme {}
  export interface ThemeOptions extends MyTheme {}
  interface makeStyles extends MyMakeStyles {}
}
