import type { Client } from "@/types"

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

const owners = [
  "John Manager", "Jane Director", "Mike Lead", "Sarah Admin", undefined,
]

const statuses: Client["status"][] = ["active", "inactive", "archived"]

function generateClients(count: number): Client[] {
  const clients: Client[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length]
    const company = companies[i % companies.length]
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@${company.toLowerCase().replace(/\s+/g, "")}.com`
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const owner = owners[Math.floor(Math.random() * owners.length)]
    const createdAt = new Date(now.getTime() - Math.random() * 180 * 24 * 60 * 60 * 1000)

    clients.push({
      id: `client-${i + 1}`,
      name,
      company,
      email,
      status,
      owner,
      createdAt,
    })
  }

  return clients
}

export const mockClients = generateClients(50)
