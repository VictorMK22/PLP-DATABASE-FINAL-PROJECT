import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // Your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request to fetch api message from the backend
export const getApiMessage = async () => {
  try {
    const response = await api.get("/api");
    return response.data;
  } catch (error) {
    console.log("Error fetching interest rates:", error);
    throw error;
  }
};

// GET request to fetch all users
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};

// GET request to fetch all interest rates
export const getInterestRates = async () => {
  try {
    const response = await api.get("/interest-rates");
    return response.data;
  } catch (error) {
    console.error("Error fetching interest rates:", error);
    throw error;
  }
};

// POST request to create a new interest rate
export const createInterestRate = async (interestRate) => {
  try {
    const response = await api.post("/interest-rates", interestRate);
    return response.data;
  } catch (error) {
    console.error("Error creating interest rate:", error);
    throw error;
  }
};

// GET request to fetch all loan amounts
export const getLoanAmounts = async () => {
  try {
    const response = await api.get("/loan-amounts");
    return response.data;
  } catch (error) {
    console.error("Error fetching loan amounts:", error);
    throw error;
  }
};

// POST request to create a new loan amount
export const createLoanAmount = async (loanAmount) => {
  try {
    const response = await api.post("/loan-amounts", loanAmount);
    return response.data;
  } catch (error) {
    console.error("Error creating loan amount:", error);
    throw error;
  }
};

// GET request to fetch repayment schedules by loan ID
export const getRepaymentSchedules = async () => {
  try {
    const response = await api.get(`/repayment-schedules/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repayment schedules:", error);
    throw error;
  }
};

// POST request to create a new repayment schedule
export const createRepaymentSchedule = async (schedule) => {
  try {
    const response = await api.post("/repayment-schedules", schedule);
    return response.data;
  } catch (error) {
    console.error("Error creating repayment schedule:", error);
    throw error;
  }
};

// PUT request to update the status of a repayment schedule
export const updateRepaymentScheduleStatus = async (scheduleId, status) => {
  try {
    const response = await api.put(`/repayment-schedules/${scheduleId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating repayment schedule status:", error);
    throw error;
  }
};

// GET request to fetch transaction history by loan ID
export const getTransactionHistory = async () => {
  try {
    const response = await api.get(`/transaction-histories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};

// GET request to fetch transaction history by loan ID
export const loanDetails = async () => {
  try {
    const response = await api.get(`/loan-details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan details:", error);
    throw error;
  }
};

// Export the Axios instance as the default export
export default api;
