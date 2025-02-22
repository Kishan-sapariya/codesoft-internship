import profileDetails from "../model/profile.model.js";

export const getAllPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await profileDetails.getAllPostById(id);
    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfileByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await profileDetails.getProfileByUsername(username);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in profile.controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, bio, link } = req.body;
  try {
    const result = await profileDetails.updateProfile(
      id,
      username,
      email,
      bio,
      link
    );
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in profile.controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllLikedPostByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await profileDetails.getAllLikedPostByUserId(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in profile.controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
