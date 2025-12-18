import type { Tag } from "@/types"

const tagNames = [
  "Financial Planning", "Tax Tips", "Accounting", "Business", "Investment",
  "Small Business", "Tax Deductions", "Cash Flow", "Budgeting", "Retirement",
  "Tax Preparation", "Accounting Software", "Financial Health", "Tax Strategy",
  "Business Expenses", "Investment Planning", "Tax Credits", "Payroll", "Bookkeeping",
  "Wealth Management", "Tax Planning", "Financial Statements", "Business Growth",
  "Tax Benefits", "Financial Goals", "Tax Filing", "Business Management", "Investment Tips",
]

const statuses: Tag["status"][] = ["active", "archived"]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function generateTags(count: number): Tag[] {
  const tags: Tag[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const name = tagNames[i % tagNames.length]
    const slug = slugify(name)
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const updatedAt = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    const postCount = Math.floor(Math.random() * 20)

    tags.push({
      id: `tag-${i + 1}`,
      name,
      slug,
      status,
      updatedAt,
      postCount,
    })
  }

  return tags
}

export const mockTags = generateTags(20)
