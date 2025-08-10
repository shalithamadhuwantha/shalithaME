'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextSkeleton from './settings/LoadingSklt';

interface ThoughtItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: 'main' | 'project' | 'thought' | 'event';
  visibility: boolean;
}

export default function Thoughts() {
  const [thoughts, setThoughts] = useState<ThoughtItem[]>([]);
  const [filteredThoughts, setFilteredThoughts] = useState<ThoughtItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(12);

  useEffect(() => {
    fetchThoughts();
  }, []);

  useEffect(() => {
    filterAndSearch();
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [thoughts, activeFilter, searchQuery]);

  const fetchThoughts = async () => {
    try {
      const response = await axios.get('/api/frontend/thoughts', {
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY
        }
      });

      const data = response.data;
      if (data && data.data && Array.isArray(data.data)) {
        setThoughts(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
      setThoughts([]);
      setLoading(false);
    }
  };

  const filterAndSearch = () => {
    let filtered = thoughts;

    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(thought => thought.type === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(thought =>
        thought.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thought.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredThoughts(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'main': 'text-blue-400',
      'project': 'text-green-400',
      'thought': 'text-purple-400',
      'event': 'text-red-400'
    };
    return colors[type as keyof typeof colors] || 'text-custom-text2';
  };

  const chunkArray = (array: ThoughtItem[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredThoughts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredThoughts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let prev = 0;
    for (let i of range) {
      if (prev + 1 !== i) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="w-full" id="thoughts">
      {/* Header */}
      <div className="flex flex-row mt-5 mb-2.5 px-2 sm:px-0">
        <div className="typeH text-custom-typeH text-xl sm:text-2xl font-playfair"></div>
        <span className="text-xl sm:text-2xl font-playfair text-custom-text">Thoughts & Projects</span>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 px-2 sm:px-0">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search thoughts and projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-[#181818] border border-custom-text2/20 rounded-lg text-custom-text font-space-mono text-sm focus:border-custom-heading focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'main', 'project', 'thought', 'event'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-space-mono capitalize transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-custom-heading text-black'
                  : 'bg-[#181818] text-custom-text2 hover:text-custom-heading hover:border-custom-heading'
              } border border-custom-text2/20`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count and Pagination Info */}
      <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
        <p className="text-custom-text2 font-space-mono text-sm">
          {loading ? 'Loading...' : `Found ${filteredThoughts.length} results`}
          {searchQuery && ` for "${searchQuery}"`}
          {activeFilter !== 'all' && ` in ${activeFilter}`}
        </p>
        
        {!loading && filteredThoughts.length > 0 && (
          <p className="text-custom-text2 font-space-mono text-sm">
            Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredThoughts.length)} of {filteredThoughts.length}
          </p>
        )}
      </div>

      {/* Content Area */}
      {loading ? (
        // Loading State - Centered
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col sm:flex-row gap-4 px-2 sm:px-0 justify-center">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div key={cardIndex} className="w-full sm:w-[30%] bg-[#181818] p-4 rounded-[15px]">
                  <TextSkeleton width="w-full" height="h-32" />
                  <div className="mt-4 space-y-2">
                    <TextSkeleton width="w-3/4" height="h-4" />
                    <TextSkeleton width="w-1/2" height="h-3" />
                    <TextSkeleton width="w-full" height="h-12" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : filteredThoughts.length === 0 ? (
        // No Results
        <div className="text-center py-12">
          <p className="text-custom-text2 font-space-mono text-lg">
            No {activeFilter !== 'all' ? activeFilter : 'thoughts'} found
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-custom-heading hover:text-custom-typeH font-space-mono text-sm underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Results Grid - CENTERED CARDS */}
          <div className="space-y-5">
            {chunkArray(currentPosts, 3).map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col sm:flex-row gap-4 px-2 sm:px-0 justify-center">
                {row.map((thought) => (
                  <div key={thought.id} className="w-full sm:w-[30%] bg-[#181818] p-4 flex flex-col rounded-[15px] hover:bg-[#1f1f1f] transition-colors duration-300">
                    {/* Image */}
                    <img 
                      src={thought.image || '/assets/img/default-project.png'} 
                      alt={thought.title}
                      className="rounded-[20px] w-full aspect-square object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/img/default-project.png';
                      }}
                    />
                    
                    {/* Type Badge */}
                    <div className="mt-3 mb-2">
                      <span className={`text-xs font-space-mono px-2 py-1 rounded ${getTypeColor(thought.type)} bg-custom-text2/10`}>
                        {thought.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="font-space-mono text-custom-text text-lg p-0 m-0 mb-2">
                      {thought.title}
                    </h5>

                    {/* Date */}
                    <small className="font-space-mono text-custom-text2 text-sm p-0 m-0 mb-2.5">
                      {formatDate(thought.date)}
                    </small>

                    {/* Description */}
                    <p className="font-space-mono text-custom-text2 text-sm p-0 m-0 mb-4 flex-grow line-clamp-4">
                      {thought.description}
                    </p>

                    {/* Read More Link */}
                    <a 
                      href={thought.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-space-mono text-custom-heading hover:text-custom-typeH text-sm p-0 m-0 transition-colors duration-300"
                    >
                      Read More..
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-4 px-2 sm:px-0">
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg font-space-mono text-sm transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-[#181818] text-custom-text2/50 cursor-not-allowed'
                      : 'bg-[#181818] text-custom-text2 hover:text-custom-heading hover:border-custom-heading'
                  } border border-custom-text2/20`}
                >
                  ← Prev
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {getPaginationNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`dots-${index}`} className="px-3 py-2 text-custom-text2 font-space-mono text-sm">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page as number)}
                        className={`px-3 py-2 rounded-lg font-space-mono text-sm transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-custom-heading text-black'
                            : 'bg-[#181818] text-custom-text2 hover:text-custom-heading hover:border-custom-heading'
                        } border border-custom-text2/20`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg font-space-mono text-sm transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-[#181818] text-custom-text2/50 cursor-not-allowed'
                      : 'bg-[#181818] text-custom-text2 hover:text-custom-heading hover:border-custom-heading'
                  } border border-custom-text2/20`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
