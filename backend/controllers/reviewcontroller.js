const { analyzeCode } = require("../services/openaiservice.js");

const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await analyzeCode(code);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unable to return feedback" });
  }
};

module.exports = { reviewCode }; // ✅ must match the import
