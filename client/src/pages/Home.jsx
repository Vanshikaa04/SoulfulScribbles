
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import CategoryCarousel from './../components/CategoryCarouel';
import OccasionCarousel from '../components/OccasionCarousel';
import FounderSection from '../components/FounderSection';
import CustomizableCarousel from '../components/CustomizableCarousel';
import VideoCarousel from '../components/VideoCarousel';
import FeatureSection from '../components/FeatureSection';
import FeaturedProducts from './../components/FeaturedProducts';
import LatestCollection from '../components/LatestCollection';


const Home = () => {

  return (
    <div>
      <Hero />
      <OccasionCarousel/>
      <CategoryCarousel />
      <LatestCollection/>
      <FeatureSection/>
      <FeaturedProducts/>
      <CustomizableCarousel/>
      <FounderSection/>
       <FAQ />
       <VideoCarousel/>
    
      
    </div>
  );
};

export default Home;