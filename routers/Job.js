const express = require('express');
const router = express.Router();

const jobs = [
 {
    slug: "full-stack-developer",
    title: {
      uz: "Call Center Qo'llab-quvvatlash Jamoasi Raxbari",
      ru: "Руководитель команды поддержки call-центра",
      en: "Call Center Support Team Lead"
    },
    location: "Hybrid",
    type: "Barcelona, Catalunya [Cataluña], Spain",
    description: {
      uz: `
        <h2>Jamoaga qo‘shiling. Ta’sir qiling.</h2>
        <p><strong>Holded</strong> kompaniyasida biz ishonamizki, kunlik ma’muriy ishlar hech qachon katta g‘oyaning muvaffaqiyatga erishishiga to‘sqinlik qilmasligi kerak. Shuning uchun biz har bir jasoratli ish boshlovchi uchun intuitiv dasturlar yaratamiz.</p>
        
        <h3>Vazifalar:</h3>
        <ul>
          <li>Call Center qo‘llab-quvvatlash guruhini boshqarish</li>
          <li>Kunlik jarayonlarni kuzatib borish</li>
          <li>Yangi funksiyalar haqida xodimlarni xabardor qilish</li>
          <li>Mijoz muammolarini hal qilish</li>
        </ul>
      `,
      ru: `
        <h2>Присоединяйтесь к команде. Внесите свой вклад.</h2>
        <p><strong>В Holded</strong> мы уверены, что рутинные задачи не должны мешать хорошей идее достичь успеха.</p>
        
        <h3>Обязанности:</h3>
        <ul>
          <li>Управление командой поддержки call-центра</li>
          <li>Контроль ежедневных операций</li>
          <li>Информирование команды о новых функциях</li>
          <li>Решение проблем клиентов</li>
        </ul>
      `,
      en: `
        <h2>Job description</h2>
        <p>At <strong>Holded</strong>, we believe daily admin should never stop a great idea from becoming a success.</p>
        
        <h3>Responsibilities:</h3>
        <ul>
          <li>Lead the Call Center Support team</li>
          <li>Monitor daily operations</li>
          <li>Keep the team informed about new features</li>
          <li>Resolve customer issues</li>
        </ul>
      `
    }
  },
  {
    slug: "backend-senior",
    title: {
      uz: "Call Center Qo'llab-quvvatlash Jamoasi Raxbari",
      ru: "Руководитель команды поддержки call-центра",
      en: "Call Center Support Team Lead"
    },
    location: "Barcelona",
    type: "Full-time",
    description: {
      uz: `
        <h2>Jamoaga qo‘shiling. Ta’sir qiling.</h2>
        <p><strong>Holded</strong> kompaniyasida biz ishonamizki, kunlik ma’muriy ishlar hech qachon katta g‘oyaning muvaffaqiyatga erishishiga to‘sqinlik qilmasligi kerak. Shuning uchun biz har bir jasoratli ish boshlovchi uchun intuitiv dasturlar yaratamiz.</p>
        
        <h3>Vazifalar:</h3>
        <ul>
          <li>Call Center qo‘llab-quvvatlash guruhini boshqarish</li>
          <li>Kunlik jarayonlarni kuzatib borish</li>
          <li>Yangi funksiyalar haqida xodimlarni xabardor qilish</li>
          <li>Mijoz muammolarini hal qilish</li>
        </ul>
      `,
      ru: `
        <h2>Присоединяйтесь к команде. Внесите свой вклад.</h2>
        <p><strong>В Holded</strong> мы уверены, что рутинные задачи не должны мешать хорошей идее достичь успеха.</p>
        
        <h3>Обязанности:</h3>
        <ul>
          <li>Управление командой поддержки call-центра</li>
          <li>Контроль ежедневных операций</li>
          <li>Информирование команды о новых функциях</li>
          <li>Решение проблем клиентов</li>
        </ul>
      `,
      en: `
        <h2>Join the team. Make an impact.</h2>
        <p>At <strong>Holded</strong>, we believe daily admin should never stop a great idea from becoming a success.</p>
        
        <h3>Responsibilities:</h3>
        <ul>
          <li>Lead the Call Center Support team</li>
          <li>Monitor daily operations</li>
          <li>Keep the team informed about new features</li>
          <li>Resolve customer issues</li>
        </ul>
      `
    }
  },
  // boshqa ishlar ham shu yerga qo‘shiladi
];

const verifyToken = require('../middleware/AuthMiddleware');

router.get('/', verifyToken, (req, res) => {
  res.json(jobs);
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const job = jobs.find(j => j.slug === slug);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
});

module.exports = router;