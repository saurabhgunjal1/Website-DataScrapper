import React, { useEffect } from "react";
import styles from "./companylistNew.module.css";
import axios from "axios";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useCompanyContext } from "../../CompanyContext";

export default function Companylistnew() {
  const { companies, setCompanies } = useCompanyContext();
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://website-datascrapper.onrender.com/api/v1/data"
        );
        console.log(response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setCompanies]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const handleDelete = async () => {
    const selectedRowIds = Object.keys(rowSelection);
    const idsToDelete = selectedRowIds.map((rowId) => companies[rowId]._id);

    try {
      await axios.post(
        "https://website-datascrapper.onrender.com/api/v1/delete",
        {
          ids: idsToDelete,
        }
      );
      setCompanies((prevCompanies) =>
        prevCompanies.filter((item) => !idsToDelete.includes(item._id))
      );
      setRowSelection({});
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvRows = [];

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(companies);
    downloadCSV(csvContent, "companies.csv");
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      header: "COMPANY",
      accessorKey: "Company",
      footer: "Company",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <Link to={`/company-details/${value.id}`}>
            <div>
              {value.logo && (
                <img src={value.logo} alt="" width="15" height="15" />
              )}
              <span className={styles.truncateText}>{value.name}</span>
            </div>
          </Link>
        );
      },
    },
    {
      header: "SOCIAL PROFILES",
      accessorKey: "Social_Profile",
      footer: "Social_Profile",
      cell: ({ getValue }) => {
        const value = getValue();
        if (!value) return null; // Return null if no social profile data

        return (
          <div>
            {value.instagram && (
              <a href={value.instagram}>
                <img src={instagram} alt="Instagram" width="15" height="15" />
              </a>
            )}
            {value.facebook && (
              <a href={value.facebook}>
                <img src={facebook} alt="Facebook" width="15" height="15" />
              </a>
            )}
            {value.X && (
              <a href={value.X}>
                <img src={twitter} alt="Twitter" width="15" height="15" />
              </a>
            )}
            {value.linkedin && (
              <a href={value.linkedin}>
                <img src={linkedin} alt="LinkedIn" width="15" height="15" />
              </a>
            )}
          </div>
        );
      },
    },
    {
      header: "DESCRIPTION",
      accessorKey: "Description",
      footer: "Description",
      cell: ({ getValue }) => {
        const value = getValue();
        return <span>{value ? truncateText(value, 40) : ""}</span>;
      },
      className: styles.descriptionColumn,
    },
    {
      header: "ADDRESS",
      accessorKey: "Address",
      footer: "Address",
      cell: ({ getValue }) => {
        const value = getValue();
        return <span>{value ? truncateText(value, 20) : ""}</span>;
      },
    },
    {
      header: "PHONE NO.",
      accessorKey: "Phone_No",
      footer: "Phone_No",
      cell: ({ getValue }) => {
        const value = getValue();
        return <span>{value || ""}</span>;
      },
    },
    {
      header: "EMAIL",
      accessorKey: "Email",
      footer: "Email",
      cell: ({ getValue }) => {
        const value = getValue();
        return <span>{value || ""}</span>;
      },
    },
  ];

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div>
      <div className={styles.firstdiv}>
        <span>{Object.keys(rowSelection).length} selected</span>
        <button className={styles.firstbutton} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.secondbutton} onClick={handleDownloadCSV}>
          Export as CSV
        </button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableheadcss}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tablerowcss}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.blueText}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationbtn}>
        <span className={styles.paginationspanleft}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          &lt;
        </button>
        <button onClick={() => table.setPageIndex(0)}>1</button>
        <span className={styles.paginationspan}>
          {table.getState().pagination.pageIndex + 1}
        </span>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          {companies.length}
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
