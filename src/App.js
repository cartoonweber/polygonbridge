import logo from './logo.svg';
import './App.css';
import { Landing } from './layouts/Landing';
import { Footer } from './layouts/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
				</Switch>
			</Router>
			<Footer/>
		</div>
	);
}

export default App;
