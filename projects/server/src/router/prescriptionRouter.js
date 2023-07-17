const express = require("express");
const router = require("express").Router();
const { c_prescription } = require("../controllers");

router.post("/prescription", uploadFile, c_prescription.addPrescription);

module.exports = router;
