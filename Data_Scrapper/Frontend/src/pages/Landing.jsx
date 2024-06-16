import React from "react";
import { Header } from "../component/Header/header";

import CompanyDetails from "../component/Company Details/companyDetails";
import CompanyListNew from "../component/Company List/companylistnew";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function Landingpage() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<CompanyListNew />} />
          <Route path="/company-details/:id" element={<CompanyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
