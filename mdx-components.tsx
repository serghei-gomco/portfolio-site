import type { MDXComponents } from "mdx/types";

// Global components for MDX case studies. Styling comes from Tailwind Typography
// ("prose" class on the wrapper), so we only need overrides here.
const components: MDXComponents = {
  a: (props) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
