const axios = require("axios");

// @desc   Get stock data by symbol
// @route  GET /api/stocks/:symbol
// @access Protected

const getStockBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;

    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVEDATA_API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === "error") {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({
      symbol: data.symbol,
      price: data.close,
      high: data.high,
      low: data.low,
      open: data.open,
      previousClose: data.previous_close,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching stock data" });
  }
};

module.exports = { getStockBySymbol };