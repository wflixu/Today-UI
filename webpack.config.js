const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        'main':'./src/index.tsx',
    }, 
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.[hash:4].js',
        
    },
    module: {
        rules: [
           {
               test: /\.tsx?$/,
               use:'ts-loader',
               exclude:/node_modules/,
           },
           {
               test:/\.(le|c)ss?/,
               use:['style-loader','css-loader','less-loader']
           }
        ]
    },
    devServer:{
       contentBase: path.resolve(__dirname,'dist'),
       compress:true,
       historyApiFallback:true,
       
       open:true,
       port:9988
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ],
    resolve:{
        extensions:['.tsx','.ts','.js']
    }
}