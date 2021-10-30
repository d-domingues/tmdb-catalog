import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: true,
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  esbuildTarget: 'auto',

  /** Set appIndex to enable SPA routing */
  appIndex: 'index.html',

  plugins: [
    // esbuildPlugin({ ts: true, target: 'auto' }),
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    hmr &&
      hmrPlugin({
        include: ['src/**/*'],
        exclude: ['**/*/node_modules/**/*'],
        presets: [presets.lit],
      }),
  ],
});
