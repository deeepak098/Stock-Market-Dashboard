import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function StockDetailsPage() {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data } = await API.get(`/stocks/${symbol}`);
        setStock(data);
      } catch (error) {
        alert("Error loading stock");
      }
    };

    fetchStock();
  }, [symbol]);

  const buyHandler = async () => {
    try {
      await API.post("/transactions", {
        symbol: stock.symbol,
        quantity,
        price: Number(stock.price),
        type: "buy",
      });

      alert("Buy request submitted");
    } catch (error) {
      alert("Error submitting buy request");
    }
  };

  const sellHandler = async () => {
    try {
      await API.post("/transactions", {
        symbol: stock.symbol,
        quantity,
        price: Number(stock.price),
        type: "sell",
      });

      alert("Sell request submitted");
    } catch (error) {
      alert("Error submitting sell request");
    }
  };

  if (!stock) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{stock.symbol} Details</h2>
      <p>Price: {stock.price}</p>
      <p>High: {stock.high}</p>
      <p>Low: {stock.low}</p>

      <br />

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />

      <br /><br />

      <button onClick={buyHandler}>Buy</button>
      <button onClick={sellHandler}>Sell</button>
    </div>
  );
}

export default StockDetailsPage;