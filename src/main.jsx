import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

function render({container}) {
  ReactDOM.render(<App />, container ? container.querySelector('#root-2') : document.querySelector('#root-2'));
}
 
renderWithQiankun({
  mount(props) {
    console.log('mount');
    render(props);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props) {
    console.log('unmount');
    const { container } = props;
    const mountRoot = container?.querySelector('#root-2');
    ReactDOM.unmountComponentAtNode(
      mountRoot || document.querySelector('#root-2'),
    );
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

