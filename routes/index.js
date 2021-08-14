const express = require('express');
const router = express.Router();

router.use("/admin", require('../modules/admin/route/adminRoutes'));

module.exports = router;
