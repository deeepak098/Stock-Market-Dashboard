import { useEffect, useState } from "react";
import API from "../services/api";

function UserPanelPage() {
  const [transactions, setTransactions] = useState([]);

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const { data } = await API.get("/transactions/my");
      console.log("Frontend received:", data);
      setTransactions(data);
    } catch (error) {
      console.log("Frontend error:", error.response?.data);
      alert("Error loading transactions");
    }
  };

  fetchTransactions();
}, []);

  return (
    <div>
      <h2>User Transactions</h2>

      {transactions.length === 0 && <p>No transactions found</p>}

      {transactions.map((tx) => (
        <div key={tx._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p>Symbol: {tx.symbol}</p>
          <p>Type: {tx.type}</p>
          <p>Quantity: {tx.quantity}</p>
          <p>Price: {tx.price}</p>
          <p>Status: {tx.status}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPanelPage;