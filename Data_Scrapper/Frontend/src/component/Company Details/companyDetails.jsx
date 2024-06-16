import "./companyDetails.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiCircleInfo, CiInstagram, CiTwitter } from "react-icons/ci";
import { LuPhoneCall, LuFacebook } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { HiOutlineGlobe, HiOutlineLocationMarker } from "react-icons/hi";
import { SlSocialLinkedin } from "react-icons/sl";
import { IoCameraOutline } from "react-icons/io5";

export default function CompanyDetails() {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/data/${id}`
      );
      setCompanyData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError("Failed to fetch company data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyData) {
    return <div>No data available</div>;
  }

  return (
    <div className="Wrapper">
      <div className="title-content">
        <div className="logo">
          <img src={companyData.Company.logo} alt="logo img" />
        </div>
        <div className="description">
          <p className="title">{companyData.Company.name}</p>
          <div className="description1">
            <div className="detail1">
              <p>
                <CiCircleInfo />
                Description
              </p>
              <p>{companyData.Description}</p>
            </div>
            <div className="detail2">
              <p>
                <LuPhoneCall />
                Phone
              </p>
              <p>{companyData.Phone_No}</p>
              <p>
                <MdOutlineMail />
                Email
              </p>
              <p>{companyData.Email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="companydiv">
        <div className="company-details">
          <p className="company-title">Company Details</p>

          <div className="company-detailsinfo">
            <p className="info">
              <HiOutlineGlobe />
              Website
            </p>
            <span>{companyData.Company.name}</span>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <CiCircleInfo />
              Description
            </p>
            <p className="descriptioninfo">{companyData.Description}</p>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <HiOutlineLocationMarker />
              Email
            </p>
            <span>{companyData.Email}</span>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <LuFacebook />
              Facebook
            </p>
            <a
              href={companyData.Social_Profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.Social_Profile.facebook}
            </a>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <CiInstagram />
              Instagram
            </p>
            <a
              href={companyData.Social_Profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.Social_Profile.instagram}
            </a>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <CiTwitter />
              Twitter
            </p>
            <a
              href={companyData.Social_Profile.X}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.Social_Profile.X}
            </a>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <SlSocialLinkedin />
              Linkedin
            </p>
            <a
              href={companyData.Social_Profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.Social_Profile.linkedin}
            </a>
          </div>
          <div className="company-detailsinfo">
            <p className="info">
              <CiCircleInfo />
              Address
            </p>
            <span>{companyData.Address}</span>
          </div>
        </div>

        <div className="company-screenshot">
          <div className="screenshot">
            <p>
              <IoCameraOutline />
              Screenshot of Webpage
            </p>
            <img
              className="screenshotimage"
              src={companyData.screenshot} // Assuming there's a screenshot URL in your data
              alt="Screenshot of website"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
