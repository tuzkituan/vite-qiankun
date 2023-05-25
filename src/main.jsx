import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient()

function render({container,  mainLocalStorage}) {
  ReactDOM.render(<QueryClientProvider client={queryClient}>
    <ChakraProvider resetCSS={false} cssVarsRoot='root-2'>
      <App mainLocalStorage={mainLocalStorage} />
    </ChakraProvider>
    </QueryClientProvider>, container ? container.querySelector('#root-2') : document.querySelector('#root-2'));
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

