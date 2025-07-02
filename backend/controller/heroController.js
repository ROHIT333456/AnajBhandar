// controller/heroController.js
import uploadOnCloudinary from "../config/cloudinary.js";
import Hero from "../model/Hero.js";

// CREATE hero slide
export const createHero = async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    // Ensure multer has put the file on disk in req.file.path
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Hero image file is required" });
    }

    // 1. Upload the local temp file to Cloudinary, delete local copy
    const imageUrl = await uploadOnCloudinary(req.file.path);

    // 2. Build the hero document
    const heroData = {
      text1,
      text2,
      image: imageUrl,
      date: Date.now(),
      active: true,
    };

    // 3. Save in MongoDB
    const hero = await Hero.create(heroData);
    return res.status(201).json(hero);
  } catch (error) {
    console.error("createHero error:", error);
    return res.status(500).json({ message: `createHero error: ${error.message}` });
  }
};

// LIST all heroes
export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find({ active: true });
    return res.status(200).json(heroes);
  } catch (error) {
    console.error("getAllHeroes error:", error);
    return res.status(500).json({ message: `getAllHeroes error: ${error.message}` });
  }
};

// DELETE a hero slide
export const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findByIdAndDelete(id);
    return res.status(200).json(hero);
  } catch (error) {
    console.error("deleteHero error:", error);
    return res.status(500).json({ message: `deleteHero error: ${error.message}` });
  }
};
