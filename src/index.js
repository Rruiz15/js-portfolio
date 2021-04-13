import Template from '@templates/Template.js';
//aqui llamamos los estilos mediante import *se sigue en webpack.config*
import '@styles/main.css';
import '@styles/vars.styl';
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
