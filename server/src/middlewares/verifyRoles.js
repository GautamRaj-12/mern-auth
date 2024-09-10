export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { roles } = req.user;

    if (!allowedRoles.some((role) => roles.includes(role))) {
      return res.status(403).json({ message: "Unauthorized: Access denied" });
    }
    next();
  };
};
