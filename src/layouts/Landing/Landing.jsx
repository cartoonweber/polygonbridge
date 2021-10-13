import React from 'react';
import "./style.scss"
import { Box, Paper, OutlinedInput } from '@mui/material';
import { FaChevronRight, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi'

export default function Landing() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box className="bridge">
                <Box className="title">
                    Daily quota ? per address (? / ?)
                </Box>
                <hr />
                <Box>
                    <Box style={{ fontSize: "0.75em" }}>Asset</Box>
                    <Box className="assetlist">
                        <Box className="assets">
                            <img src="usdt.png" />
                            <Box>USDT</Box>
                        </Box>
                        <FaChevronRight />
                    </Box>
                </Box>
                <Box className="send">
                    <Box style={{ width: "40%" }}>
                        <Box>From</Box>
                        <Paper elevation={5} className="paper">
                            <img src="eth-icon.svg" />
                            <Box className="main">
                                <Box>Ethereum Network</Box>
                                <Box class="arrowdown"><FaChevronDown /></Box>
                            </Box>
                        </Paper>
                    </Box>
                    <Box className="arrow">
                        <HiArrowRight />
                    </Box>
                    <Box style={{ width: "40%" }}>
                        <Box>To</Box>
                        <Paper elevation={5} className="paper">
                            <img src="chain-icon.svg" />
                            <Box className="main">
                                <Box>Binance Smart Chain Network</Box>
                                <Box class="arrowdown"><FaChevronDown /></Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
                <Box className="sendetail">If you have not add Binance Smart Chain network in your MetaMask yet, please click <button style={{ color: "black", backgroundColor: "rgb(240, 185, 11)", padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Add network</button> and continue</Box>
                <Box className="amount">
                    <Box>Amount</Box>
                    <OutlinedInput className="amountinput" type="number" />
                    <Box className="receive">You will receive ≈ 0 <img src="usdt.png" /> USDT <span>&nbsp;BEP20</span></Box>
                </Box>
                <button className="connect">Connect Wallet</button>
            </Box>
        </Box>
    );
}


export { Landing };