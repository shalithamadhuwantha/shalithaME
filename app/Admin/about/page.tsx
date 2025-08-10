'use client';

import { useEffect, useState } from "react";
import { Eye, EyeOff, Save, User, Star } from "lucide-react";
import ProfileEditorHeader from "@/components/Admin/plugin/PgTitle";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";

const sectionNames = ["about", "highlights"] as const;
type SectionName = typeof sectionNames[number];

type AboutData = {
  [key in SectionName]: {
    data: any;
    visibility: boolean;
  };
};

interface HighlightItem {
  title: string;
  description: string;
  year?: string;
}

export default function AboutEditor() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AboutData>({
    about: { data: "", visibility: true },
    highlights: { data: [], visibility: true },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/frontend/specs", {
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_MY_API_KEY!
        }
      });
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        const map: Partial<AboutData> = {};
        
        result.data.forEach((item: any) => {
          if (item.controller === 'me') {
            map.about = {
              data: item.data || "",
              visibility: item.visibility ?? true,
            };
          } else if (item.controller === 'highlights' || item.controller === 'Highlights') {
            map.highlights = {
              data: Array.isArray(item.data) ? item.data : [],
              visibility: item.visibility ?? true,
            };
          }
        });
        
        setData((prev) => ({ ...prev, ...map }));
      } else {
        alert("❌ Invalid response from API");
      }
    } catch (error) {
      console.error("Failed to fetch about data:", error);
      alert("❌ Failed to fetch about data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async () => {
    try {
      const res = await fetch("/api/backend/aboutEdit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          controller: "me",
          data: data.about.data,
          visibility: data.about.visibility,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ About section updated!");
      } else {
        alert(`❌ ${result.error || "Update failed"}`);
      }
    } catch (error) {
      console.error("Error updating about:", error);
      alert("❌ Error updating about section");
    }
  };

  const handleSaveHighlights = async () => {
    try {
      const res = await fetch("/api/backend/aboutEdit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          controller: "highlights",
          data: data.highlights.data,
          visibility: data.highlights.visibility,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Highlights updated!");
      } else {
        alert(`❌ ${result.error || "Update failed"}`);
      }
    } catch (error) {
      console.error("Error updating highlights:", error);
      alert("❌ Error updating highlights");
    }
  };

  const addHighlight = () => {
    setData({
      ...data,
      highlights: {
        ...data.highlights,
        data: [...data.highlights.data, { title: "", description: "", year: "" }]
      }
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = data.highlights.data.filter((_: any, i: number) => i !== index);
    setData({
      ...data,
      highlights: {
        ...data.highlights,
        data: newHighlights
      }
    });
  };

  const updateHighlight = (index: number, field: keyof HighlightItem, value: string) => {
    const newHighlights = [...data.highlights.data];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setData({
      ...data,
      highlights: {
        ...data.highlights,
        data: newHighlights
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-yellow-500 font-mono text-lg">Loading about data...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-black text-yellow-500 font-mono">
        {/* Header */}
        <ProfileEditorHeader emoji="📝" title="About Editor" description="Manage your about section and highlights" />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 lg:gap-8">
            
            {/* About Section */}
            <div className="group">
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/40 hover:bg-gray-900/70">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                      <User className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                      About Content
                    </h2>
                  </div>
                  
                  {/* Visibility Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          about: { ...data.about, visibility: !data.about.visibility },
                        })
                      }
                      className={`p-2 rounded-lg border transition-all duration-200 ${
                        data.about.visibility
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20'
                          : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {data.about.visibility ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <span className={`text-sm font-medium ${
                      data.about.visibility ? 'text-yellow-500' : 'text-gray-400'
                    }`}>
                      {data.about.visibility ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>

                {/* Content Textarea */}
                <div className="mb-6">
                  <textarea
                    className="w-full h-40 sm:h-48 bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50 resize-none focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                    placeholder="Enter your about content here... (HTML supported)"
                    value={data.about.data}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: { ...data.about, data: e.target.value },
                      })
                    }
                  />
                  <p className="text-yellow-500/50 text-xs mt-2">HTML tags are supported for formatting</p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAbout}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save About</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="group">
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/40 hover:bg-gray-900/70">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                      Highlights & Recognition
                    </h2>
                  </div>
                  
                  {/* Visibility Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          highlights: { ...data.highlights, visibility: !data.highlights.visibility },
                        })
                      }
                      className={`p-2 rounded-lg border transition-all duration-200 ${
                        data.highlights.visibility
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20'
                          : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {data.highlights.visibility ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <span className={`text-sm font-medium ${
                      data.highlights.visibility ? 'text-yellow-500' : 'text-gray-400'
                    }`}>
                      {data.highlights.visibility ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-4 mb-6">
                  {data.highlights.data.map((highlight: HighlightItem, index: number) => (
                    <div key={index} className="bg-black/30 border border-yellow-500/20 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-yellow-500/70 text-sm mb-2">Title</label>
                          <input
                            type="text"
                            className="w-full bg-black border border-yellow-500/30 rounded px-3 py-2 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60"
                            placeholder="Achievement title"
                            value={highlight.title}
                            onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-yellow-500/70 text-sm mb-2">Year</label>
                          <input
                            type="text"
                            className="w-full bg-black border border-yellow-500/30 rounded px-3 py-2 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60"
                            placeholder="2024"
                            value={highlight.year || ''}
                            onChange={(e) => updateHighlight(index, 'year', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeHighlight(index)}
                            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded px-3 py-2 transition-all duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-yellow-500/70 text-sm mb-2">Description</label>
                        <textarea
                          className="w-full h-20 bg-black border border-yellow-500/30 rounded px-3 py-2 text-yellow-500 placeholder-yellow-500/50 resize-none focus:outline-none focus:border-yellow-500/60"
                          placeholder="Description of the achievement"
                          value={highlight.description}
                          onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Highlight Button */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={addHighlight}
                    className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <span>+ Add Highlight</span>
                  </button>

                  {/* Save Button */}
                  <button
                    onClick={handleSaveHighlights}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Highlights</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-yellow-500/50 text-sm">
              Changes are saved to your about section and highlights
            </p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
