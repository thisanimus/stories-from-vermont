import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
	input: './src/script.js',
	output: {
		file: './assets/js/script.min.js',
		format: 'es',
		name: 'script',
	},
	watch: {
		include: ['src/**/*.js', '_includes/**/*.js'],
	},
	plugins: [
		nodeResolve({ jsnext: true, main: true }),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		sourcemaps(),
		terser(),
	],
};
