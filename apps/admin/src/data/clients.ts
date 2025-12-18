import type { Client } from "@/features/crm/types"

const names = [
  "Alice Johnson", "Bob Williams", "Carol Miller", "Derek Moore", "Eva Taylor",
  "Frank Davis", "Grace Wilson", "Henry Brown", "Iris Martinez", "Jack Anderson",
  "Kate Thomas", "Liam Jackson", "Mia White", "Noah Harris", "Olivia Martin",
  "Paul Thompson", "Quinn Garcia", "Rachel Rodriguez", "Sam Lewis", "Tina Lee",
  "Uma Walker", "Victor Hall", "Wendy Young", "Xavier King", "Yara Lopez",
  "Zoe Hill", "Adam Green", "Bella Adams", "Caleb Baker", "Diana Gonzalez",
  "Ethan Nelson", "Fiona Carter", "George Mitchell", "Hannah Perez", "Isaac Roberts",
  "Julia Turner", "Kyle Phillips", "Luna Campbell", "Mason Parker", "Nora Evans",
]

const companies = [
  "Alpha Industries", "Beta Solutions", "Gamma Corp", "Delta Services", "Epsilon Group",
  "Zeta Tech", "Eta Systems", "Theta Ventures", "Iota Partners", "Kappa Inc",
  "Lambda Corp", "Mu Services", "Nu Solutions", "Xi Group", "Omicron Tech",
  "Pi Industries", "Rho Systems", "Sigma Corp", "Tau Ventures", "Upsilon Group",
  "Phi Solutions", "Chi Tech", "Psi Corp", "Omega Industries", "Apex Systems",
  "Nexus Corp", "Vertex Group", "Matrix Solutions", "Vector Tech", "Tensor Corp",
  "Scalar Systems", "Quantum Group", "Proton Corp", "Neutron Tech", "Electron Systems",
  "Photon Group", "Atom Corp", "Molecule Tech", "Compound Systems", "Element Group",
]

const titles = [
  "CEO", "CFO", "CTO", "COO", "CMO", "VP Sales", "VP Marketing", "Director", "Manager", undefined,
]

const owners = [
  { id: "user-1", name: "John Manager" },
  { id: "user-2", name: "Jane Director" },
  { id: "user-3", name: "Mike Lead" },
  { id: "user-4", name: "Sarah Admin" },
  undefined,
]

const statuses: Client["status"][] = ["active", "inactive", "archived"]

const tags = [
  ["vip", "enterprise"],
  ["startup"],
  ["sme"],
  ["enterprise", "vip"],
  [],
  ["startup", "sme"],
  ["vip"],
  [],
  ["enterprise"],
  ["sme"],
]

// Fixed dates để data không thay đổi
const baseDate = new Date("2024-01-01T00:00:00Z")
const daysAgo = (days: number) => new Date(baseDate.getTime() - days * 24 * 60 * 60 * 1000)

function generateClients(count: number): Client[] {
  const clients: Client[] = []

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length]
    const company = companies[i % companies.length]
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@${company.toLowerCase().replace(/\s+/g, "")}.com`
    const status = statuses[i % statuses.length]
    const owner = owners[i % owners.length]
    const title = titles[i % titles.length]
    const clientTags = tags[i % tags.length]
    const createdAt = daysAgo(180 - (i % 180))
    const updatedAt = daysAgo(180 - (i % 180) - (i % 30))
    const lastContactedAt = i % 3 === 0 ? daysAgo(30 - (i % 30)) : undefined
    const phone = i % 2 === 0 ? `+84${900000000 + i}` : undefined

    clients.push({
      id: `client-${i + 1}`,
      name,
      company,
      title,
      email,
      phone,
      status,
      ownerId: owner?.id,
      ownerName: owner?.name,
      tags: clientTags,
      lastContactedAt,
      createdAt,
      updatedAt,
    })
  }

  return clients
}

// Generate once và export constant để data không thay đổi
export const mockClients: Client[] = generateClients(50)
