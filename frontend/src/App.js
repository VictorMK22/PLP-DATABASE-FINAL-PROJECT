import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

// Import pages
import HomePage from "./HomePage";
import TransactionHistory from "./TransactionHistory";
import Register from "./UserSignUp";
import Navbar from "./Navbar";
import GetApiMessage from "./GetApiMessage";
import Footer from "./Footer";
import Contact from "./Contact";
import Users from "./Users";
import RepaymentScheduleList from "./RepaymentScheduleList";
import Login from "./Login";
import UpdateUser from "./UpdateUsers";
import { UserList, UserEdit, UserCreate } from "./Admin/Dashboard";

const dataProvider = simpleRestProvider("http://localhost:5000");

const AdminPanel = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar for navigation */}
        <Navbar />

        {/* Main content */}
        <div className="container-routes">
          <Routes>
            {/* Define routes for the pages */}
            <Route exact path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route
              path="/transaction-history"
              element={<TransactionHistory />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/api-message" element={<GetApiMessage />} />
            <Route path="/repayment" element={<RepaymentScheduleList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/*Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
