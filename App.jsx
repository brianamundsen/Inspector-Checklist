import { useState } from "react";

const checklistData = [
  {
    id: "pre-site",
    category: "Pre-Site Preparation",
    icon: "📋",
    color: "#F97316",
    items: [
      { id: "ps1", text: "Review project plans, design drawings, and specifications" },
      { id: "ps2", text: "Confirm all permits and approvals are in place" },
      { id: "ps3", text: "Verify PPE is available (hard hat, safety vest, gloves, boots)" },
      { id: "ps4", text: "Check inspection tools are calibrated and ready" },
      { id: "ps5", text: "Review previous inspection reports and open issues" },
      { id: "ps6", text: "Confirm crew schedule and supervisor contacts" },
    ],
  },
  {
    id: "site-safety",
    category: "Job Site Safety",
    icon: "⚠️",
    color: "#EF4444",
    items: [
      { id: "ss1", text: "Conduct site hazard assessment before entering" },
      { id: "ss2", text: "Verify all crew members wearing appropriate PPE" },
      { id: "ss3", text: "Check traffic control setup meets code requirements" },
      { id: "ss4", text: "Confirm underground utilities have been located and marked" },
      { id: "ss5", text: "Inspect trenching and excavation for shoring compliance" },
      { id: "ss6", text: "Verify equipment operation is within safety limits" },
      { id: "ss7", text: "Ensure emergency contacts and first aid are accessible" },
    ],
  },
  {
    id: "materials",
    category: "Materials Inspection",
    icon: "📦",
    color: "#3B82F6",
    items: [
      { id: "mi1", text: "Verify materials match approved specifications and BOMs" },
      { id: "mi2", text: "Inspect fiber optic cables for damage or defects" },
      { id: "mi3", text: "Check conduit and duct materials meet required ratings" },
      { id: "mi4", text: "Confirm splice enclosures and hardware are correct type" },
      { id: "mi5", text: "Verify cable reels are properly stored and labeled" },
      { id: "mi6", text: "Check equipment age and batch/lot numbers are documented" },
    ],
  },
  {
    id: "osp-construction",
    category: "OSP Construction Quality",
    icon: "🏗️",
    color: "#10B981",
    items: [
      { id: "osp1", text: "Inspect buried cable depth meets minimum cover standards" },
      { id: "osp2", text: "Verify aerial strand tension and sag specifications" },
      { id: "osp3", text: "Check lashing wire application and spacing compliance" },
      { id: "osp4", text: "Inspect conduit installation for proper grade and alignment" },
      { id: "osp5", text: "Confirm bore path and directional drilling meets specs" },
      { id: "osp6", text: "Verify hand hole / manhole installation and cover placement" },
      { id: "osp7", text: "Check bonding and grounding connections at all required points" },
      { id: "osp8", text: "Inspect pole attachment hardware and clearance distances" },
    ],
  },
  {
    id: "fiber-splicing",
    category: "Fiber & Splicing",
    icon: "🔌",
    color: "#8B5CF6",
    items: [
      { id: "fs1", text: "Confirm splice enclosure type matches environmental rating" },
      { id: "fs2", text: "Verify OTDR test results meet loss specifications" },
      { id: "fs3", text: "Check fusion splice quality — attenuation within tolerance" },
      { id: "fs4", text: "Inspect fiber identification and color-code documentation" },
      { id: "fs5", text: "Ensure excess fiber storage is properly coiled and protected" },
      { id: "fs6", text: "Verify enclosure sealing and weatherproofing is complete" },
    ],
  },
  {
    id: "quality-codes",
    category: "Quality Standards & Codes",
    icon: "✅",
    color: "#F59E0B",
    items: [
      { id: "qc1", text: "Confirm work complies with NESC, NEC, and local codes" },
      { id: "qc2", text: "Verify compliance with client/owner technical specifications" },
      { id: "qc3", text: "Check industry standards (TIA/EIA, IEEE) are met" },
      { id: "qc4", text: "Document any non-conformances with photos and descriptions" },
      { id: "qc5", text: "Confirm corrective actions for previously flagged issues" },
      { id: "qc6", text: "Verify as-built drawings reflect actual field conditions" },
    ],
  },
  {
    id: "reporting",
    category: "Reporting & Documentation",
    icon: "📝",
    color: "#06B6D4",
    items: [
      { id: "rp1", text: "Complete daily inspection report with all findings" },
      { id: "rp2", text: "Photograph all key installations and any deficiencies" },
      { id: "rp3", text: "Log materials used and quantities installed" },
      { id: "rp4", text: "Record crew production metrics for the day" },
      { id: "rp5", text: "Report any potential problems to project management promptly" },
      { id: "rp6", text: "Submit inspection report through approved tracking system" },
      { id: "rp7", text: "Communicate outstanding items to next shift or follow-up inspector" },
    ],
  },
];

