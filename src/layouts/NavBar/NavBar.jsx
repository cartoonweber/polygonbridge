import React from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'
import { Box } from '@mui/material';
import './style.scss';

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})

export default function NavBar({ account, active }) {
    const { connector, chainId, activate, deactivate, error } = useWeb3React();

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log("ex", ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log("ex", ex)
        }
    }
    const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
    return (
        <Box className="navbar">
            <Box className="navbarbody">
                <Box className="logobody">
                    <img src="chain-icon.svg" />
                    <Box className="logotitle">
                        BINANCE <span style = {{fontWeight : "500"}}>CHAIN</span>
                    </Box>
                    <Box className="binancelink">Binance Bridge</Box>
                </Box>
                {active ?
                    (
                        <button onClick={disconnect} className = "navconnect">
                            {accountEllipsis}
                        </button>
                    ) : (
                        <button onClick={connect} className = "navconnect">
                            Connect Wallet
                        </button>
                    )
                }
            </Box>
        </Box>
    );
}


export { NavBar };