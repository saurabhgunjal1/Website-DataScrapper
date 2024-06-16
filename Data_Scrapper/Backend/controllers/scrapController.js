import fetch from "node-fetch";
import cheerio from "cheerio";
import Company from "../model/model.js";
export const scrapController = async (req, res) => {
  try {
    const { url } = req.body;
    console.log(url);

    const websiteResponse = await fetch(url);
    const htmlContent = await websiteResponse.text();

    // Parse the HTML content using cheerio
    const $ = cheerio.load(htmlContent);

    // Extract details from the parsed HTML
    const name = $("title").text() || $("h1").text();
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content");
    const logo =
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="icon"]').attr("href");
    const facebookUrl =
      $('a[href*="facebook.com"]').first().attr("href") ||
      $('a[href*="facebook.com"] svg').first().parent().attr("href"); // Updated selector for Facebook URL
    const linkedinUrl =
      $('a[href*="linkedin.com"]:first').attr("href") ||
      $('link[rel="me"][href*="linkedin.com"]:first').attr("href");
    const twitterUrl =
      $('a[href*="twitter.com"]:first').attr("href") ||
      $('link[rel="me"][href*="twitter.com"]:first').attr("href");
    const instagramUrl =
      $('a[href*="instagram.com"]:first').attr("href") ||
      $('link[rel="me"][href*="instagram.com"]:first').attr("href");
    const address =
      $("address:first").text() ||
      $("div.address").text() ||
      $("span.address").text();
    const phoneNumber =
      $("body")
        .text()
        .match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)?.[0] ||
      $("span.phone")
        .text()
        .match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)?.[0];
    const email =
      $("body")
        .text()
        .match(/\b[\w.%-]+@[\w.-]+\.[a-zA-Z]{2,4}\b/)?.[0] ||
      $('a[href^="mailto:"]').attr("href")?.replace("mailto:", "");

    const scrapedData = {
      Company: {
        name: name || "No name available", // Default value if name is not found
        logo: logo || "No logo available", // Default value if logo is not found
      },
      Social_Profile: {
        instagram: instagramUrl || "No Url Found",
        facebook: facebookUrl || "No Url Found",
        X: twitterUrl || "No Url Found", // Using "X" for Twitter as per your schema
        linkedin: linkedinUrl || "No Url Found",
      },
      Description: description || "No description found",
      Address: address || "Not Available",
      Phone_No: phoneNumber || "Not Available",
      Email: email || "No email available", // Default value if email is not found
    };

    console.log(scrapedData);

    const newScrapedData = new Company(scrapedData);
    await newScrapedData.save();

    return res.json({
      message: "Scraped website and saved to database",
      scrapedData,
    });
  } catch (error) {
    console.log("Error in scrap controller", error);
    return res.status(500).json({ error: "An error occurred during scraping" });
  }
};

export const getData = async (req, res) => {
  try {
    const data = await Company.find();
    return res.json(data);
  } catch (error) {
    console.log("Error in fetching data", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }
};

export const deleteData = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ error: "Invalid or missing IDs" });
    }

    // Delete the records from the database
    await Company.deleteMany({ _id: { $in: ids } });

    return res.json({ message: "Selected data deleted successfully" });
  } catch (error) {
    console.log("Error in delete controller", error);
    return res.status(500).json({ error: "An error occurred during deletion" });
  }
};

export const getDataByid = async (req, res) => {
  try {
    const companyName = req.params.id;
    const companyData = await Company.findOne({ "Company.id": companyName });

    if (!companyData) {
      return res.status(404).json({ error: "Company not found" });
    }
    console.log(companyData);
    return res.json(companyData);
  } catch (error) {
    console.error("Error in fetching company data by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
