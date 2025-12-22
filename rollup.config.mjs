import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
	input: 'src/main.js',
	output: {
		file: 'cytoscape-transform.js',
		format: 'cjs'
	},
  output: [
    // Node.js (CommonJS)
    {
      file: 'dist/cytoscape-transform.js',
      format: 'cjs',
      exports: 'auto'
    },
    // Modern bundlers and browsers (ES Module)
    {
      file: 'dist/cytoscape-transform.esm.js',
      format: 'esm',
    },
    // Direct browser use via <script>
    {
      file: 'dist/cytoscape-transform.umd.js',
      format: 'umd',
      name: 'cytoscape-transform', // global variable for browser usage
    }
  ],
  plugins: [
    resolve(), // so Rollup can find node_modules packages
    commonjs(), // so Rollup can convert CommonJS to ES modules
    babel({ babelHelpers: 'bundled' }) // integrate Babel
  ]
};