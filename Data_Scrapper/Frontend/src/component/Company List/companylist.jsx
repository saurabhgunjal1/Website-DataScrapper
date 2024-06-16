import React from "react";
import { useState, useEffect } from "react";
import styles from "./companylist.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { height } from "@mui/system";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
// import Xlogo from "../../assets/Xlogo.png";

const columns = [
  {
    field: "Company",
    headerName: "COMPANY",
    width: 130,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={facebook}
          alt="logo"
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        {params.value.name}
      </div>
    ),
  },
  {
    field: "Social",
    headerName: "SOCIAL PROFILES",
    width: 130,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href={params.value.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={facebook}
            alt="Facebook"
            style={{ width: 10, height: 10, marginRight: 5 }}
          />
        </a>
        <a
          href={params.value.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Xlogo}
            alt="Twitter"
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
        </a>
        <a
          href={params.value.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instagram}
            alt="Instagram"
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
        </a>
      </div>
    ),
  },
  { field: "Description", headerName: "DESCRIPTION", width: 130 },
  { field: "Address", headerName: "ADDRESS", width: 90 },
  { field: "Phone_number", headerName: "PHONE NO.", width: 100 },
  { field: "Email", headerName: "EMAIL", width: 160 },
];
const getRowId = (row) =>
  row.Company || Math.random().toString(36).substring(2, 15);

export function Companylist() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //   useEffect(() => {
  //     // Fetch data from API or database
  //     setRows([
  //       {
  //         Company: { name: "Instagram", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO dunaissssaabhabcbsui ajksc acsbnna ajdksaSS",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //       {
  //         Company: { name: "Rhycero", logo: "path/to/logo.png" },
  //         Social: {
  //           facebook: "fb-url",
  //           twitter: "twitter-url",
  //           instagram: "instagram-url",
  //         },
  //         Description: "7th Floor",
  //         Address: "PO Box 25288",
  //         Phone_number: "3087235380",
  //         Email: "kpriditt0@youtu.be",
  //       },
  //     ]);
  //   }, []);

  useEffect(() => {
    setRows(rows.slice(0, rowsPerPage));
  }, [rows, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setRowsPerPage(newPageSize);
  };

  useEffect(() => {
    // Initialize rows with the first 'rowsPerPage' rows from your data array
    setRows(rows.slice(0, rowsPerPage));
  }, [rowsPerPage]);
  return (
    <div className={styles.topdiv}>
      <div className={styles.listdiv}>
        <div
          style={{ height: 450, width: "100%" }}
          className={`${styles.datalistdiv} ${styles.noBorders}`}
        >
          <DataGrid
            sx={{
              border: 0,
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                border: 0,
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "none",
                border: 0,
              },
            }}
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            className={styles.datagriddiv}
            rowHeight={35}
            // checkboxSelection
            classes={{ columnHeader: styles.datagridHeader }}
          />
        </div>
      </div>
    </div>
  );
}
