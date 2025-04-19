import Carousels from "../components/Carousels"
import LatestCollection from "../components/LatestCollection"
import Bestseller from "../components/Bestseller"
import Workshop from "../components/Workshop"
import Customizable from "../components/Customizable"

const Home = () => {
  return (
    <>
    <Workshop/>
   <Carousels/>
    <LatestCollection/>
      <Bestseller/>
      <Customizable/>
    </>
  )
}

export default Home
