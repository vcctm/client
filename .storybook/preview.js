import { RouterContext } from "next/dist/shared/lib/router-context";
import "./style.css";

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story) => (
    <div id="__next">
        <Story />
    </div>
  ),
];
