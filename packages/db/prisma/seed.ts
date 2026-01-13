/**
 * Database Seed
 * Seed initial data for development
 */

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Full access to all features",
    },
  })

  await prisma.role.upsert({
    where: { name: "crm_manager" },
    update: {},
    create: {
      name: "crm_manager",
      description: "Access to CRM features",
    },
  })

  await prisma.role.upsert({
    where: { name: "content_editor" },
    update: {},
    create: {
      name: "content_editor",
      description: "Access to content management",
    },
  })

  await prisma.role.upsert({
    where: { name: "viewer" },
    update: {},
    create: {
      name: "viewer",
      description: "Read-only access",
    },
  })

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@prosfin.vn" },
    update: {},
    create: {
      email: "admin@prosfin.vn",
      name: "Admin User",
      passwordHash: hashedPassword,
      emailVerified: new Date(),
      roles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  })

  console.log("✅ Created admin user:", adminUser.email)

  // Create sample clients
  const clients = []
  const clientNames = [
    "Alice Johnson",
    "Bob Williams",
    "Carol Miller",
    "Derek Moore",
    "Eva Taylor",
    "Frank Davis",
    "Grace Wilson",
    "Henry Brown",
    "Iris Martinez",
    "Jack Anderson",
  ]
  const companies = [
    "Alpha Industries",
    "Beta Solutions",
    "Gamma Corp",
    "Delta Services",
    "Epsilon Group",
    "Zeta Tech",
    "Eta Systems",
    "Theta Ventures",
    "Iota Partners",
    "Kappa Inc",
  ]

  for (let i = 0; i < 10; i++) {
    const client = await prisma.client.create({
      data: {
        name: clientNames[i],
        company: companies[i],
        email: `${clientNames[i].toLowerCase().replace(/\s+/g, ".")}@${companies[i].toLowerCase().replace(/\s+/g, "")}.com`,
        status: i % 3 === 0 ? "active" : i % 3 === 1 ? "inactive" : "archived",
        ownerId: i < 3 ? adminUser.id : undefined,
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      },
    })
    clients.push(client)
  }

  console.log(`✅ Created ${clients.length} clients`)

  // Create sample leads
  const leads = []
  const leadNames = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "David Wilson",
    "Sarah Brown",
    "Robert Taylor",
    "Jessica Martinez",
    "William Anderson",
    "Ashley Thomas",
    "James Jackson",
    "Amanda White",
    "Christopher Harris",
    "Melissa Martin",
    "Daniel Thompson",
  ]
  const leadCompanies = [
    "Acme Corp",
    "Tech Solutions",
    "Global Industries",
    "Digital Ventures",
    "Innovation Labs",
    "Future Systems",
    "Smart Business",
    "NextGen Corp",
    "Prime Services",
    "Elite Group",
    "Advanced Tech",
    "Modern Solutions",
    "Creative Agency",
    "Dynamic Systems",
    "Strategic Partners",
  ]
  const interests = [
    "Financial Planning",
    "Tax Services",
    "Accounting",
    "Business Consulting",
    "Investment Advice",
  ]
  const sources = ["website", "referral", "social", "other"]
  const statuses = ["new", "contacted", "qualified", "converted", "archived"]

  for (let i = 0; i < 15; i++) {
    const lead = await prisma.lead.create({
      data: {
        name: leadNames[i],
        company: leadCompanies[i],
        email: `${leadNames[i].toLowerCase().replace(/\s+/g, ".")}@${leadCompanies[i].toLowerCase().replace(/\s+/g, "")}.com`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        interest: interests[i % interests.length],
        status: statuses[i % statuses.length],
        source: sources[i % sources.length],
        ownerId: i < 5 ? adminUser.id : undefined,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      },
    })
    leads.push(lead)
  }

  console.log(`✅ Created ${leads.length} leads`)

  // Create sample posts
  const posts = []
  const titles = [
    "Getting Started with Financial Planning",
    "Understanding Tax Deductions",
    "Best Practices for Small Business Accounting",
    "Investment Strategies for Beginners",
    "How to Manage Cash Flow Effectively",
    "Year-End Tax Planning Guide",
    "Choosing the Right Accounting Software",
    "Retirement Planning Essentials",
    "Business Expense Tracking Tips",
    "Understanding Financial Statements",
    "Tax Preparation Checklist",
    "Budgeting for Small Businesses",
    "Investment Portfolio Diversification",
    "Accounting Software Comparison",
    "Financial Planning for Freelancers",
    "Tax Benefits for Small Business Owners",
    "Cash Flow Management Strategies",
    "Understanding Payroll Taxes",
    "Financial Planning for Families",
    "Business Tax Deductions Guide",
  ]

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const postStatuses = ["draft", "scheduled", "published", "archived"]

  for (let i = 0; i < 20; i++) {
    const title = titles[i]
    const slug = slugify(title)
    const status = postStatuses[i % postStatuses.length]
    const createdAt = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000)
    const publishedAt = status === "published" ? new Date(createdAt.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined
    const scheduledAt = status === "scheduled" ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: `This is an excerpt for ${title}.`,
        content: `# ${title}\n\nThis is the content for ${title}.`,
        status,
        authorId: adminUser.id,
        publishedAt,
        scheduledAt,
        createdAt,
        updatedAt: createdAt,
      },
    })
    posts.push(post)
  }

  console.log(`✅ Created ${posts.length} posts`)

  // Create sample media assets
  const mediaAssets = []
  for (let i = 0; i < 5; i++) {
    const media = await prisma.mediaAsset.create({
      data: {
        type: "image",
        name: `sample-image-${i + 1}.jpg`,
        size: 1024 * 1024 * (i + 1), // 1MB, 2MB, etc.
        mime: "image/jpeg",
        url: `https://example.com/media/sample-image-${i + 1}.jpg`,
        key: `media/sample-image-${i + 1}.jpg`,
        width: 1920,
        height: 1080,
        createdBy: adminUser.id,
      },
    })
    mediaAssets.push(media)
  }

  console.log(`✅ Created ${mediaAssets.length} media assets`)

  // Create sample comments
  const comments = []
  const commentAuthors = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Tom Brown"]
  const commentStatuses = ["pending", "approved", "spam", "trashed"]

  for (let i = 0; i < 10; i++) {
    const post = posts[i % posts.length]
    const comment = await prisma.comment.create({
      data: {
        postId: post.id,
        authorName: commentAuthors[i % commentAuthors.length],
        authorEmail: `${commentAuthors[i % commentAuthors.length].toLowerCase().replace(/\s+/g, ".")}@example.com`,
        content: `This is a sample comment ${i + 1} for the post "${post.title}".`,
        status: commentStatuses[i % commentStatuses.length],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    })
    comments.push(comment)
  }

  console.log(`✅ Created ${comments.length} comments`)

  console.log("🎉 Seeding completed!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

