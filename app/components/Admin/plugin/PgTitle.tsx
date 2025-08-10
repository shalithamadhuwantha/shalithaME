import React from "react";

interface ProfileEditorHeaderProps {
  emoji: string;
  title: string;
  description: string;
}

export default function ProfileEditorHeader({
  emoji,
  title,
  description,
}: ProfileEditorHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-black to-gray-900 border-b border-yellow-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
            <span className="text-yellow-500 text-2xl">{emoji}</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500">
              {title}
            </h1>
            <p className="text-yellow-500/70 text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
