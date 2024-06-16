import React, { useState } from "react";
import styles from "./header.module.css";
import axios from "axios";
import { useCompanyContext } from "../../CompanyContext";

export function Header() {
  const [url, setUrl] = useState("");
  const { addCompany } = useCompanyContext();

  const handleScrap = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/scrap", {
        url,
      });
      console.log("Raw response data:", response.data);

      // Extract the scrapedData from the response
      const scrapedData = response.data.scrapedData;

      // Ensure all expected fields are present
      const newCompany = {
        Company: {
          id: scrapedData._id || Date.now().toString(),
          name: scrapedData.Company?.name || "Unknown Company",
          logo: scrapedData.Company?.logo || "",
        },
        Social_Profile: scrapedData.Social_Profile || {},
        Description: scrapedData.Description || "",
        Address: scrapedData.Address || "",
        Phone_No: scrapedData.Phone_No || "",
        Email: scrapedData.Email || "",
      };

      console.log("Processed new company data:", newCompany);

      addCompany(newCompany);
      setUrl("");
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  };

  return (
    <header className={styles.headerdiv}>
      <input
        className={styles.inputbox}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="&#61442; Enter domain name"
        required
      />
      <button onClick={handleScrap}>Fetch & Save Details</button>
    </header>
  );
}
