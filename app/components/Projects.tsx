'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextSkeleton from './settings/LoadingSklt';

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: 'main' | 'project' | 'thought';
  visibility: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch only 'project' type data with limit of 6
      const response = await axios.get('/api/frontend/thoughts?type=project&limit=6', {
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY
        }
      });

      const data = response.data;
      if (data && data.data && Array.isArray(data.data)) {
        // Take only first 6 items (additional safety check)
        setProjects(data.data.slice(0, 6));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const chunkArray = (array: ProjectItem[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="w-full" id="projects">
      <div className="flex flex-row mt-5 mb-2.5">
        <div className="typeH text-custom-typeH text-2xl font-playfair"></div>
        <span id="myprojectType" className="text-2xl font-playfair text-custom-text">Latest Projects</span>
      </div>

      {loading ? (
        // Loading State - show only 2 rows (6 cards max)
        <div className="space-y-5">
          {Array.from({ length: 2 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-row justify-between mt-5">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div key={cardIndex} className="w-[30%] h-auto bg-[#181818] p-4 flex flex-col rounded-[15px]">
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
      ) : projects.length === 0 ? (
        // No Projects State
        <div className="text-center py-12">
          <p className="text-custom-text2 font-space-mono text-lg">
            No projects found
          </p>
        </div>
      ) : (
        // Projects Grid - maximum 6 items (2 rows of 3)
        <div className="space-y-5">
          {chunkArray(projects, 3).map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row justify-between mt-5">
              {row.map((project) => (
                <div key={project.id} className="w-[30%] h-auto bg-[#181818] p-4 flex flex-col rounded-[15px]">
                  <img 
                      src={project.image || '/assets/img/project/default.png'} 
                      alt={project.title}
                      className="rounded-[20px] w-full aspect-square object-cover"
                      style={{ aspectRatio: '1 / 1' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/img/project/default.png';
                      }}
                  />
                  <h5 className="font-space-mono text-custom-text text-lg p-0 m-0 mt-3">
                    {project.title}
                  </h5>
                  <small className="font-space-mono text-custom-text2 text-sm p-0 m-0 mb-2.5">
                    {formatDate(project.date)}
                  </small>
                  <p className="font-space-mono text-custom-text2 text-sm p-0 m-0 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-space-mono text-custom-heading text-sm p-0 m-0 hover:text-custom-typeH transition-colors duration-300"
                  >
                    Read More..
                  </a>
                </div>
              ))}
              {/* Fill empty slots if row has less than 3 items */}
              {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                <div key={`empty-${emptyIndex}`} className="w-[30%]"></div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Optional: Link to view all projects */}
      {projects.length === 6 && (
        <div className="text-center mt-8">
          <a 
            href="/thoughts?type=project" 
            className="font-space-mono text-custom-heading hover:text-custom-typeH text-sm underline transition-colors duration-300"
          >
            View All Projects →
          </a>
        </div>
      )}
    </div>
  );
}
