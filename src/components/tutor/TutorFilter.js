'use client';

export default function TutorFilter({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-100 dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      {/* Search Input */}
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search by tutor name or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-1/4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full rounded-xl focus:outline-indigo-600"
        >
          <option value="">Default Order</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}