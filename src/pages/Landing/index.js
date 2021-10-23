import React, { useState, useEffect } from 'react';
import "./style.scss"

import { Box, OutlinedInput } from '@material-ui/core';

import axios from 'axios';

import { FaChevronRight, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import BridgePaper from '../../components/BridgePaper/BridgePaper';

import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import BridgeEth from '../../build/contracts/BridgeEth.json';
import BridgeBsc from '../../build/contracts/BridgeBsc.json';
import TokenEth from '../../build/contracts/TokenEth.json';
import TokenBsc from '../../build/contracts/TokenBsc.json';

const decimalNumber = new BigNumber("1000000000000000000");
const bscNetworkId = 97;
const ethNetworkId = 3;
const feeAmount = 2;

// const adminAddress = "0xAC384287797DD6698461C6a178cAEfd723eaa645";
const apiEndpoint = 'http://10.10.13.235:3000';
// const apiEndpoint = 'http://localhost:5000';

const Landing = ({ isOpen, setOpen, account, setAccount }) => {

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(1);

    const [isBSC, setIsBSC] = useState(true);
    const [balance, setBalance] = useState(0);
    const [amountValue, setAmountValue] = useState(0)
    const [addressValue, setAddressValue] = useState('0x...')
    const [processing, setProcessing] = useState(false);

    const onBridgeEth = async () => {
        const chainId = await window.web3.eth.getChainId();
        alert(chainId);
        if (chainId !== 3) {
            alert ("Wrong Network");
            return;
        }

        setProcessing(true);
        const amount = new BigNumber(amountValue).multipliedBy(decimalNumber).toJSON();
        const amountToApprove = (new BigNumber(amountValue).plus(feeAmount)).multipliedBy(decimalNumber).toJSON();

        // const nonce = await window.web3.eth.getTransactionCount(adminAddress);
        const nonce = 1;

        const message = window.web3.utils.soliditySha3(
            { t: 'address', v: account },
            { t: 'address', v: addressValue },
            { t: 'uint256', v: amount },
            { t: 'uint256', v: nonce },
        ).toString('hex');

        const signature = await window.web3.eth.personal.sign(
            message,
            account
        );

        const bridgeEthAddress = BridgeEth.networks[ethNetworkId].address;
        const tokenEthInstance = await new window.web3.eth.Contract(TokenEth.abi, TokenEth.networks[ethNetworkId].address);
        const bridgeEthInstance = await new window.web3.eth.Contract(BridgeEth.abi, bridgeEthAddress);
        await tokenEthInstance.methods.approve(bridgeEthAddress, amountToApprove).send({ from: account });
        
        await bridgeEthInstance.methods.burn(account, amount, nonce, signature).send({ from: account });

        await axios.post(`${apiEndpoint}/ethbridge`, {
            from: account,
            to: addressValue,
            amount,
            nonce,
            signature
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        setProcessing(false);
        alert("Transaction has been processed successfully");
    }

    const onBridgeBsc = async () => {

        const chainId = await window.web3.eth.getChainId();

        if (chainId !== 97) {
            alert ("Wrong Network");
            return;
        }

        setProcessing(true);
        const amount = new BigNumber(amountValue).multipliedBy(decimalNumber).toJSON();
        const amountToApprove = (new BigNumber(amountValue).plus(feeAmount)).multipliedBy(decimalNumber).toJSON();

        // const nonce = await window.web3.eth.getTransactionCount(adminAddress);
        const nonce = 1;

        const message = window.web3.utils.soliditySha3(
            { t: 'address', v: account },
            { t: 'address', v: addressValue },
            { t: 'uint256', v: amount },
            { t: 'uint256', v: nonce },
        ).toString('hex');

        const signature = await window.web3.eth.personal.sign(
            message,
            account
        );

        const bridgeBscAddress = BridgeBsc.networks[bscNetworkId].address;
        const tokenBscInstance = await new window.web3.eth.Contract(TokenBsc.abi, TokenBsc.networks[bscNetworkId].address);
        const bridgeBscInstance = await new window.web3.eth.Contract(BridgeBsc.abi, bridgeBscAddress);
        await tokenBscInstance.methods.approve(bridgeBscAddress, amountToApprove).send({ from: account });
        await bridgeBscInstance.methods.burn(account, amount, nonce, signature).send({ from: account });

        await axios.post(`${apiEndpoint}/bscbridge`, {
            from: account,
            to: addressValue,
            amount,
            nonce,
            signature
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        setProcessing(false);
        alert("Transaction has been processed successfully");
    }

    const fetchBalance = async () => {
        let value;
        if (from === 1) {
            const tokenBscInstance = await new window.web3.eth.Contract(TokenBsc.abi, TokenBsc.networks[bscNetworkId].address);
            value = await tokenBscInstance.methods.balanceOf(account).call();
            console.log(tokenBscInstance.methods.balanceOf(account).call());
            
        } else {
            const tokenEthInstance = await new window.web3.eth.Contract(TokenEth.abi, TokenEth.networks[ethNetworkId].address);
            value = await tokenEthInstance.methods.balanceOf(account).call();
        }
        setBalance(new BigNumber(value).dividedBy(decimalNumber).decimalPlaces(2).toJSON());
    }
    const handleChangeAmount = (e) => {
        setAmountValue(e.target.value)
    }
    const handleAddressInput = (e) => {
        setAddressValue(e.target.value)
    }

    useEffect(() => {
        if (account) {
            fetchBalance();
            setAddressValue(account ? account : "0x...")
        }
    }, [account, isBSC]);

    const handleFromClose = (event) => {
        const t = event.currentTarget.dataset.myValue / 1;
        setFrom(t);
        if (to === t)
            setTo((t + 1) % 2);
    };
    const handleToClose = (event) => {
        const t = event.currentTarget.dataset.myValue / 1;
        setTo(t);
        if (from === t)
            setFrom((t + 1) % 2);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} className="bridgebody">
            <Box className="bridge">
                <Box className="title">
                    Daily quota ? per address (? / ?)
                </Box>
                <hr />
                <Box>
                    <Box style={{ fontSize: "0.75em" }}>Asset</Box>
                    <Box className="assetlist">
                        <Box className="assets">
                            <img src="mndcc.png" />
                            <Box>MNDCC</Box>
                        </Box>
                        <FaChevronRight />
                    </Box>
                </Box>
                <Box className="send">
                    <Box style={{ width: "40%" }}>
                        <Box>From</Box>
                        <BridgePaper index={from} handleClose={handleFromClose} />
                    </Box>
                    <Box className="arrow" onClick = {() => {
                        if(from === 0) onBridgeEth();
                        else onBridgeBsc();
                    }}>
                        <HiArrowRight />
                    </Box>
                    <Box style={{ width: "40%" }}>
                        <Box>To</Box>
                        <BridgePaper index={to} handleClose={handleToClose} />
                    </Box>
                </Box>
                <Box className="sendetail">If you have not add Binance Smart Chain network in your MetaMask yet, please click <button style={{ color: "black", backgroundColor: "rgb(240, 185, 11)", padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Add network</button> and continue</Box>
                <Box className="amount">
                    <Box>Amount</Box>
                    <OutlinedInput className="amountinput" type="number" onKeyPress={(event) => {
                        if ((event?.key === '-' || event?.key === '+')) {
                            event.preventDefault();
                        }
                    }}
                        onChange={(event) => {
                            if(event.target.value < 0)
                                event.target.value = 0;
                            setAmountValue(event.target.value);
                        }} />
                    <Box className="receive">You will receive ≈ 0 <img src="mndcc.png" /> MNDCC <span>&nbsp;BEP20</span></Box>
                </Box>
                {!account && <button className="connect" onClick={() => setOpen(!isOpen)}>Connect Wallet</button>}
                {account && <button className="connect">{account}</button>}
            </Box >
        </Box >
    );
}


export default Landing;