import type { Lead } from "@prosfin/shared"

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

const owners = [
  { id: "user-1", name: "John Manager" },
  { id: "user-2", name: "Jane Director" },
  { id: "user-3", name: "Mike Lead" },
  { id: "user-4", name: "Sarah Admin" },
  undefined,
]

const statuses: Lead["status"][] = ["new", "contacted", "qualified", "converted", "archived"]
const sources: Lead["source"][] = ["website", "referral", "social", "other"]

// Fixed dates để data không thay đổi
const baseDate = new Date("2024-01-01T00:00:00Z")
const daysAgo = (days: number) => new Date(baseDate.getTime() - days * 24 * 60 * 60 * 1000)
const daysFromNow = (days: number) => new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000)

function generateLeads(count: number): Lead[] {
  const leads: Lead[] = []

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length]
    const company = companies[i % companies.length]
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@${company.toLowerCase().replace(/\s+/g, "")}.com`
    const phone = i % 2 === 0 ? `+84${900000000 + i}` : undefined
    const status = statuses[i % statuses.length]
    const source = sources[i % sources.length]
    const owner = owners[i % owners.length]
    const createdAt = daysAgo(90 - (i % 90))
    const updatedAt = daysAgo(90 - (i % 90) - (i % 30))

    leads.push({
      id: `lead-${i + 1}`,
      name,
      company,
      email,
      phone,
      status,
      source,
      ownerId: owner?.id,
      ownerName: owner?.name,
      createdAt,
      updatedAt,
    })
  }

  return leads
}

// Generate once và export constant để data không thay đổi
export const mockLeads: Lead[] = generateLeads(75)
