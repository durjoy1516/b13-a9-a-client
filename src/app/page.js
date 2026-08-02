import Banner from '@/components/home/Banner';
import FeaturedTutors from '@/components/home/FeaturedTutors';
import ExtraSection1 from '@/components/home/ExtraSection1';
import ExtraSection2 from '@/components/home/ExtraSection2';

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* 1. Banner Carousel Section */}
      <Banner />

      {/* 2. Available / Featured Tutors (Limit 6 from DB) */}
      <FeaturedTutors />

      {/* 3. Extra Section 1: Why Choose MediQueue */}
      <ExtraSection1 />

      {/* 4. Extra Section 2: How MediQueue Works */}
      <ExtraSection2 />
    </div>
  );
}