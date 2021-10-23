import logo from './logo.svg';
import './App.css';
import { Landing } from './layouts/Landing';
import { Footer } from './layouts/Footer';
import { NavBar } from './layouts/NavBar';
import { useWeb3React } from '@web3-react/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const { account, connector, chainId, activate, error, active } = useWeb3React();
	return (
		<div className="App">
			<NavBar account={account} active={active} />
			<Router>
				<Switch>
					<Route exact path="/" >
						<Landing account = {account}/>
					</Route>
				</Switch>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
