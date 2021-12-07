import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './features/_shared/store/store';
import reportWebVitals from './reportWebVitals';
import { RouteComponent } from './routes/RouteComponent';
import './style/tailwind.css';
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouteComponent />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
