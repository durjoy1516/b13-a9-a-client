async function getSingleTutor(id) {
  const res = await fetch(`http://localhost:5000/tutors/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tutor details');
  }
  return res.json();
}

export default async function TutorDetailsPage({ params }) {
  // Next.js-এ params থেকে id নেওয়ার জন্য await করতে হয়
  const { id } = await params;
  const tutor = await getSingleTutor(id);

  if (!tutor) {
    return <div className="text-center p-10 text-xl text-red-500">Tutor Not Found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 border rounded-2xl shadow-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={tutor.image} 
            alt={tutor.name} 
            className="w-full h-80 object-cover rounded-xl shadow-sm"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{tutor.name}</h1>
          <p className="text-lg font-medium text-emerald-600 mb-2">
            Subject: <span className="font-semibold">{tutor.subject}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Experience: <span className="font-semibold">{tutor.experience || 'N/A'}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Rating: <span className="font-semibold text-amber-500">⭐ {tutor.rating || 'N/A'}</span>
          </p>
          <p className="text-2xl font-bold text-indigo-600 my-4">
            Price: {tutor.price} BDT
          </p>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-1">Details:</h3>
            <p className="text-gray-600 leading-relaxed">{tutor.details}</p>
          </div>
          
          <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
            Book Session / Contact Tutor
          </button>
        </div>
      </div>
    </div>
  );
}