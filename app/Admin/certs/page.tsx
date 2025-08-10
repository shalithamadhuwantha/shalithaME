"use client";

import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Award, Eye, EyeOff, Edit } from "lucide-react";
import ProfileEditorHeader from "@/components/Admin/plugin/PgTitle";
import ProtectedPage from "@/components/Admin/plugin/PageProtector";

const fetcher = (url: string) => fetch(url).then(res => res.json());

type CertType = {
  id: number;
  certname: string;
  company: string;
  issuedate: string;
  veryfyid: string;
  img: string;
  tag: string;
  visibility: boolean;
};

export default function CertDisplay() {
  // --- SWR for certs data ---
  const { data, error, isLoading, mutate } = useSWR("/api/backend/cert", fetcher);

  // --- Cert UI State ---
  const [localCerts, setLocalCerts] = useState<CertType[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // --- Cert form state ---
  const [form, setForm] = useState<Omit<CertType, "id">>({
    certname: "",
    company: "",
    issuedate: "",
    veryfyid: "",
    img: "",
    tag: "",
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
    fetch("/api/backend/imglist/public/assets/img/certlogo")
      .then(res => res.json())
      .then(res => setImgOptions(res.images ?? []));
  }, []);

  // --- Initial data load for certs ---
  useEffect(() => {
    if (data?.success && data.certs && localCerts.length === 0) {
      setLocalCerts(data.certs);
    }
  }, [data, localCerts.length]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-yellow-500 font-mono text-lg">Loading your certificates...</p>
        </div>
      </div>
    );
  if (error || !data?.success)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-mono text-lg">❌ Failed to load certificates</p>
        </div>
      </div>
    );

  // --- Cert CRUD Handlers ---
  function resetForm() {
    setForm({
      certname: "",
      company: "",
      issuedate: "",
      veryfyid: "",
      img: "",
      tag: "",
      visibility: true,
    });
    setEditIndex(null);
    setFileToUpload(null);
    setNewImageName("");
  }

function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  const { name, value, type } = e.target;
  const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;

  setForm(f => ({
    ...f,
    [name]: type === "checkbox" ? checked : value,
  }));
}


  function handleAddOrEditCert(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.certname.trim() ||
      !form.company.trim() ||
      !form.issuedate.trim() ||
      !form.veryfyid.trim() ||
      !form.img.trim() ||
      !form.tag.trim()
    ) {
      alert("Please fill in all certificate fields.");
      return;
    }
    if (editIndex !== null) {
      const copy = [...localCerts];
      copy[editIndex] = { ...copy[editIndex], ...form };
      setLocalCerts(copy);
    } else {
      setLocalCerts([
        ...localCerts,
        {
          ...form,
          id: -(localCerts.length + 1),
        } as CertType,
      ]);
    }
    resetForm();
  }

  function handleDeleteCert(idx: number) {
    if (!window.confirm("Delete this certificate?")) return;
    setLocalCerts(localCerts.filter((_, i) => i !== idx));
    if (editIndex === idx) resetForm();
  }

  function handleEditCert(idx: number) {
    const c = localCerts[idx];
    setEditIndex(idx);
    setForm({ ...c, issuedate: c.issuedate.substring(0, 10) });
  }

  function handleToggleVisibility(idx: number) {
    const copy = [...localCerts];
    copy[idx].visibility = !copy[idx].visibility;
    setLocalCerts(copy);
  }

  async function handleSaveToBackend() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/backend/cert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localCerts),
      });
      const result = await response.json();
      if (result.success) {
        alert("✅ Certificates saved successfully!");
        mutate();
      } else {
        alert("❌ Failed to save: " + (result.error || "Unknown error"));
      }
    } catch (e) {
      alert("❌ Error saving certificates. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  // --- Image Picker CRUD Handlers ---
  function handleImageSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "__upload_new__") {
      setFileToUpload(null);
      setNewImageName("");
      setForm(f => ({ ...f, img: "" }));
    } else {
      setForm(f => ({ ...f, img: e.target.value }));
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
    fd.append("savePath", "public/assets/img/certlogo");
    fd.append("urlPrefix", "/api/settings/img/out/assets/img/certlogo/");

    try {
      const res = await fetch("/api/settings/img/upload", { method: "POST", body: fd });
      const data = await res.json();
      setIsUploading(false);
      if (data.success) {
        setForm(f => ({ ...f, img: data.url }));
        fetch("/api/backend/imglist/public/assets/img/certlogo")
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

  // --- Render ---
  return (
    <ProtectedPage>
    <div className="min-h-screen bg-black text-yellow-500 font-mono">
      <ProfileEditorHeader
        emoji="📜"
        title="Certificates Manager"
        description="Add, edit or manage your professional certifications"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:gap-8">
          {/* Certificate List Section */}
          <div className="group">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                    My Certificates ({localCerts.length})
                  </h2>
                </div>
              </div>
              <div className="mb-6">
                {localCerts.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-yellow-500/30 mx-auto mb-4" />
                    <p className="text-yellow-500/50 text-lg">No certificates added yet</p>
                    <p className="text-yellow-500/30 text-sm mt-2">Add your first certificate below</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {localCerts.map((cert, idx) => (
                      <div
                        key={cert.id}
                        className="bg-black border border-yellow-500/30 rounded-lg p-4 transition-all duration-200 hover:border-yellow-500/50 hover:bg-gray-900/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between md:space-x-4 space-y-3 md:space-y-0">
                          <div className="flex items-center space-x-3 flex-1">
                            {cert.img && (
                              <img
                                src={cert.img}
                                alt={cert.certname}
                                className="w-16 h-16 object-contain bg-black border border-yellow-500/20 rounded-lg"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-yellow-500 text-lg">{cert.certname}</h3>
                              <div className="text-yellow-500/70 text-sm">{cert.company}</div>
                              <div className="text-yellow-500/50 text-xs">
                                {cert.issuedate ? new Date(cert.issuedate).toLocaleDateString() : ""}
                                · Tag: <span className="italic">{cert.tag}</span>
                                <br />
                                Verification: <span className="text-blue-400">{cert.veryfyid}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 self-end md:self-center">
                            <button
                              onClick={() => handleToggleVisibility(idx)}
                              className={`p-2 rounded-lg border transition ${
                                cert.visibility
                                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20"
                                  : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700"
                              }`}
                            >
                              {cert.visibility ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => handleEditCert(idx)}
                              className="p-2 rounded-lg border bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCert(idx)}
                              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 p-2 rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveToBackend}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-yellow-500/25"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save Certificates"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add/Edit Cert Section */}
          <div className="group">
            <form
              onSubmit={handleAddOrEditCert}
              className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm"
            >
              {/* Section Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                  <Plus className="h-5 w-5 text-yellow-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">
                  {editIndex !== null ? "Edit Certificate" : "Add New Certificate"}
                </h2>
              </div>
              {/* Fields */}
              <div className="grid gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Certificate Name</label>
                  <input
                    type="text"
                    name="certname"
                    value={form.certname}
                    onChange={handleInputChange}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500/60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Company/Issuer</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Amazon Web Services"
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Issue Date</label>
                  <input
                    type="date"
                    name="issuedate"
                    value={form.issuedate}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Verification ID</label>
                  <input
                    type="text"
                    name="veryfyid"
                    value={form.veryfyid}
                    onChange={handleInputChange}
                    placeholder="e.g., ABCD-EFGH-1234"
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                  />
                </div>
                {/* Image Picker */}
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Certificate Image</label>
                  <select
                    value={form.img || ""}
                    onChange={handleImageSelect}
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                  >
                    <option value="">-- Select image --</option>
                    {imgOptions.map(imgName => (
                      <option key={imgName} value={`/api/settings/img/out/assets/img/certlogo/${imgName}`}>
                        {imgName}
                      </option>
                    ))}
                    <option value="__upload_new__">Upload new...</option>
                  </select>
                  {form.img === "" && (
                    <div className="mt-2 flex gap-2 flex-col">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setFileToUpload(e.target.files?.[0] ?? null)}
                        className="text-yellow-500"
                      />
                      <input
                        type="text"
                        placeholder="Enter new image name, e.g. mycert.png"
                        value={newImageName}
                        onChange={e => setNewImageName(e.target.value)}
                        className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                      />
                      <button
                        type="button"
                        onClick={handleUploadImage}
                        disabled={isUploading}
                        className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg"
                      >
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </button>
                    </div>
                  )}
                  {form.img && form.img !== "__upload_new__" && (
                    <img
                      src={form.img}
                      alt="Selected certificate"
                      className="mt-2 w-32 h-20 object-contain border border-yellow-500/30 rounded bg-black"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Tag</label>
                  <input
                    type="text"
                    name="tag"
                    value={form.tag}
                    onChange={handleInputChange}
                    placeholder="e.g., Cloud, Database, Security..."
                    className="w-full bg-black border border-yellow-500/30 rounded-lg p-4 text-yellow-500 placeholder-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500/80 mb-2">Visible?</label>
                  <label className="inline-flex items-center ml-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="visibility"
                      checked={form.visibility}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-yellow-500"
                    />
                    <span className="ml-2">{form.visibility ? "Visible" : "Hidden"}</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  {editIndex !== null && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-700 text-yellow-300 px-6 py-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{editIndex !== null ? "Update Certificate" : "Add Certificate"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-yellow-500/50 text-sm">
            Certificates build trust in your expertise — add ones that are relevant and verifiable!
          </p>
        </div>
      </div>
    </div>
    
</ProtectedPage>
  );
}
