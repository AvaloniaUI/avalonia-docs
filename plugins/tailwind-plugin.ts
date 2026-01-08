import type { LoadContext, Plugin, PostCssOptions } from '@docusaurus/types';

export default function tailwindPlugin(
  context: LoadContext,
  options: unknown
): Plugin {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions: PostCssOptions) {
      postcssOptions.plugins = [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ];
      return postcssOptions;
    },
  };
}
