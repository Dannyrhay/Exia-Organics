import HeroRitual from '../components/home/HeroRitual';
import ShopByNeed from '../components/home/ShopByNeed';
import Bestsellers from '../components/home/Bestsellers';
import Rituals from '../components/home/Rituals';
import Story from '../components/home/Story';
import WhatsAppBand from '../components/home/WhatsAppBand';
import { BlogSection } from '../components/Block/BlogSection';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, useSeo } from '@/lib/seo';

const HomePage = () => {
    useSeo();
    return (
    <>
        <JsonLd data={organizationSchema()} />
        <HeroRitual />
        <ShopByNeed />
        <Bestsellers />
        <Rituals />
        <Story />
        <BlogSection />
        <WhatsAppBand />
    </>
    );
};

export default HomePage;
