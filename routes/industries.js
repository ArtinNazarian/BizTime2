const express = require("express");
const ExpressError = require("../expressError");
// const slugify = require("slugify");
const router = express.Router();
const db = require("../db");

router.get("/:code", async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT code, name, industry_code FROM companies JOIN companies_industries ON companies.code = companies_industries.comp_code where code=$1",
      [req.params.code]
    );
    const { code, name } = result.rows[0];
    const industry = result.rows.map((r) => r.industry_code);

    return res.json({ code, name, industry });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { code, industry } = req.body;
    console.log(code, industry);
    const result = await db.query(
      "INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry",
      [code, industry]
    );
    return res.status(201).json({ industry: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
