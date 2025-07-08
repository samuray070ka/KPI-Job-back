const express = require('express');
const router = express.Router();

// const TextFirst = require('../models/Text');
const Results = require('../models/Result');
const Story = require('../models/Story');
const Value = require('../models/Value');
const Jobs = require('../models/Job');
const Perks = require('../models/Perk');
const Work = require('../models/Work');
const Location = require('../models/Location');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🔧 Multer konfiguratsiyasi — uploads/work papkasi avtomatik yaratiladi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/work/";
    // Papka mavjud emas bo‘lsa — yarat
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });


// =============== GET ROUTES ===============
// router.get('/text', async (req, res) => {
//   try {
//     const text = await TextFirst.find();
//     res.json(text);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get('/results', async (req, res) => {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/story', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/values', async (req, res) => {
  try {
    const values = await Value.find();
    res.json(values);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/perks', async (req, res) => {
  try {
    const perks = await Perks.find();
    res.json(perks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/work", async (req, res) => {
  try {
    const work = await Work.find();
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: "Work ma’lumotlarini olishda xatolik" });
  }
});

router.get('/location', async (req, res) => {
  try {
    const location = await Location.find();
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =============== POST ROUTES ===============
// router.post('/text', async (req, res) => {
//   const newText = new TextFirst({
//     title: req.body.title,
//     description: req.body.description
//   });
//   try {
//     const savedText = await newText.save();
//     res.status(201).json(savedText);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// ========== RESULT: max 4 ta ==========
router.post('/results', async (req, res) => {
  try {
    const count = await Results.countDocuments();
    if (count >= 4) {
      return res.status(400).json({ message: "Faqat 4 ta result kiritish mumkin!" });
    }

    const newResult = new Results({
      number: req.body.number,
      label: req.body.label
    });
    const saved = await newResult.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ========== STORY: max 10 ta ==========
router.post('/story', async (req, res) => {
  try {
    const count = await Story.countDocuments();
    if (count >= 10) {
      return res.status(400).json({ message: "Faqat 10 ta story kiritish mumkin!" });
    }

    const newStory = new Story({
      icon: req.body.icon,
      description: req.body.description,
      year: req.body.year
    });
    const saved = await newStory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========== VALUE: max 6 ta ==========
router.post('/values', async (req, res) => {
  try {
    const count = await Value.countDocuments();
    if (count >= 6) {
      return res.status(400).json({ message: "Faqat 6 ta value kiritish mumkin!" });
    }

    const newValue = new Value({
      icon: req.body.icon,
      title: req.body.title,
      description: req.body.description
    });
    const saved = await newValue.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/jobs', async (req, res) => {
  const newJob = new Jobs({
    department: req.body.department,
    title: req.body.title,
    type: req.body.type,
    location: req.body.location
  });
  try {
    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ========== PERK: max 10 ta ==========
router.post('/perks', async (req, res) => {
  try {
    const count = await Perks.countDocuments();
    if (count >= 10) {
      return res.status(400).json({ message: "Faqat 10 ta perk kiritish mumkin!" });
    }

    const newPerk = new Perks({ label: req.body.label });
    const saved = await newPerk.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// ✅ POST /work: rasm bilan ishlaydi
router.post('/work', upload.single('image'), async (req, res) => {
  try {
    // 3 ta rasm cheklovi
    const count = await Work.countDocuments();
    if (count >= 3) {
      return res.status(400).json({ message: "Faqat 3 ta rasm yuklash mumkin!" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/work/${req.file.filename}`;
    const newWork = new Work({ imageUrl });
    const saved = await newWork.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Rasm yuklashda xatolik:", err);
    res.status(400).json({ message: err.message });
  }
});



// ========== LOCATION: faqat 1 ta ==========
router.post('/location', async (req, res) => {
  try {
    const count = await Location.countDocuments();
    if (count >= 1) {
      return res.status(400).json({ message: "Faqat 1 ta location bo'lishi mumkin!" });
    }

    const newLocation = new Location({
      title: req.body.title,
      description: req.body.description,
      mapEmbedUrl: req.body.mapEmbedUrl
    });
    const saved = await newLocation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;