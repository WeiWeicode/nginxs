exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  // 公開訪問
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  // user訪問
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  // admin訪問
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  // moderator訪問