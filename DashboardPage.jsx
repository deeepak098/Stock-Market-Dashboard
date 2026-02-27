import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const navigate = useNavigate();

  const searchHandler = async () => {
    try {
      const { data } = await API.get(`/stocks/${symbol}`);
      setStock(data);
    } catch (error) {
      alert("Stock not found or not authorized");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Enter Stock Symbol (AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={searchHandler}>Search</button>

      {stock && (
        <div>
          <h3>{stock.symbol}</h3>
          <p>Price: {stock.price}</p>
          <p>High: {stock.high}</p>
          <p>Low: {stock.low}</p>

          <button onClick={() => navigate(`/stock/${stock.symbol}`)}>
            View Details
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;