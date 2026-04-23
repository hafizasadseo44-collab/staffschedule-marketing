const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding premium blog posts...');

  const posts = [
    {
      title: "The Future of AI-Powered Scheduling in 2026",
      slug: "future-of-ai-scheduling-2026",
      excerpt: "Explore how machine learning and predictive analytics are transforming how modern teams manage their workforce.",
      content: `
        <p>In the rapidly evolving landscape of workforce management, <strong>AI-powered scheduling</strong> has shifted from a "nice-to-have" to a mission-critical tool for operational excellence.</p>
        
        <h3>The Shift to Predictive Analytics</h3>
        <p>Gone are the days of reactive scheduling based on last year's spreadsheets. Modern AI models can now predict labor demand with up to 98% accuracy by analyzing historical data, local events, and seasonal trends.</p>
        
        <blockquote>
          "The goal isn't just to fill shifts, but to optimize the human capital of your organization for maximum impact and minimum burnout."
        </blockquote>

        <h3>Conclusion</h3>
        <p>As we move further into 2026, those who embrace automated intelligence will see significant reductions in labor costs and massive improvements in employee satisfaction.</p>
      `,
      image: "/images/blog/ai-scheduling.png",
      category: "AI",
      featured: true,
      published: true
    },
    {
      title: "5 Strategies to Boost Team Productivity and Morale",
      slug: "boost-team-productivity-morale",
      excerpt: "Learn how elite operations leaders use transparency and flexible scheduling to drive 20% higher output.",
      content: `
        <p>Productivity isn't just about working harder; it's about working <em>smarter</em>. In this guide, we dive into the psychology of high-performance teams.</p>
        
        <h3>1. Empowered Flexibility</h3>
        <p>Giving employees the ability to swap shifts instantly via a mobile app reduces absenteeism by up to 30%.</p>
        
        <h3>2. Real-time Feedback Loops</h3>
        <p>Using data to provide immediate recognition for high-performance shifts keeps morale high and turnover low.</p>
      `,
      image: "/images/blog/productivity.png",
      category: "Schedule",
      featured: false,
      published: true
    },
    {
      title: "Data-Driven Decisions: The Labors of Love",
      slug: "data-driven-decisions-labor",
      excerpt: "How to use scheduling analytics to identify bottlenecks and unlock hidden revenue in your service business.",
      content: `
        <p>Every shift generated in StaffSchedule.io produces millions of data points. Here is how you can use them to grow your business.</p>
        
        <h3>Identifying the Bottleneck</h3>
        <p>By comparing scheduled hours vs. actual sales data, you can pinpoint exactly where you are overstaffed or losing customers due to long wait times.</p>
      `,
      image: "/images/blog/analytics.png",
      category: "AI",
      featured: false,
      published: true
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`Upserted post: ${post.title}`);
  }

  console.log('Seed successful! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
