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
      label: {
        uz: req.body.label?.uz,
        ru: req.body.label?.ru,
        en: req.body.label?.en,
      }
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
      description: {
        uz: req.body.description?.uz,
        ru: req.body.description?.ru,
        en: req.body.description?.en,
      },
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
      title: {
        uz: req.body.title?.uz,
        ru: req.body.title?.ru,
        en: req.body.title?.en,
      },
      description: {
        uz: req.body.description?.uz,
        ru: req.body.description?.ru,
        en: req.body.description?.en,
      }
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

    const newPerk = new Perks({
      label: {
        uz: req.body.label?.uz,
        ru: req.body.label?.ru,
        en: req.body.label?.en,
      }
    });

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
      title: {
        uz: req.body.title?.uz,
        ru: req.body.title?.ru,
        en: req.body.title?.en,
      },
      description: {
        uz: req.body.description?.uz,
        ru: req.body.description?.ru,
        en: req.body.description?.en,
      },
      mapEmbedUrl: req.body.mapEmbedUrl
    });

    const saved = await newLocation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /home/results/:id
router.put('/results/:id', async (req, res) => {
  try {
    const updated = await Results.findByIdAndUpdate(
      req.params.id,
      {
        number: req.body.number,
        label: {
          uz: req.body.label?.uz,
          ru: req.body.label?.ru,
          en: req.body.label?.en,
        },
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Result topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/results/:id
router.delete('/results/:id', async (req, res) => {
  try {
    const deleted = await Results.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Result topilmadi" });
    res.json({ message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PUT /home/story/:id
router.put('/story/:id', async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      {
        description: {
          uz: req.body.description?.uz,
          ru: req.body.description?.ru,
          en: req.body.description?.en,
        },
        year: req.body.year,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Story topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/story/:id
router.delete('/story/:id', async (req, res) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Story topilmadi" });
    res.json({ message: "O'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /home/values/:id
router.put('/values/:id', async (req, res) => {
  try {
    const updated = await Value.findByIdAndUpdate(
      req.params.id,
      {
        title: {
          uz: req.body.title?.uz,
          ru: req.body.title?.ru,
          en: req.body.title?.en,
        },
        description: {
          uz: req.body.description?.uz,
          ru: req.body.description?.ru,
          en: req.body.description?.en,
        },
        icon: req.body.icon,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Value topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/values/:id
router.delete('/values/:id', async (req, res) => {
  try {
    const deleted = await Value.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Value topilmadi" });
    res.json({ message: "Value o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /home/jobs/:id
router.put('/jobs/:id', async (req, res) => {
  try {
    const updated = await Jobs.findByIdAndUpdate(
      req.params.id,
      {
        department: req.body.department,
        title: req.body.title,
        type: req.body.type,
        location: req.body.location,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Job topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/jobs/:id
router.delete('/jobs/:id', async (req, res) => {
  try {
    const deleted = await Jobs.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Job topilmadi" });
    res.json({ message: "Job o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /home/perks/:id
router.put('/perks/:id', async (req, res) => {
  try {
    const updated = await Perks.findByIdAndUpdate(
      req.params.id,
      {
        label: {
          uz: req.body.label?.uz,
          ru: req.body.label?.ru,
          en: req.body.label?.en,
        },
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Perk topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/perks/:id
router.delete('/perks/:id', async (req, res) => {
  try {
    const deleted = await Perks.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Perk topilmadi" });
    res.json({ message: "Perk o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /home/location/:id
router.put('/location/:id', async (req, res) => {
  try {
    const updated = await Location.findByIdAndUpdate(
      req.params.id,
      {
        title: {
          uz: req.body.title?.uz,
          ru: req.body.title?.ru,
          en: req.body.title?.en,
        },
        description: {
          uz: req.body.description?.uz,
          ru: req.body.description?.ru,
          en: req.body.description?.en,
        },
        mapEmbedUrl: req.body.mapEmbedUrl,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Location topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/location/:id
router.delete('/location/:id', async (req, res) => {
  try {
    const deleted = await Location.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Location topilmadi" });
    res.json({ message: "Location o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /home/work/:id
router.put('/work/:id', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/work/${req.file.filename}`
      : undefined;

    const updated = await Work.findByIdAndUpdate(
      req.params.id,
      { ...(imageUrl && { imageUrl }) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Work topilmadi" });
    res.json(updated);
  } catch (err) {
    console.error("Rasmni yangilashda xatolik:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /home/work/:id
router.delete('/work/:id', async (req, res) => {
  try {
    const deleted = await Work.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Work topilmadi" });
    res.json({ message: "Work o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;