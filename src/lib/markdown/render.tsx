import type { ComponentProps, ElementType } from "react";
import type { ExtraProps } from "react-markdown";

/** A object that maps elements components to custom React components. */
type ComponentMap = {
    [Key in Extract<ElementType, string>]?: ElementType<ComponentProps<Key> & ExtraProps>;
};

/**
 * Get a component map that determines how certain Markdown elements should be rendered.
 * @returns A component map.
 */
export function getComponentMap(): ComponentMap {
    return {
        h1: ({ children }) => {
            return <h1>{children}</h1>;
        },
        h2: ({ children }) => {
            return <h2>{children}</h2>;
        },
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
    };
}
