import { useState, useEffect } from "react";
import { getTransactionHistory } from "./api";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const history = await getTransactionHistory();
        setTransactions(history);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className="content">
      <h1>Transaction History</h1>
      <ol className="list">
        {transactions.map((transaction) => (
          <li key={transaction.transaction_id}>
            <div className="list-items">
              <strong className="list-item">Transaction Type:</strong>
              {transaction.transaction_type}
              <strong className="list-item"> Amount:</strong>
              {transaction.amount}
              <strong className="list-item"> Date:</strong>
              {transaction.transaction_date}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TransactionHistory;
