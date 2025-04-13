import React from "react";
import { Link } from "react-router-dom";

const loans = [
  {
    id: 1,
    name: "Silver Loan",
    rate: "5% per annum",
    amount: "Up to 50,000 enchanted coins",
  },
  {
    id: 2,
    name: "Golden Loan",
    rate: "7% per annum",
    amount: "Up to 100,000 enchanted coins",
  },
  {
    id: 3,
    name: "Platinum Loan",
    rate: "10% per annum",
    amount: "Up to 200,000 enchanted coins",
  },
];

const HomePage = () => {
  return (
    <div className="content">
      <h1>Welcome to Magical Loans</h1>
      <p>Embark on your financial adventure with enchanted coins!</p>

      <h2>Loans We Offer</h2>
      <div className="loan_list">
        {loans.map((loan) => (
          <div className="loan_card" key={loan.id}>
            <h3>{loan.name}</h3>
            <p>
              {" "}
              <i>Interest Rate:</i> {loan.rate}
            </p>
            <p>
              <i>Loan Amount:</i> {loan.amount}
            </p>
          </div>
        ))}
      </div>
      <button className="loan-btn">
      <Link to={"./create-loan"}>Apply for Loan</Link>
      </button>
    </div>
  );
};

export default HomePage;