export default function App() {
  const [checked, setChecked] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [notes, setNotes] = useState({});
  const [showNoteFor, setShowNoteFor] = useState(null);

  const allItems = checklistData.flatMap((c) => c.items);
  const totalItems = allItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const resetAll = () => { setChecked({}); setNotes({}); };

  const visibleCategories =
    activeCategory === "all"
      ? checklistData
      : checklistData.filter((c) => c.id === activeCategory);

  const getCategoryProgress = (category) => {
    const total = category.items.length;
    const done = category.items.filter((i) => checked[i.id]).length;
    return { done, total };
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E17",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#E2E8F0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0F1729 0%, #1A2440 100%)",
        borderBottom: "2px solid #F97316",
        padding: "28px 24px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                color: "#F97316",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 4,
              }}>
                DIRECT LINE COMMUNICATIONS
              </div>
              <h1 style={{
                fontSize: "clamp(18px, 4vw, 26px)",
                fontWeight: 900,
                margin: 0,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}>
                INSPECTOR FIELD CHECKLIST
              </h1>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
                OSP Telecommunications Construction
              </div>
            </div>
            <button
              onClick={resetAll}
              style={{
                background: "transparent",
                border: "1px solid #334155",
                color: "#94A3B8",
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 11,
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
            >
              RESET
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#94A3B8", letterSpacing: "0.1em" }}>PROGRESS</span>
              <span style={{ fontSize: 11, color: progress === 100 ? "#10B981" : "#F97316", fontWeight: 700 }}>
                {checkedCount}/{totalItems} — {progress}%
              </span>
            </div>
            <div style={{ height: 6, background: "#1E293B", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: progress === 100
                  ? "linear-gradient(90deg, #10B981, #34D399)"
                  : "linear-gradient(90deg, #F97316, #FB923C)",
                borderRadius: 3,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        background: "#0D1220",
        borderBottom: "1px solid #1E293B",
        padding: "12px 24px",
        overflowX: "auto",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 8, minWidth: "max-content" }}>
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              background: activeCategory === "all" ? "#F97316" : "transparent",
              border: `1px solid ${activeCategory === "all" ? "#F97316" : "#334155"}`,
              color: activeCategory === "all" ? "#000" : "#94A3B8",
              padding: "5px 12px",
              borderRadius: 3,
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: "inherit",
            }}
          >
            ALL
          </button>
          {checklistData.map((cat) => {
            const { done, total } = getCategoryProgress(cat);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: isActive ? cat.color : "transparent",
                  border: `1px solid ${isActive ? cat.color : "#334155"}`,
                  color: isActive ? "#000" : "#94A3B8",
                  padding: "5px 12px",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.icon} {done}/{total}
              </button>
            );
          })}
        </div>
      </div>

      {/* Checklist */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px 24px 60px" }}>
        {visibleCategories.map((category) => {
          const { done, total } = getCategoryProgress(category);
          const allDone = done === total;
          return (
            <div key={category.id} style={{ marginBottom: 28 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                paddingBottom: 10,
                borderBottom: `2px solid ${category.color}22`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    background: `${category.color}18`,
                    border: `1px solid ${category.color}44`,
                    borderRadius: 4,
                    fontSize: 16,
                  }}>{category.icon}</span>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: allDone ? "#10B981" : category.color,
                    textTransform: "uppercase",
                  }}>
                    {category.category}
                  </div>
                </div>
                <div style={{
                  fontSize: 11,
                  color: allDone ? "#10B981" : "#64748B",
                  fontWeight: 700,
                  background: allDone ? "#10B98118" : "#1E293B",
                  border: `1px solid ${allDone ? "#10B98133" : "#334155"}`,
                  padding: "3px 10px",
                  borderRadius: 3,
                }}>
                  {allDone ? "✓ COMPLETE" : `${done}/${total}`}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {category.items.map((item) => {
                  const isChecked = !!checked[item.id];
                  const hasNote = !!notes[item.id];
                  const showingNote = showNoteFor === item.id;
                  return (
                    <div key={item.id}>
                      <div
                        onClick={() => toggle(item.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "11px 14px",
                          background: isChecked ? "#0F2318" : "#0D1220",
                          border: `1px solid ${isChecked ? "#10B98133" : "#1E293B"}`,
                          borderRadius: showingNote ? "4px 4px 0 0" : 4,
                          cursor: "pointer",
                        }}
                      >
                        <div style={{
                          width: 20,
                          height: 20,
                          border: `2px solid ${isChecked ? "#10B981" : "#334155"}`,
                          borderRadius: 3,
                          background: isChecked ? "#10B981" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.15s",
                        }}>
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span style={{
                          fontSize: 13,
                          color: isChecked ? "#64748B" : "#CBD5E1",
                          textDecoration: isChecked ? "line-through" : "none",
                          flex: 1,
                          lineHeight: 1.4,
                        }}>
                          {item.text}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNoteFor(showingNote ? null : item.id);
                          }}
                          style={{
                            background: hasNote ? "#1E3A5F" : "transparent",
                            border: `1px solid ${hasNote ? "#3B82F6" : "#334155"}`,
                            color: hasNote ? "#60A5FA" : "#475569",
                            width: 26,
                            height: 26,
                            borderRadius: 3,
                            cursor: "pointer",
                            fontSize: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          ✎
                        </button>
                      </div>
                      {showingNote && (
                        <div style={{
                          background: "#0A1628",
                          border: "1px solid #3B82F644",
                          borderTop: "none",
                          borderRadius: "0 0 4px 4px",
                          padding: 10,
                        }}>
                          <textarea
                            autoFocus
                            value={notes[item.id] || ""}
                            onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder="Add inspection note..."
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              color: "#93C5FD",
                              fontSize: 12,
                              fontFamily: "inherit",
                              resize: "none",
                              outline: "none",
                              minHeight: 52,
                              lineHeight: 1.5,
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {progress === 100 && (
          <div style={{
            background: "linear-gradient(135deg, #064E3B, #065F46)",
            border: "2px solid #10B981",
            borderRadius: 8,
            padding: "20px 24px",
            textAlign: "center",
            marginTop: 16,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#34D399",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              Inspection Complete
            </div>
            <div style={{ fontSize: 11, color: "#6EE7B7", marginTop: 4 }}>
              All {totalItems} items verified — Ready for report submission
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
