import { db } from "../..";
import articles from "../../schema/articles.schema";

async function seedArticles() {
  await db.insert(articles).values(articlesSeed);

  console.log("✅ Articles seeded successfully.");
}

const articlesSeed = [
  {
    title: "AU Experts Release Powerful New Guide to Mastering Stress",
    summary:
      "Africa University experts have released a comprehensive guide that offers practical techniques to manage stress. The guide covers strategies from mindfulness to physical activity, empowering readers to handle stress more effectively.",
    cover_image:
      "https://aunews.africau.edu/wp-content/uploads/2023/07/guide-to-mastering-stress.jpg",
    author: "Africa University",
    category: "Health & Wellness",
    read_time: 5,
    url: "https://aunews.africau.edu/wp-content/uploads/2024/09/BOOK-RELEASE-SEPTEMBER-2024-5-800x445.jpg",
    created_at: new Date("2023-07-12T10:00:00Z"),
    updated_at: new Date("2023-07-12T10:00:00Z"),
  },
  {
    title: "Looking After Your Mental Health: Stress and Stress Management",
    summary:
      "This article explores the concept of stress, its types, symptoms, and causes, while also providing practical ways to manage it effectively. It emphasizes the importance of awareness, self-care, and professional support in maintaining good mental health.",
    cover_image:
      "https://aunews.africau.edu/wp-content/uploads/2022/10/mental-health.jpg",
    author: "Africa University",
    category: "Mental Health",
    read_time: 6,
    url: "https://aunews.africau.edu/wp-content/uploads/2023/08/stress.jpg",
    created_at: new Date("2022-10-14T10:00:00Z"),
    updated_at: new Date("2022-10-14T10:00:00Z"),
  },
  {
    title: "Coping with Exam Stress",
    summary:
      "This article offers students practical strategies to manage exam-related stress, including preparation tips, relaxation techniques, and healthy lifestyle habits. It emphasizes balance, time management, and support systems as key to academic success and mental well-being.",
    cover_image:
      "https://aunews.africau.edu/wp-content/uploads/2023/04/pexels-ketut-subiyanto-4560076-800x445.jpg",
    author: "Africa University",
    category: "Student Life",
    read_time: 4,
    url: "https://aunews.africau.edu/coping-with-exam-stress/",
    created_at: new Date("2022-10-21T10:00:00Z"),
    updated_at: new Date("2022-10-21T10:00:00Z"),
  },
  {
    title:
      "Work-Related Stress Alleviation Workshop Empowers Staff on How to Lead Healthier and More Productive Lives",
    summary:
      "Africa University hosted a transformative workshop aimed at helping staff members understand and manage work-related stress. The session provided practical techniques and fostered dialogue around wellness, resilience, and mental health in the workplace.",
    cover_image:
      "https://aunews.africau.edu/wp-content/uploads/2021/09/stressSickness-1211324335-770x533-1-650x428-1.jpg",
    author: "Africa University",
    category: "Workplace Wellness",
    read_time: 4,
    url: "https://aunews.africau.edu/work-related-stress-alleviation-workshop-empowers-staff-on-how-to-lead-healthier-and-more-productive-lives/",
    created_at: new Date("2022-10-31T10:00:00Z"),
    updated_at: new Date("2022-10-31T10:00:00Z"),
  },
  {
    title: "Nurture Your Resilience",
    summary:
      "This article discusses the importance of building resilience by learning healthy coping strategies and utilizing community resources. It emphasizes that resilience is a process influenced by various factors, including family, community, and cultural practices, and is essential for overcoming adversity.",
    cover_image:
      "https://newsinhealth.nih.gov/sites/newsinhealth/files/2022/April/apr2022-cover-illustration-group-people-helping-person-over-crevice-mountain.jpg",
    author: "National Institutes of Health",
    category: "Mental Health",
    read_time: 6, // estimated based on article length (~1200 words)
    url: "https://newsinhealth.nih.gov/2022/04/nurture-your-resilience",
    created_at: new Date("2022-04-01T10:00:00Z"), // publication date from article
    updated_at: new Date("2022-04-01T10:00:00Z"),
  },
  {
    title: "Feeling Stressed?",
    summary:
      "This article explores the nature of stress, its impact on health, and effective strategies for managing it. It emphasizes the importance of recognizing stress signals, maintaining healthy habits, and seeking support when needed.",
    cover_image:
      "https://newsinhealth.nih.gov/sites/newsinhealth/files/2021/January/illustration-man-woman-laying-floor-hand-chest-hand-belly.jpg", // cover image from the article
    author: "National Institutes of Health",
    category: "Mental Health",
    read_time: 6, // estimated based on article length (~1200 words)
    url: "https://newsinhealth.nih.gov/2021/01/feeling-stressed",
    created_at: new Date("2021-01-01T10:00:00Z"), // publication date from article
    updated_at: new Date("2021-01-01T10:00:00Z"),
  },
  {
    title: "Mindfulness for Your Health",
    summary:
      "This article explores the concept of mindfulness, its benefits for mental and physical health, and practical ways to incorporate mindfulness into daily life. It discusses how mindfulness can help reduce stress, improve sleep, and promote healthier habits.",
    cover_image:
      "https://newsinhealth.nih.gov/sites/newsinhealth/files/2021/June/jun-2021-cover-illustration-woman-focusing-butterfly-worries-float-away.jpg", // cover image from the article
    author: "National Institutes of Health",
    category: "Mental Health",
    read_time: 6, // estimated based on article length (~1200 words)
    url: "https://newsinhealth.nih.gov/2021/06/mindfulness-your-health",
    created_at: new Date("2021-06-01T10:00:00Z"), // publication date from article
    updated_at: new Date("2021-06-01T10:00:00Z"),
  },
  {
    title: "Coping with Caregiving",
    summary:
      "This article discusses the challenges faced by caregivers, including physical and emotional stress, and offers strategies for self-care. It emphasizes the importance of organizing tasks, seeking help, taking breaks, and maintaining personal health to effectively care for others.",
    cover_image:
      "https://newsinhealth.nih.gov/sites/newsinhealth/files/Special-Issues/illustration-man-woman-sitting-couch.jpg",
    author: "National Institutes of Health",
    category: "Caregiving",
    read_time: 6, // estimated based on article length (~1200 words)
    url: "https://newsinhealth.nih.gov/2017/12/coping-caregiving",
    created_at: new Date("2017-12-01T10:00:00Z"), // publication date from article
    updated_at: new Date("2017-12-01T10:00:00Z"),
  },
];

seedArticles().catch((err) => {
  console.error("❌ Error seeding articles:", err);
  process.exit(1);
});
