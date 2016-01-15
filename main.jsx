import {dom, element} from 'deku';
import Application from './components/Application.jsx';
var x = require('deku')

const render = dom.createRenderer(document.getElementById('mount'));

// Rendering function
function update (Component) {
  render(<Component />)
}

// First render
update(Application);

// Hooking into HMR
// This is the important part as it will reload your code and re-render the app accordingly
if (module.hot) {
  module.hot.accept('./components/Application.jsx', function() {
    const nextApplication = require('./components/Application.jsx').default;
    update(nextApplication);
  });
}
