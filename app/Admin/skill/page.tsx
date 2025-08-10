"use client";

import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Award, Eye, EyeOff } from "lucide-react";
import ProfileEditorHeader from "@/components/Admin/plugin/PgTitle";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SkillsDisplay() {
  const { data, error, isLoading, mutate } = useSWR("/api/backend/profileEdit", fetcher);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("");
  const [localSkills, setLocalSkills] = useState<{name: string; level: number}[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    if (data?.success && localSkills.length === 0) {
      const skillsProfile = data.profiles.find((profile: any) => profile.name === "skills");
      
      if (skillsProfile) {
        setVisibility(skillsProfile.visibility ?? true);
        const skillsArray = skillsProfile.content
          .split("\n")
          .flatMap(line => line.split(","))
          .map(entry => entry.trim())
          .filter(Boolean)
          .map(item => {
            const [namePart, levelPart] = item.split(">>").map(s => s.trim());
            const name = namePart;
            const match = levelPart?.match(/\((\d+)\)/);
            const level = match ? parseInt(match[1], 10) : 0;
            return { name, level };
          });
        setLocalSkills(skillsArray);
      }
    }
  }, [data, localSkills.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-yellow-500 font-mono text-lg">Loading your skills...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-mono text-lg">❌ Failed to load skills</p>
        </div>
      </div>
    );
  }

  const skillsProfile = data.profiles.find((profile: any) => profile.name === "skills");
  if (!skillsProfile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-yellow-500/50 font-mono text-lg">No skills data found</p>
        </div>
      </div>
    );
  }

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return alert("Enter skill name");
    const levelNum = parseInt(newSkillLevel);
    if (isNaN(levelNum) || levelNum < 0 || levelNum > 100) {
      return alert("Enter valid skill level (0-100)");
    }

    setLocalSkills([...localSkills, { name: newSkillName.trim(), level: levelNum }]);
    setNewSkillName("");
    setNewSkillLevel("");
  };

  const handleDeleteSkill = (indexToDelete: number) => {
    const updatedSkills = localSkills.filter((_, index) => index !== indexToDelete);
    setLocalSkills(updatedSkills);
  };

  const handleSaveSkills = async () => {
    setIsSaving(true);
    try {
      const skillsContent = localSkills
        .map(skill => `${skill.name} >> (${skill.level})`)
        .join("\n");

      const response = await fetch("/api/backend/profileEdit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "skills",
          content: skillsContent,
          visibility: visibility,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Skills saved successfully!");
        mutate();
      } else {
        alert("❌ Failed to save skills: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("❌ Error saving skills. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
    <ProtectedPage>
      
    <div className="min-h-screen bg-black text-yellow-500 font-mono">
      {/* Header */}
      <ProfileEditorHeader emoji="🎯" title="Skills Manager" description="Manage and showcase your professional skills" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:gap-8">
          
          {/* Skills List Section */}
          <div className="group">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/40 hover:bg-gray-900/70">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                    My Skills ({localSkills.length})
                  </h2>
                </div>
                
                {/* Visibility Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setVisibility(!visibility)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      visibility
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20'
                        : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {visibility ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <span className={`text-sm font-medium ${
                    visibility ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                    {visibility ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="mb-6">
                {localSkills.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-yellow-500/30 mx-auto mb-4" />
                    <p className="text-yellow-500/50 text-lg">No skills added yet</p>
                    <p className="text-yellow-500/30 text-sm mt-2">Add your first skill below</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:gap-4">
                    {localSkills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-black border border-yellow-500/30 rounded-lg p-4 transition-all duration-200 hover:border-yellow-500/50 hover:bg-gray-900/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <h3 className="font-semibold text-yellow-500 text-lg">{skill.name}</h3>
                            <div className="flex items-center space-x-3 mt-2">
                              <div className="flex-1 bg-gray-800 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-yellow-500/80 font-mono min-w-[3rem]">
                                {skill.level}/100
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteSkill(index)}
                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 p-2 rounded-lg transition-all duration-200 self-start sm:self-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSkills}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save Skills"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add New Skill Section */}
          <div className="group">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/40 hover:bg-gray-900/70">
              
              {/* Section Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                  <Plus className="h-5 w-5 text-yellow-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                  Add New Skill
                </h2>
              </div>

              {/* Form */}
              <div className="grid gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React, Python, Design..."
                    value={newSkillName}
                    onChange={e => setNewSkillName(e.target.value)}
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">
                    Skill Level (0-100)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter level from 0 to 100"
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(e.target.value)}
                    min={0}
                    max={100}
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleAddSkill}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-yellow-500/50 text-sm">
            Skills showcase your expertise and help others understand your capabilities
          </p>
        </div>
      </div>
    </div>
    </ProtectedPage>
    </>
  );
}
