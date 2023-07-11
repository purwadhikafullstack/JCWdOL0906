const router = require("express").Router();
const { c_auth } = require("../controllers");
const { login } = require("../middleware/authorization.js");

router.post("/auth/register", c_auth.register);
router.post("/auth/login", c_auth.login);
router.post("/auth/verification", login, c_auth.verification);
router.post("/auth/reset-password", login, c_auth.reset_password);
router.post("/auth/confir-memail", c_auth.confirm_email);
router.get("/auth/keep-login", login, c_auth.keep_login);
router.get("/profile", login, c_auth.getProfile);
router.patch(
  "/profile/edit",
  login,
  uploadProfileUser.single("picture"),
  c_auth.editProfile
);


module.exports = router;
