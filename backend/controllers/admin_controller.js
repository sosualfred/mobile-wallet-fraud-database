
export const logout = async (req, res) => {
    try {
      // Check if session exists
      if (!req.session) {
        return res.sendStatus(404); // Not Found if session does not exist
      }
      req.session.destroy();
  
      res.status(200).json({ message: "You have been logged out successfully" });

    } catch (error) {res.status(500).json({ message: "Logout failed. Please try again." });
    }
  };