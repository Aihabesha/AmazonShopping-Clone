import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ value }) => {
    const formattedValue = numeral(value || 0).format("$0,0.00");

    return <span>{formattedValue}</span>;
};

export default CurrencyFormat;