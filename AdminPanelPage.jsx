import { useEffect, useState } from "react";
import API from "../services/api";

function AdminPanelPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await API.get("/transactions");
      setTransactions(data);
    } catch (error) {
      alert("Error loading transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/transactions/${id}`, { status });
      fetchTransactions();
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {transactions.map((tx) => (
        <div
          key={tx._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <p>User: {tx.user?.email}</p>
          <p>Symbol: {tx.symbol}</p>
          <p>Type: {tx.type}</p>
          <p>Quantity: {tx.quantity}</p>
          <p>Price: {tx.price}</p>
          <p>Status: {tx.status}</p>

          {tx.status === "pending" && (
            <>
              <button onClick={() => updateStatus(tx._id, "approved")}>
                Approve
              </button>
              <button onClick={() => updateStatus(tx._id, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminPanelPage;