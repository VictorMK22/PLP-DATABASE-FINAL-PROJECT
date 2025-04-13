import { loanDetails } from "./api";
import { useState, useEffect } from "react";

function LoanDetailsPage() {
  const [loanDetail, setLoanDetail] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loans = await loanDetails(); // Directly get the loan details (array)
        console.log("Loans data:", loans); // Log to inspect the structure

        // Set the state with the loan details array directly
        setLoanDetail(loans);
      } catch (error) {
        console.log("Error occurred while fetching loan details:", error);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="content">
      <h1>Loan Details</h1>
      {loanDetail.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Loan_id</td>
              <td>User_id</td>
              <td>Amount</td>
              <td>Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {loanDetail.map((loan) => (
              <tr key={loan.loan_id}>
                <td>{loan.loan_id}</td>
                <td>{loan.user_id}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.loan_date}</td>
                <td>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loan details available.</p>
      )}
    </div>
  );
}

export default LoanDetailsPage;
