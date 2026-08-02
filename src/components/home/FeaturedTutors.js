import Link from 'next/link';

// Express Backend থেকে ৬টি টিউটরের ডাটা আনার ফাংশন
async function getFeaturedTutors() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/tutors?limit=6`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch featured tutors');
    }

    const data = await res.json();
    // নিশ্চিত হওয়া যেন সর্বোচ্চ ৬টি দেখায়
    return Array.isArray(data) ? data.slice(0, 6) : [];
  } catch (error) {
    console.error("Error fetching featured tutors:", error);
    return [];
  }
}

export default async function FeaturedTutors() {
  const tutors = await getFeaturedTutors();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          Featured Tutors
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore our top-rated medical and academic tutors ready to guide you in your next learning session.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          No tutors available right now. Make sure your Express server is running!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div 
              key={tutor._id} 
              className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <img 
                  src={tutor.image || 'https://via.placeholder.com/300'} 
                  alt={tutor.name} 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{tutor.name}</h3>
                  <span className="badge badge-indigo bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-semibold border-none">
                    ⭐ {tutor.rating || '4.9'}
                  </span>
                </div>
                
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                  Subject: {tutor.subject}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Institution: {tutor.institution || tutor.qualifications || 'N/A'}
                </p>
                <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  Fee: {tutor.hourlyRate || tutor.price || 'N/A'} BDT/hr
                </p>
              </div>

              {/* Book Session / Redirect to Tutor Details Page */}
              <Link 
                href={`/tutors/${tutor._id}`}
                className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition-colors cursor-pointer"
              >
                Book Session / View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* View All Tutors Button */}
      <div className="text-center mt-10">
        <Link 
          href="/tutors" 
          className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 rounded-xl"
        >
          See All Tutors
        </Link>
      </div>
    </section>
  );
}