import type { Post } from "@/features/content/types"

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
  "Accounting Best Practices",
  "Investment Risk Management",
  "Tax Filing Tips and Tricks",
  "Small Business Financial Health",
  "Retirement Savings Strategies",
  "Expense Management Tools",
  "Financial Planning Timeline",
  "Tax Planning Throughout the Year",
  "Accounting for E-commerce",
  "Investment Planning Basics",
  "Understanding Business Taxes",
  "Financial Goal Setting",
  "Tax Preparation Software Review",
  "Cash Flow Forecasting",
  "Accounting for Startups",
  "Investment Portfolio Rebalancing",
  "Tax Strategies for Entrepreneurs",
  "Financial Planning Checklist",
  "Business Expense Categories",
  "Understanding Tax Credits",
]

const statuses: Post["status"][] = ["draft", "published", "archived"]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function generatePosts(count: number): Post[] {
  const posts: Post[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length]
    const slug = slugify(title)
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const updatedAt = new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000)
    const publishedAt = status === "published" 
      ? new Date(updatedAt.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      : undefined

    posts.push({
      id: `post-${i + 1}`,
      title,
      slug,
      status,
      updatedAt,
      publishedAt,
      content: `# ${title}\n\nContent for ${title}...`,
      channels: ["facebook"],
      createdAt: updatedAt,
      tags: [],
      authorId: "author-1",
      authorName: "Admin User",
    })
  }

  return posts
}

export const mockPosts = generatePosts(40)
