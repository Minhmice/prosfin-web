import type { Lead } from "@/types"

const names = [
  "John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Wilson",
  "Sarah Brown", "Robert Taylor", "Jessica Martinez", "William Anderson", "Ashley Thomas",
  "James Jackson", "Amanda White", "Christopher Harris", "Melissa Martin", "Daniel Thompson",
  "Michelle Garcia", "Matthew Martinez", "Stephanie Robinson", "Andrew Clark", "Nicole Rodriguez",
  "Joshua Lewis", "Rebecca Lee", "Ryan Walker", "Lauren Hall", "Kevin Young",
  "Samantha King", "Brandon Wright", "Rachel Lopez", "Justin Hill", "Megan Green",
  "Tyler Adams", "Kimberly Baker", "Jacob Gonzalez", "Laura Nelson", "Nathan Carter",
  "Stephanie Mitchell", "Zachary Perez", "Brittany Roberts", "Austin Turner", "Amanda Phillips",
  "Jordan Campbell", "Heather Parker", "Cameron Evans", "Jennifer Edwards", "Connor Collins",
]

const companies = [
  "Acme Corp", "Tech Solutions", "Global Industries", "Digital Ventures", "Innovation Labs",
  "Future Systems", "Smart Business", "NextGen Corp", "Prime Services", "Elite Group",
  "Advanced Tech", "Modern Solutions", "Creative Agency", "Dynamic Systems", "Strategic Partners",
  "Visionary Inc", "Proactive Solutions", "Excellence Group", "Premium Services", "Top Tier Corp",
  "Leading Edge", "First Class", "Superior Systems", "Optimal Solutions", "Peak Performance",
  "Summit Group", "Apex Corp", "Zenith Services", "Pinnacle Tech", "Crest Industries",
  "Peak Solutions", "High Point", "Summit Ventures", "Elevate Corp", "Ascend Group",
  "Rise Systems", "Climb Tech", "Soar Solutions", "Sky High Corp", "Cloud Nine",
]

const interests = [
  "Financial Planning", "Tax Services", "Accounting", "Business Consulting", "Investment Advice",
  "Wealth Management", "Bookkeeping", "Audit Services", "Payroll", "Budget Planning",
]

const sources: Lead["source"][] = ["website", "referral", "social", "other"]
const statuses: Lead["status"][] = ["new", "contacted", "qualified", "converted", "archived"]

function generateLeads(count: number): Lead[] {
  const leads: Lead[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length]
    const company = companies[i % companies.length]
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@${company.toLowerCase().replace(/\s+/g, "")}.com`
    const phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
    const interest = interests[i % interests.length]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const utmCampaign = Math.random() > 0.5 ? `campaign-${Math.floor(Math.random() * 10) + 1}` : undefined
    
    const createdAt = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    const updatedAt = new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)

    leads.push({
      id: `lead-${i + 1}`,
      name,
      company,
      email,
      phone,
      interest,
      status,
      source,
      utmCampaign,
      createdAt,
      updatedAt,
    })
  }

  return leads
}

export const mockLeads = generateLeads(75)
