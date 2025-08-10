"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextSkeleton from "./settings/LoadingSklt";

interface HighlightItem {
  title: string;
  description: string;
  year?: string;
}

export default function Highlights() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [highlightsVisible, setHighlightsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axios.get("/api/frontend/specs", {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_MY_API_KEY,
          },
        });

        const rawdata = response.data;
        const data = rawdata["data"][1]["data"];
        const visibility = rawdata["data"][1]["visibility"];
        // parsedData = JSON.parse(highlightsData.data);
        // console.log(visibility);
        // console.log(data);
        // console.log(JSON.parse(rawdata["data"][1]["data"][0]));

        if (data && Array.isArray(data)) {
          setHighlights(data);
          setHighlightsVisible(visibility);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setHighlights([]);
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <>
      {/* Simple Header */}
      <div className="mt-8 mb-4 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-playfair text-custom-heading">
          Highlights & Recognition
        </h2>
      </div>

      {/* Basic Text List */}
      <div className="px-2 sm:px-0 font-ibm-plex text-custom-text2">
        {loading ? (
          <div className="space-y-2">
            <TextSkeleton width="w-full" height="h-4" />
            <TextSkeleton width="w-3/4" height="h-4" />
            <TextSkeleton width="w-full" height="h-4" />
          </div>
        ) : (
          highlightsVisible &&
          highlights.length > 0 && (
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="text-sm sm:text-base">
                  <span className="text-custom-heading font-medium">
                    {highlight.title}
                  </span>
                  {highlight.year && (
                    <span className="text-custom-text2/60 text-xs ml-2">
                      ({highlight.year})
                    </span>
                  )}
                  <br />
                  <span className="text-custom-text2">
                    {highlight.description}
                  </span>
                </div>
              ))}
            </div>
          )
        )}

        {!loading && (!highlightsVisible || highlights.length === 0) && (
          <p className="text-center text-custom-text2">-</p>
        )}
      </div>
    </>
  );
}
