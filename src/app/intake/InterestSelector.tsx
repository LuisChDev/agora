// app/components/InterestSelector.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSignedUrl } from "@/lib/hooks/useSignedUrl";
import type { Interest } from "@prisma/client";

const INTERESTS_PER_PAGE = 6;

const InterestCard = ({
  interest,
  handleSelectInterest,
}: {
  interest: Interest;
  handleSelectInterest: (i: Interest) => void;
}) => {
  const { url, error } = useSignedUrl(interest.id);
  console.log(error);
  return (
    <div
      key={interest.id}
      className="interest-box"
      style={{
        backgroundImage: `url(${url || "/default.png"})`,
        backgroundSize: "cover",
        padding: "20px",
        cursor: "pointer",
        borderRadius: "8px",
        height: "400px",
        color: "black"
      }}
      onClick={() => handleSelectInterest(interest)}
    >
      <h3>{interest.name}</h3>
    </div>
  );
};

const InterestSelector = () => {
  const [generalInterests, setGeneralInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(
    null,
  );
  const [childInterests, setChildInterests] = useState<Interest[]>([]);
  const [childPage, setChildPage] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    // Load general interests (those with parentId = null)
    const fetchGeneralInterests = async () => {
      const res = await fetch("/api/interests");
      const data = await res.json();
      setGeneralInterests(data);
    };
    fetchGeneralInterests();
  }, []);

  const handleSelectInterest = async (interest: Interest) => {
    setSelectedInterest(interest);
    setChildPage(0);
    const res = await fetch(`/api/interests?parentId=${interest.id}`);
    const data = await res.json();
    setChildInterests(data);
  };

  const handleRefresh = () => {
    // Advance to next page of children interests
    setChildPage((prev) => prev + 1);
  };

  // Slice child interests for pagination
  const displayedChildren = childInterests.slice(
    childPage * INTERESTS_PER_PAGE,
    (childPage + 1) * INTERESTS_PER_PAGE,
  );

  return (
    <div>
      <h2>Select Your Interests</h2>
      <div className="grid grid-cols-3 gap-4">
        {generalInterests.map((interest) => (
          <InterestCard {...{interest, handleSelectInterest}} />
        ))}
      </div>
      {selectedInterest && (
        <div>
          <h3>Selected: {selectedInterest.name}</h3>
          <div className="grid grid-cols-3 gap-4">
            {displayedChildren.map((child) => (
              <div
                key={child.id}
                className="interest-box"
                style={{
                  backgroundImage: `url(${
                    child.imageUrl || "/placeholder.jpg"
                  })`,
                  backgroundSize: "cover",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h4>{child.name}</h4>
              </div>
            ))}
          </div>
          {childInterests.length > (childPage + 1) * INTERESTS_PER_PAGE && (
            <button onClick={handleRefresh} style={{ marginTop: "20px" }}>
              Refresh
            </button>
          )}
          {childPage > 0 && (
            <div style={{ marginTop: "20px" }}>
              <label>
                Suggest an interest:
                <input
                  type="text"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Type your suggestion"
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterestSelector;
