"use client";

import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Code, Eye, EyeOff, Edit, ChevronDown, ChevronUp } from "lucide-react";
import ProfileEditorHeader from "@/components/Admin/plugin/PgTitle";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: 'main' | 'project' | 'thought' | 'event';
  visibility: boolean;
};

export default function ProjectManager() {
  // --- SWR for projects data ---
  const { data, error, isLoading, mutate } = useSWR("/api/backend/projects", fetcher);

  // --- Project UI State ---
  const [localProjects, setLocalProjects] = useState<ProjectType[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);

  // --- Project form state ---
  const [form, setForm] = useState<Omit<ProjectType, "id">>({
    title: "",
    description: "",
    image: "",
    link: "",
    date: "",
    type: "project",
    visibility: true,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // --- Image Picker State ---
  const [imgOptions, setImgOptions] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newImageName, setNewImageName] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // --- Load available images for dropdown ---
  useEffect(() => {
    fetch("/api/backend/imglist/public/assets/img/project")
      .then(res => res.json())
      .then(res => setImgOptions(res.images ?? []));
  }, []);

  // --- Initial data load for projects ---
  useEffect(() => {
    if (data?.success && data.data && localProjects.length === 0) {
      setLocalProjects(data.data);
    }
  }, [data, localProjects.length]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-yellow-500 font-mono text-lg">Loading your projects...</p>
        </div>
      </div>
    );

  if (error || !data?.success)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-mono text-lg">❌ Failed to load projects</p>
        </div>
      </div>
    );

  // --- Project CRUD Handlers ---
  function resetForm() {
    setForm({
      title: "",
      description: "",
      image: "",
      link: "",
      date: "",
      type: "project",
      visibility: true,
    });
    setEditIndex(null);
    setFileToUpload(null);
    setNewImageName("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target as any;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAddOrEditProject(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.image.trim() ||
      !form.link.trim() ||
      !form.date.trim()
    ) {
      alert("Please fill in all project fields.");
      return;
    }
    if (editIndex !== null) {
      const copy = [...localProjects];
      copy[editIndex] = { ...copy[editIndex], ...form };
      setLocalProjects(copy);
    } else {
      setLocalProjects([
        ...localProjects,
        {
          ...form,
          id: -(localProjects.length + 1),
        } as ProjectType,
      ]);
    }
    resetForm();
  }

  function handleDeleteProject(idx: number) {
    if (!window.confirm("Delete this project?")) return;
    setLocalProjects(localProjects.filter((_, i) => i !== idx));
    if (editIndex === idx) resetForm();
  }

  function handleEditProject(idx: number) {
    const p = localProjects[idx];
    setEditIndex(idx);
    setForm({ 
      ...p, 
      date: p.date.includes('T') ? p.date.substring(0, 10) : p.date 
    });
  }

  function handleToggleVisibility(idx: number) {
    const copy = [...localProjects];
    copy[idx].visibility = !copy[idx].visibility;
    setLocalProjects(copy);
  }

  async function handleSaveToBackend() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/backend/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localProjects),
      });
      const result = await response.json();
      if (result.success) {
        alert("✅ Projects saved successfully!");
        mutate();
      } else {
        alert("❌ Failed to save: " + (result.error || "Unknown error"));
      }
    } catch (e) {
      alert("❌ Error saving projects. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  // --- Image Picker CRUD Handlers ---
  function handleImageSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "__upload_new__") {
      setFileToUpload(null);
      setNewImageName("");
      setForm(f => ({ ...f, image: "" }));
    } else {
      setForm(f => ({ ...f, image: e.target.value }));
    }
  }

  async function handleUploadImage() {
    if (!fileToUpload || !newImageName) {
      alert("Pick file and name!");
      return;
    }
    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", fileToUpload);
    fd.append("name", newImageName);
    fd.append("savePath", "public/assets/img/project");
    fd.append("urlPrefix", "/api/settings/img/out/assets/img/project/");

    try {
      const res = await fetch("/api/settings/img/upload", { method: "POST", body: fd });
      const data = await res.json();
      setIsUploading(false);
      if (data.success) {
        setForm(f => ({ ...f, image: data.url }));
        fetch("/api/backend/imglist/public/assets/img/project")
          .then(res => res.json())
          .then(res => setImgOptions(res.images ?? []));
      } else {
        alert("Upload error: " + (data.error || "Unknown"));
      }
    } catch {
      setIsUploading(false);
      alert("Upload error, try again.");
    }
  }

  // Get projects to display (limit to 3 if showAllPosts is false)
  const displayedProjects = showAllPosts ? localProjects : localProjects.slice(0, 3);

  // --- Render ---
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-black text-yellow-500 font-mono">
        <ProfileEditorHeader
          emoji="🚀"
          title="Projects Manager"
          description="Add, edit or manage your projects and thoughts"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN - FORM */}
            <div className="space-y-6">
              {/* Add/Edit Project Form */}
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                    <Plus className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-yellow-500">
                    {editIndex !== null ? "Edit Project" : "Add New Project"}
                  </h2>
                </div>

                <form onSubmit={handleAddOrEditProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-500/80 mb-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Thush LK - University Guidance Platform"
                      className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-500/80 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Detailed description of your project..."
                      rows={3}
                      className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 placeholder-yellow-500/50 resize-none focus:outline-none focus:border-yellow-500/60 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-500/80 mb-2">Project Link</label>
                    <input
                      type="url"
                      name="link"
                      value={form.link}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername/project"
                      className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 placeholder-yellow-500/50 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-yellow-500/80 mb-2">Project Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-yellow-500/80 mb-2">Project Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 text-sm"
                      >
                        <option value="project">Project</option>
                        <option value="main">Main</option>
                        <option value="thought">Thought</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Picker */}
                  <div>
                    <label className="block text-sm font-medium text-yellow-500/80 mb-2">Project Image</label>
                    <select
                      value={form.image || ""}
                      onChange={handleImageSelect}
                      className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 text-sm"
                    >
                      <option value="">-- Select image --</option>
                      {imgOptions.map(imgName => (
                        <option key={imgName} value={`/api/settings/img/out/assets/img/project/${imgName}`}>
                          {imgName}
                        </option>
                      ))}
                      <option value="__upload_new__">Upload new...</option>
                    </select>
                    
                    {form.image === "" && (
                      <div className="mt-2 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setFileToUpload(e.target.files?.[0] ?? null)}
                          className="text-yellow-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Enter new image name, e.g. myproject.png"
                          value={newImageName}
                          onChange={e => setNewImageName(e.target.value)}
                          className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500 placeholder-yellow-500/50 text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleUploadImage}
                          disabled={isUploading}
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg text-sm"
                        >
                          {isUploading ? "Uploading..." : "Upload Image"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-500/80 mb-2">Visible?</label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="visibility"
                        checked={form.visibility}
                        onChange={handleInputChange}
                        className="form-checkbox h-4 w-4 text-yellow-500"
                      />
                      <span className="ml-2 text-sm">{form.visibility ? "Visible" : "Hidden"}</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    {editIndex !== null && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-700 text-yellow-300 px-4 py-2 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{editIndex !== null ? "Update" : "Add Project"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Save Button */}
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm">
                <button
                  onClick={handleSaveToBackend}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save All Projects"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN - PREVIEW */}
            <div className="space-y-6">
              {/* Real-time Preview */}
              {(form.title || form.description || form.image) && (
                <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                      <Eye className="h-5 w-5 text-green-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-green-500">Live Preview</h2>
                  </div>
                  
                  <div className="bg-black border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {form.image && (
                        <img
                          src={form.image}
                          alt={form.title || "Preview"}
                          className="w-16 h-16 object-cover bg-black border border-yellow-500/20 rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-yellow-500 text-lg">
                            {form.title || "Project Title"}
                          </h3>
                          {form.type && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              form.type === 'main' ? 'bg-blue-500/20 text-blue-400' :
                              form.type === 'project' ? 'bg-green-500/20 text-green-400' :
                              form.type === 'event' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {form.type.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="text-yellow-500/70 text-sm mb-2">
                          {form.description || "Project description will appear here..."}
                        </div>
                        <div className="text-yellow-500/50 text-xs">
                          {form.date ? new Date(form.date).toLocaleDateString() : "Date not set"}
                          <br />
                          Link: <span className="text-blue-400">{form.link || "No link provided"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing Projects */}
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                      <Code className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-yellow-500">
                      My Projects ({localProjects.length})
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {displayedProjects.length === 0 ? (
                    <div className="text-center py-8">
                      <Code className="h-8 w-8 text-yellow-500/30 mx-auto mb-2" />
                      <p className="text-yellow-500/50">No projects added yet</p>
                    </div>
                  ) : (
                    displayedProjects.map((project, idx) => (
                      <div
                        key={project.id}
                        className="bg-black border border-yellow-500/30 rounded-lg p-4 transition-all duration-200 hover:border-yellow-500/50"
                      >
                        <div className="flex items-start justify-between space-x-3">
                          <div className="flex items-start space-x-3 flex-1">
                            {project.image && (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-12 h-12 object-cover bg-black border border-yellow-500/20 rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-yellow-500 text-sm">{project.title}</h3>
                                <span className={`text-xs px-1 py-0.5 rounded ${
                                  project.type === 'main' ? 'bg-blue-500/20 text-blue-400' :
                                  project.type === 'project' ? 'bg-green-500/20 text-green-400' :
                                  project.type === 'event' ? 'bg-orange-500/20 text-orange-400' :
                                  'bg-purple-500/20 text-purple-400'
                                }`}>
                                  {project.type.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-yellow-500/70 text-xs mb-1">
                                {project.description.substring(0, 80)}...
                              </div>
                              <div className="text-yellow-500/50 text-xs">
                                {project.date ? new Date(project.date).toLocaleDateString() : ""}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleToggleVisibility(idx)}
                              className={`p-1 rounded border ${
                                project.visibility
                                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
                                  : "bg-gray-800 border-gray-600 text-gray-400"
                              }`}
                            >
                              {project.visibility ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            </button>
                            <button
                              onClick={() => handleEditProject(idx)}
                              className="p-1 rounded border bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(idx)}
                              className="bg-red-500/10 border border-red-500/30 text-red-400 p-1 rounded"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Show All Posts Button */}
                  {localProjects.length > 3 && (
                    <button
                      onClick={() => setShowAllPosts(!showAllPosts)}
                      className="w-full flex items-center justify-center space-x-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      {showAllPosts ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Hide Older Posts ({localProjects.length - 3})</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Show All Posts ({localProjects.length - 3} more)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-yellow-500/50 text-sm">
              Showcase your best work — projects tell your professional story!
            </p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
