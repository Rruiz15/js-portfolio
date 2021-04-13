//1.1 primer paso crear path mediante require 
const path = require('path');
//3.1 Despues de instalado el plugin lo pedimos con require y lo guardamos en una constante
const HtmlWebpackPlugin = require('html-webpack-plugin');
//4.1 ahora pedimos con require a una constante el plugin de css y vamos con las reglas abajo 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//4.7 ahora pedimos con require a una constante el plugin de Copy y vamos a iniciar el plugin abajo
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//5.7 pedimos con require donenv
const DotEnv = require('dotenv-webpack');
//5.8 luego creamos 2 archivos en la raiz el pryecto .env y .env-example se sigue en el archivo .env y luego a plugins

//1.2 se crea el module.export que es donde van las configuraciones 
module.exports = {
  // 1.3 la primera configuracion es entry que nos permite decir cual es el punto de entrada de nuestra app
  entry: './src/index.js',
  // 1.4 seguido creamos el output {OBJETO} que a donde vamos a enviar lo que prepara webpack
  output: {
    //1.5 el primer elemento sera path a el cual le daremos el path que pedimos con el require 
    //1.5 path.resolve nos permite saber donde se encuentra el proyecto
    path: path.resolve(__dirname, 'dist'),
    //1.6 filename otorga el nombre del resultado del js que se unifica con webpack
    filename: '[name].[contenthash].js',
    // con assets modules file name le daremos el lugar donde iran las modificaciones de los assets
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },//1.7 cerramos el output con , para crear el suiguiente elemento 
  //1.8 ahora creamos resolve {OBJETO} donde pondremos las extenciones con las cuales se van a trabajar 
 //6 aqui ponemos el mode que diferenciara del archivo desarrolo de el production
 // para borrar la distintas versiones tenemos que ir al .config de production e instalar en cosola -npm install clean-webpack-plugin -D
    mode:'development',
    //poniendo la opcion watch activamos esta
    watch: true,
    resolve: {
    //1.9 cremos extensions [ARREGLO] donde pasaremos las extensiones con las que trabajaremos en caso de usar react,esvelt van aqui
    extensions: ['.js'],
    //5.4 luego creamos alias{OBJETO} para poder mejorar los llamados de los distintos archivos en nuestro programa
    alias:{
      //5.5 se crea con @nombre : path.resolve(dirname,"la source del archivo")
      '@utils': path.resolve(__dirname,'src/utils'),
      '@templates': path.resolve(__dirname,'src/templates/'),
      '@styles': path.resolve(__dirname,'src/styles/'),
      '@images': path.resolve(__dirname,'src/assets/images/')
    }//5.6 luego vamos con las variables de entorno las cuales son archivos que no se quieren exponer al codigo (API,BASE DE DATOS) en consola lo siguiente -npm install dontenv-webpack -D vamos a instanciarla
  }, //2.0 cerramos resolve con , y en consola pedimos -npx webpack --mode production --config webpack.config.js
  //2.1 ahora tenemos que instalar babel en consola pedimos -npm install babel-loader @babel/core @babel/preset @babel/plugin-transform-runtime -D
  //2.2 creamos el archivo en la carpeta raiz de babel llamada .babelrc *siguiente paso en el archivo de babel*
  //2.3 creamos module {OBJETO} donde iran las configuraciones de los loader y sus reglas 
  module: {
    //2.4 se crea rules [ARREGLO] aqui iran las diferentes reglas para los loaders
    rules: [
      //2.5 aqui se crean elementos del arreglo {} donde iran las reglas
      {
        //2.6 se crea test para saber el tipo de extesiones se utilizaran van en expresion regular /\.$/, "?":significa 'O'
        test: /\.m?js$/,
        //2.7 se crea exclude para excluir archivos en el caso node_modules
        exclude: /node_modules/,
        //2.8 se crea use {OBJETO} donde se pasara el loader que se usara en este caso babel-loader 
        use: {
          loader: 'babel-loader'
        }
      },//2.9 cerramos para crear otros 
      //4.2 ahora creamos otra regla para el css
      {
        test: /\.css|.styl$/i,
        //4.3 agregamos el use depende del plugin se usa {OBJETO} O [ARREGLO] en este caso se una arreglo luego se instacia abajo
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      //5.1 creamos la regla para assets madule 
      {
        test: /\.png/,
        //5.2 esta usa type: "asset/resource" esto hace que se puedan importar los recursos en el temaplate vamos para alla
        type: 'asset/resource'
      },
        //5.3junto con las imagenes se puede optimizar las fuentes y tenemos descargar guardar las fuentes e ir a el archivo css
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ]
  }, //2.9 cerramo con ,
  //3.0 ahora instalamos en terminal el plugin de html -npm install html-webpack-plugin -D vamos para el inicio del archivo
  //3.2 creamos la seccion de plugins [ARREGLO] donde iran todos los plgins que se usaran
  plugins: [
    //3.3 instanciamos con new el plugin de html ({OBJETO}) donde irran las configuraciones de este 
    new HtmlWebpackPlugin({
      //3.4 se crea injet=BOLEAN 
      inject: true,
      //3.5 se cre template donde iran la direccion donde se encuentra en html
      template: './public/index.html',
      //3.6 en file name pondremos el nombre del resultado de la preparacion del plugin 
      filename: './index.html'
      //3.7 con esto ya no es necesario desde el archivo html llamar la etiqueta script para buscar el js
    }),//3.8 cerramos para agregar otros plugins
    //3.9 ahora intalamos el loader y el plugin de css -npm mini-css-extract-plugin css-loader -D y los preprocesadores de preferencia (aqui se usa stylus)
    //4 siguiente a instalar tenemos que borrar el llamado desde el index.html y ahora llamarlo desde el index.js *se sigue en index.js*
    //4.4 instaciamos el plgun de css
    new MiniCssExtractPlugin({
      //4.5 le agregamos un filename para saber donde ira el resultado 
      filename: 'assets/[name].[contenthash].css'
    }),//cerramos para agregar otros
    //4.6 ahora instalamos el copyPlugins para poder copiar los assets a la carpeta dist -npm install copy-webpack-plugin -D 
    new CopyPlugin({
      //4.8 este utiliza patterns que es un [Arreglo{Elemento}]
      patterns: [
        {
          //4.9 agregamos from que es de donde tomaremos los archivos usando path.resolve
          from: path.resolve(__dirname, "src", "assets/images"),
          //5 despues con to hacemos la ruta de salida de la copia luego de esto se tienen que cambiar las rutas de las imagenes a "assets/images/imagen.png"
          to: "assets/images"
        } 
      ]
    }),// cerramos y ahora vamos a optimizar las imagenes e importarlas directamente al nuestro archivo js con assetsModule que ya viene en webpack vamos a las reglas
    //5.8 aqui instaciamos el dotenv plugin
    new DotEnv(),
    //5.9 ahora vamos al archivo donde se llama el api en este caso para usar la variable utils/getdata
  ],
  //en este arvhivo no ira optimization solo en el de produccion
}