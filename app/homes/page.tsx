import HomesClient from "./components/homes-client"
import { fetchHomes } from "./home.api"


export default async function HomesPage() {
  const homes = await fetchHomes()

  return <HomesClient homes={homes} />
}
