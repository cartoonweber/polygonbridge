import React, { useState } from 'react';
import "./style.scss"
import { Box, Paper, OutlinedInput, Menu, MenuItem, Button } from '@mui/material';
import { FaChevronRight, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { BridgePaper } from '../../components/BridgePaper';

export default function Landing() {

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(1);

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
                    <Box className="arrow">
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
                    <OutlinedInput className="amountinput" type="number" />
                    <Box className="receive">You will receive ≈ 0 <img src="mndcc.png" /> MNDCC <span>&nbsp;BEP20</span></Box>
                </Box>
                <button className="connect">Connect Wallet</button>
            </Box >
        </Box >
    );
}


export { Landing };