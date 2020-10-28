module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				"targets": "> 0.5%, not dead"
			}
		],
		[
			"minify"
		]
	],
	
	"comments": false,

	plugins: [
		'@babel/plugin-proposal-class-properties'
	]
};