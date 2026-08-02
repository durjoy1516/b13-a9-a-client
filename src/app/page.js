import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-2xl p-8 md:p-12 mb-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-primary">Find Your Expert Tutor Today</h1>
            <p className="py-6 text-gray-600">
              Connect with experienced medical and science tutors to boost your learning and academic journey with MediQueue.
            </p>
            <Link href="/tutors" className="btn btn-primary">
              Browse All Tutors
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section Preview */}
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold mb-4">Why Choose MediQueue?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card bg-base-100 shadow-xl border p-6">
            <h3 className="text-xl font-semibold mb-2 text-primary">Verified Tutors</h3>
            <p className="text-gray-600 text-sm">Learn from top medical and science students and teachers.</p>
          </div>
          <div className="card bg-base-100 shadow-xl border p-6">
            <h3 className="text-xl font-semibold mb-2 text-primary">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Book sessions directly and manage your schedule effortlessly.</p>
          </div>
          <div className="card bg-base-100 shadow-xl border p-6">
            <h3 className="text-xl font-semibold mb-2 text-primary">Flexible Timing</h3>
            <p className="text-gray-600 text-sm">Choose tutoring slots that best fit your routine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}