export const testUser = (req, res) => {
  res.status(200).json({
    message: "User route is working",
  });
}; // This function handles a test route for user-related operations.
