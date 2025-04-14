import { db } from "../..";
import events, { NewEvent } from "../../schema/events/events.schema";

const seedEvents = async () => {
  console.log(data);
  await db.insert(events).values(data);
  console.log("✅ Events seeded successfully!");
};

const data: NewEvent[] = [
  {
    title:
      "Africa University Cultural Extravaganza: Rudi Kwenye Asili Yako (Return to the Roots)",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2024/10/CULTURE-NIGHT-OCTOBER-2024-29-800x445.jpg",
    organizer: "Africa University",
    description:
      "Join us for the Africa University Cultural Extravaganza, themed 'Rudi Kwenye Asili Yako' (Return to the Roots)! This vibrant celebration will showcase the rich and diverse cultural heritage of our student body through traditional music, dynamic dance performances, and colorful displays of cultural attire. Don’t miss this exciting opportunity to experience unity in diversity and connect with different cultures on campus.",
    date: new Date("2024-04-12"),
    time: "14:00",
    points: 10,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "ongoing",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "Soul Sessions IV: Expression of the African Soul",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2023/03/pexels-nappy-935985-800x445.jpg",
    organizer: "Africa University",
    description:
      "Join us for Soul Sessions IV, themed 'Expression of the African Soul,' as we celebrate Black History Month with an evening of soulful performances, poetry, and cultural expression. This event will showcase the rich diversity and talent within our community, providing a platform for voices to be heard and stories to be shared. Don't miss this opportunity to immerse yourself in the rhythms and narratives that define our heritage.",
    date: new Date("2025-02-20"),
    time: "18:00",
    points: 10,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "upcoming",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "Africa University Campus Clubs Fair",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2023/09/CLUB-EXHIBITION-12-800x445.jpg",
    organizer: "Africa University Student Affairs",
    description:
      "Kick off the new semester by exploring the diverse range of student clubs and societies at Africa University! The Campus Clubs Fair offers an excellent opportunity to meet club representatives, learn about various extracurricular activities, and sign up for groups that match your interests. Whether you're passionate about arts, sports, culture, or academics, there's a club for you. Don't miss this chance to enrich your university experience and connect with fellow students!",
    date: new Date("2025-09-15"),
    time: "10:00",
    points: 5,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "upcoming",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "Africa University Sports Day",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-15-at-13.40.01-1-800x445.jpeg",
    organizer: "Africa University Student Affairs",
    description:
      "Get ready to energize your body and mind at the upcoming Africa University Sports Day! This exciting event will offer a variety of fun and competitive activities designed to help students unwind and connect before the exam season. Join us for a day filled with sports, laughter, and camaraderie. Whether you're an athlete or just looking to have fun, there's something for everyone. Don't miss out on this opportunity to relieve stress and build lasting memories!",
    date: new Date("2025-04-10"),
    time: "09:00",
    points: 5,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "completed",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "AU Health Fair: Motivate Yourself, Activate Your Health",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2023/03/Health-fare-18-800x445.jpg",
    organizer: "Africa University Student Affairs",
    description:
      "Join us for the AU Health Fair, themed 'Motivate Yourself, Activate Your Health'! This event will provide an opportunity to learn more about HIV and AIDS, mental health, and physical health, as well as encourage HIV self-testing for all attendees. Engage with health professionals, participate in interactive sessions, and take proactive steps towards a healthier lifestyle. Don't miss this chance to prioritize your well-being and connect with the campus community!",
    date: new Date("2025-03-27"),
    time: "10:00",
    points: 5,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "upcoming",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "World Diabetes Day Wellness Event",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2020/11/MG_1858-800x445.jpg",
    organizer: "Africa University",
    description:
      "Join us in commemorating World Diabetes Day with a dedicated wellness event aimed at promoting staff health and well-being. The event will feature informative sessions on diabetes awareness, preventive health screenings, and engaging wellness activities. Participate in our wellness walk, attend health talks by medical professionals, and take advantage of on-site health checks. Let's come together to prioritize our health and support a culture of well-being within our university community.",
    date: new Date("2025-11-14"),
    time: "09:00",
    points: 5,
    location: "Africa University Main Campus, Mutare, Zimbabwe",
    status: "upcoming",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
  {
    title: "Africa University Bird Watching Excursion",
    image:
      "https://aunews.africau.edu/wp-content/uploads/2023/03/birding-group-2023-March-800x445.jpg",
    organizer: "Africa University Environmental Club",
    description:
      "Embark on a guided bird-watching excursion to explore the rich avian diversity surrounding Africa University. This event offers students and staff an opportunity to connect with nature, observe various bird species in their natural habitats, and learn about local biodiversity. Whether you're a seasoned bird watcher or a curious beginner, join us for a morning of discovery and relaxation amidst the campus's natural wonders.",
    date: new Date("2025-05-15"),
    time: "07:00",
    points: 5,
    location:
      "Africa University Campus and surrounding natural areas, Mutare, Zimbabwe",
    status: "upcoming",
    updated_at: new Date("2025-04-14T00:00:00Z"),
    created_at: new Date("2025-04-14T00:00:00Z"),
  },
];

seedEvents()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
