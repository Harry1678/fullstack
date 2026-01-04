import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/admin",
  authenticate,
  requireRole("admin"),
  (_req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

export default router;
