"use client";

import { useEffect, useState } from "react";
import { Edit3, Eye, EyeOff, Save, User } from "lucide-react";
import ProfileEditorHeader from "@/components/Admin/plugin/PgTitle";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";

const sectionNames = ["bio", "spotlight"] as const;
type SectionName = (typeof sectionNames)[number];

type ProfileData = {
  [key in SectionName]: {
    content: string;
    visibility: boolean;
  };
};

export default function ProfileEditor() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProfileData>({
    bio: { content: "", visibility: true },
    spotlight: { content: "", visibility: true },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/backend/profileEdit");
      const result = await res.json();

      if (result.success && Array.isArray(result.profiles)) {
        const map: Partial<ProfileData> = {};
        result.profiles.forEach((item: any) => {
          if (sectionNames.includes(item.name)) {
            const key = item.name as SectionName;
            map[key] = {
              content: item.content || "",
              visibility: item.visibility ?? true,
            };
          }
        });

        setData((prev) => ({ ...prev, ...map }));
      } else {
        // Using alert as fallback since react-hot-toast import was removed
        alert("❌ Invalid response from API");
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      alert("❌ Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: SectionName) => {
    try {
      const res = await fetch("/api/backend/profileEdit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: key,
          content: data[key].content,
          visibility: data[key].visibility,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(`✅ ${key.charAt(0).toUpperCase() + key.slice(1)} updated!`);
      } else {
        alert(`❌ ${result.error || "Update failed"}`);
      }
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      alert(`❌ Error updating ${key}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-yellow-500 font-mono text-lg">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-black text-yellow-500 font-mono">
        {/* Header */}
        <ProfileEditorHeader
          emoji="✒️"
          title="Profile Editor"
          description="Customize your profile sections"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 lg:gap-8">
            {sectionNames.map((key) => (
              <div key={key} className="group">
                <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/40 hover:bg-gray-900/70">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                        <User className="h-5 w-5 text-yellow-500" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold capitalize text-yellow-500">
                        {key}
                      </h2>
                    </div>

                    {/* Visibility Toggle */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setData({
                            ...data,
                            [key]: {
                              ...data[key],
                              visibility: !data[key].visibility,
                            },
                          })
                        }
                        className={`p-2 rounded-lg border transition-all duration-200 ${
                          data[key].visibility
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20"
                            : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {data[key].visibility ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <span
                        className={`text-sm font-medium ${
                          data[key].visibility
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        {data[key].visibility ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <div className="mb-6">
                    <textarea
                      className="w-full h-32 sm:h-40 bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50 resize-none focus:outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      placeholder={`Enter your ${key} content here...`}
                      value={data[key].content}
                      onChange={(e) =>
                        setData({
                          ...data,
                          [key]: { ...data[key], content: e.target.value },
                        })
                      }
                    />
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave(key)}
                      className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                    >
                      <Save className="h-4 w-4" />
                      <span>
                        Save {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-yellow-500/50 text-sm">
              Changes are saved automatically to your profile
            </p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
