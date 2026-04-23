"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CropConfig {
  desktop?: string;
  mobile?: string;
}

interface VariantConfig {
  order?: number[];
  crops?: Record<string, CropConfig>;
}

type ImageOrderJson = Record<string, VariantConfig>;

interface DragState {
  draggedIndex: number | null;
  overIndex: number | null;
}

interface CropEditorState {
  xPercent: number;
  yPercent: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SHAPES = [
  { value: "квадратное", label: "Квадратное" },
  { value: "прямоугольное", label: "Прямоугольное" },
  { value: "узкое-S", label: "Узкое S" },
  { value: "узкое-M", label: "Узкое M" },
  { value: "узкое-L", label: "Узкое L" },
];

const FINISHES = [
  { value: "natural", label: "Натуральная" },
  { value: "oak-stain", label: "Дуб" },
  { value: "rosewood-stain", label: "Палисандр" },
];

const CROP_PRESETS = [
  { value: "center", label: "Center" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "top left", label: "Top Left" },
  { value: "top right", label: "Top Right" },
  { value: "bottom left", label: "Bottom Left" },
  { value: "bottom right", label: "Bottom Right" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildConfigKey(shape: string, finish: string): string {
  return `${shape}/${finish}`;
}

function buildBasePath(shape: string, finish: string): string {
  return `/images/cashpo/configs/${shape}/${finish}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function parseCropPosition(position?: string): CropEditorState {
  if (!position) {
    return { xPercent: 50, yPercent: 50 };
  }

  const presetMap: Record<string, CropEditorState> = {
    center: { xPercent: 50, yPercent: 50 },
    top: { xPercent: 50, yPercent: 0 },
    bottom: { xPercent: 50, yPercent: 100 },
    left: { xPercent: 0, yPercent: 50 },
    right: { xPercent: 100, yPercent: 50 },
    "top left": { xPercent: 0, yPercent: 0 },
    "top right": { xPercent: 100, yPercent: 0 },
    "bottom left": { xPercent: 0, yPercent: 100 },
    "bottom right": { xPercent: 100, yPercent: 100 },
  };

  const preset = presetMap[position];
  if (preset) {
    return preset;
  }

  const match = position.match(/^(\d+)%\s+(\d+)%$/);
  if (!match) {
    return { xPercent: 50, yPercent: 50 };
  }

  return {
    xPercent: clamp(Number.parseInt(match[1], 10), 0, 100),
    yPercent: clamp(Number.parseInt(match[2], 10), 0, 100),
  };
}

function formatCropPosition(state: CropEditorState): string {
  return `${Math.round(state.xPercent)}% ${Math.round(state.yPercent)}%`;
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function GalleryConfigAdmin() {
  const [config, setConfig] = useState<ImageOrderJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [shape, setShape] = useState("квадратное");
  const [finish, setFinish] = useState("natural");
  const [localOrder, setLocalOrder] = useState<number[]>([]);
  const [localCrops, setLocalCrops] = useState<Record<string, CropConfig>>({});
  const [availablePhotos, setAvailablePhotos] = useState<number[]>([]);
  const [dragState, setDragState] = useState<DragState>({
    draggedIndex: null,
    overIndex: null,
  });
  const [editingCrop, setEditingCrop] = useState<{
    photoNumber: number;
    mode: "desktop" | "mobile";
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [deletingPhoto, setDeletingPhoto] = useState<{ number: number; index: number } | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropModalImageRef = useRef<HTMLDivElement>(null);
  const [cropEditor, setCropEditor] = useState<CropEditorState>({
    xPercent: 50,
    yPercent: 50,
  });

  // Load config on mount
  useEffect(() => {
    fetch("/api/gallery-config")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load config:", err);
        setLoading(false);
      });
  }, []);

  // Countdown timer for delete confirmation
  useEffect(() => {
    if (!deletingPhoto) return;
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [deletingPhoto, countdown]);

  // Load available photos for current variant
  useEffect(() => {
    const basePath = buildBasePath(shape, finish);
    const numbers: number[] = [];

    // Try to detect available photos by checking medium thumbnails
    for (let i = 1; i <= 20; i++) {
      const img = new Image();
      img.src = `${basePath}/medium/${i}.webp`;
      img.onload = () => {
        if (!numbers.includes(i)) {
          numbers.push(i);
          numbers.sort((a, b) => a - b);
          setAvailablePhotos([...numbers]);
        }
      };
      img.onerror = () => {
        // If medium doesn't exist, try thumbnails
        const thumb = new Image();
        thumb.src = `${basePath}/thumbnails/${i}.webp`;
        thumb.onload = () => {
          if (!numbers.includes(i)) {
            numbers.push(i);
            numbers.sort((a, b) => a - b);
            setAvailablePhotos([...numbers]);
          }
        };
      };
    }
  }, [shape, finish]);

  // Load local state from config when variant changes
  useEffect(() => {
    if (!config) return;
    const key = buildConfigKey(shape, finish);
    const variantConfig = config[key] || {};

    const order = variantConfig.order || [...availablePhotos].sort((a, b) => a - b);
    const crops = variantConfig.crops || {};

    setLocalOrder(order.filter((n) => availablePhotos.includes(n)));
    setLocalCrops(crops);
  }, [shape, finish, config, availablePhotos]);

  const handleSave = useCallback(async () => {
    if (!config) return;
    setSaving(true);
    setSaveStatus("idle");

    const key = buildConfigKey(shape, finish);
    const newConfig = { ...config };
    newConfig[key] = {
      order: localOrder,
      crops: localCrops,
    };

    try {
      const res = await fetch("/api/gallery-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });

      if (!res.ok) throw new Error("Save failed");

      setConfig(newConfig);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }, [config, shape, finish, localOrder, localCrops]);

  const handleApplyToAllFinishes = useCallback(async () => {
    if (!config) return;
    setSaving(true);

    const newConfig = { ...config };
    for (const f of FINISHES) {
      const key = buildConfigKey(shape, f.value);
      newConfig[key] = {
        order: localOrder,
        crops: localCrops,
      };
    }

    try {
      const res = await fetch("/api/gallery-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });

      if (!res.ok) throw new Error("Save failed");

      setConfig(newConfig);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Apply error:", err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }, [config, shape, localOrder, localCrops]);

  const handleResetToDefaults = useCallback(() => {
    const defaultOrder = [...availablePhotos].sort((a, b) => a - b);
    setLocalOrder(defaultOrder);
    setLocalCrops({});
  }, [availablePhotos]);

  const handleDeletePhoto = useCallback(async () => {
    if (!deletingPhoto) return;
    setDeleteLoading(true);

    const shapeParam = shape.startsWith("узкое") ? "narrow" : shape === "квадратное" ? "square" : "rect";
    const sizeParam = shape.startsWith("узкое") ? shape.split("-")[1]?.toLowerCase() : null;
    const finishParam = finish.includes("-") ? finish.replace("-", "_") : finish;

    try {
      const res = await fetch("/api/gallery-config", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shape: shapeParam,
          size: sizeParam,
          finish: finishParam,
          photoNumber: deletingPhoto.number,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      // Remove from local order
      setLocalOrder((prev) => prev.filter((n) => n !== deletingPhoto.number));

      // Remove from crops
      setLocalCrops((prev) => {
        const newCrops = { ...prev };
        delete newCrops[String(deletingPhoto.number)];
        return newCrops;
      });

      setDeletingPhoto(null);
      setCountdown(3);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleteLoading(false);
    }
  }, [deletingPhoto, shape, finish]);

  // ─── Drag & Drop ─────────────────────────────────────────────────────────

  const handleDragStart = (index: number) => {
    setDragState({ draggedIndex: index, overIndex: null });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragState.draggedIndex === null || dragState.draggedIndex === index) return;
    setDragState((prev) => ({ ...prev, overIndex: index }));
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = dragState.draggedIndex;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragState({ draggedIndex: null, overIndex: null });
      return;
    }

    const newOrder = [...localOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    if (removed !== undefined) {
      newOrder.splice(dropIndex, 0, removed);
      setLocalOrder(newOrder);
    }
    setDragState({ draggedIndex: null, overIndex: null });
  };

  const handleDragEnd = () => {
    setDragState({ draggedIndex: null, overIndex: null });
  };

  // ─── Crop Editor ──────────────────────────────────────────────────────────

  const handleCropClick = (photoNumber: number, mode: "desktop" | "mobile") => {
    const currentPosition = localCrops[String(photoNumber)]?.[mode];
    setCropEditor(parseCropPosition(currentPosition));
    setEditingCrop({ photoNumber, mode });
  };

  const updateCropFromPointer = useCallback((clientX: number, clientY: number) => {
    if (!cropModalImageRef.current) return;

    const rect = cropModalImageRef.current.getBoundingClientRect();
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);
    setCropEditor({ xPercent: x, yPercent: y });
  }, []);

  const saveCropEditor = useCallback(() => {
    if (!editingCrop) return;

    const objectPosition = formatCropPosition(cropEditor);
    setLocalCrops((prev) => ({
      ...prev,
      [String(editingCrop.photoNumber)]: {
        ...prev[String(editingCrop.photoNumber)],
        [editingCrop.mode]: objectPosition,
      },
    }));
    setEditingCrop(null);
  }, [cropEditor, editingCrop]);

  const cropFrameStyle = useMemo(() => {
    if (!editingCrop) return null;

    const frameAspect = editingCrop.mode === "desktop" ? 5 / 4 : 9 / 16;
    const containerWidth = editingCrop.mode === "desktop" ? 600 : 320;
    const containerHeight = editingCrop.mode === "desktop" ? 480 : 568;
    const containerAspect = containerWidth / containerHeight;

    let frameWidth = 0;
    let frameHeight = 0;

    if (frameAspect > containerAspect) {
      frameWidth = containerWidth * 0.82;
      frameHeight = frameWidth / frameAspect;
    } else {
      frameHeight = containerHeight * 0.82;
      frameWidth = frameHeight * frameAspect;
    }

    return {
      width: frameWidth,
      height: frameHeight,
      left: `calc(${cropEditor.xPercent}% - ${frameWidth / 2}px)`,
      top: `calc(${cropEditor.yPercent}% - ${frameHeight / 2}px)`,
    };
  }, [cropEditor, editingCrop]);

  // ─── Upload ───────────────────────────────────────────────────────────────

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("shape", shape);
    formData.append("finish", finish);

    // Add size suffix for narrow variants
    if (shape.startsWith("узкое")) {
      const sizePart = shape.split("-")[1]; // S, M, L
      formData.append("size", sizePart.toLowerCase());
    }

    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/gallery-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadStatus(
        `Uploaded ${data.uploaded.length} files: ${data.uploaded
          .map((u: { savedAs: string }) => u.savedAs)
          .join(", ")}`
      );

      // Refresh available photos after upload
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setUploadStatus(`Error: ${String(err)}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading config...
      </div>
    );
  }

  const key = buildConfigKey(shape, finish);
  const basePath = buildBasePath(shape, finish);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Gallery Config Admin
      </h1>

      {/* Variant Selector */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
            Shape
          </label>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #ccc",
              minWidth: 160,
            }}
          >
            {SHAPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
            Finish
          </label>
          <select
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #ccc",
              minWidth: 160,
            }}
          >
            {FINISHES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => window.open("/configurator", "_blank")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            👁 Desktop
          </button>
          <button
            onClick={() => window.open("/configurator?view=mobile", "_blank", "width=400,height=800")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            📱 Mobile
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              background: saveStatus === "success" ? "#22c55e" : saveStatus === "error" ? "#ef4444" : "#3b82f6",
              color: "#fff",
              cursor: saving ? "wait" : "pointer",
              fontWeight: 500,
            }}
          >
            {saving ? "Saving..." : saveStatus === "success" ? "Saved!" : saveStatus === "error" ? "Error" : "Save"}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          border: "1px dashed #ccc",
          borderRadius: "0.5rem",
        }}
      >
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>
          Upload Originals to {key}
        </h3>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ fontSize: "0.875rem" }}
          />
          {uploadStatus && (
            <span style={{ fontSize: "0.875rem", color: uploading ? "#3b82f6" : "#22c55e" }}>
              {uploadStatus}
            </span>
          )}
        </div>
      </div>

      {/* Current Config Info */}
      <div style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#666" }}>
        Config key: <code>{key}</code> | Available photos: {availablePhotos.length} | Order: {localOrder.length}
      </div>

      {/* Photo Grid with Drag & Drop */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>
          Photo Order (drag to reorder)
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {localOrder.map((photoNum, index) => (
            <div
              key={photoNum}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              style={{
                width: 120,
                border:
                  dragState.draggedIndex === index
                    ? "2px solid #3b82f6"
                    : dragState.overIndex === index
                    ? "2px dashed #3b82f6"
                    : "1px solid #ddd",
                borderRadius: "0.375rem",
                overflow: "hidden",
                cursor: "grab",
                opacity: dragState.draggedIndex === index ? 0.5 : 1,
                transition: "border-color 0.15s, opacity 0.15s",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/medium/${photoNum}.webp`}
                  alt={`Photo ${photoNum}`}
                  style={{
                    width: "100%",
                    height: 90,
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = "#eee";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    borderRadius: "0.25rem",
                  }}
                >
                  #{index + 1} (file {photoNum})
                </div>
              </div>
              <div style={{ padding: "0.375rem" }}>
                <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                  Crops:
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button
                    onClick={() => handleCropClick(photoNum, "desktop")}
                    style={{
                      flex: 1,
                      fontSize: "0.625rem",
                      padding: "2px 4px",
                      border: "1px solid #ddd",
                      borderRadius: "0.25rem",
                      background: localCrops[String(photoNum)]?.desktop
                        ? "#dbeafe"
                        : "#fff",
                      cursor: "pointer",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={`Desktop: ${localCrops[String(photoNum)]?.desktop || "not set"}`}
                  >
                    D: {localCrops[String(photoNum)]?.desktop?.split(" ")[0] || "—"}
                  </button>
                  <button
                    onClick={() => handleCropClick(photoNum, "mobile")}
                    style={{
                      flex: 1,
                      fontSize: "0.625rem",
                      padding: "2px 4px",
                      border: "1px solid #ddd",
                      borderRadius: "0.25rem",
                      background: localCrops[String(photoNum)]?.mobile
                        ? "#fce7f3"
                        : "#fff",
                      cursor: "pointer",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={`Mobile: ${localCrops[String(photoNum)]?.mobile || "not set"}`}
                  >
                    M: {localCrops[String(photoNum)]?.mobile?.split(" ")[0] || "—"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setDeletingPhoto({ number: photoNum, index });
                    setCountdown(3);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "0.375rem",
                    fontSize: "0.75rem",
                    padding: "2px 4px",
                    border: "1px solid #fecaca",
                    borderRadius: "0.25rem",
                    background: "#fff",
                    color: "#ef4444",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Operations */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
        <button
          onClick={handleApplyToAllFinishes}
          disabled={saving}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: saving ? "wait" : "pointer",
            fontSize: "0.875rem",
          }}
        >
          Apply order to all finishes
        </button>
        <button
          onClick={handleResetToDefaults}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Reset to defaults
        </button>
      </div>

      {/* JSON Preview */}
      <details style={{ marginBottom: "2rem" }}>
        <summary style={{ cursor: "pointer", fontSize: "1rem", marginBottom: "0.5rem" }}>
          JSON Preview
        </summary>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            overflow: "auto",
            maxHeight: 400,
          }}
        >
          {JSON.stringify({ [key]: { order: localOrder, crops: localCrops } }, null, 2)}
        </pre>
      </details>

      {/* Crop Editor Modal */}
      {editingCrop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setEditingCrop(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0 }}>
                Set Crop for Photo {editingCrop.photoNumber} (
                {editingCrop.mode})
              </h3>
              <button
                onClick={() => setEditingCrop(null)}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem",
                }}
              >
                ✕
              </button>
            </div>

            {/* Quick presets */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Quick presets:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {CROP_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      const next = parseCropPosition(preset.value);
                      setCropEditor(next);
                      setLocalCrops((prev) => ({
                        ...prev,
                        [String(editingCrop.photoNumber)]: {
                          ...prev[String(editingCrop.photoNumber)],
                          [editingCrop.mode]: formatCropPosition(next),
                        },
                      }));
                      setEditingCrop(null);
                    }}
                    style={{
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "0.25rem",
                      background:
                        localCrops[String(editingCrop.photoNumber)]?.[
                          editingCrop.mode
                        ] === preset.value
                          ? "#3b82f6"
                          : "#fff",
                      color:
                        localCrops[String(editingCrop.photoNumber)]?.[
                          editingCrop.mode
                        ] === preset.value
                          ? "#fff"
                          : "#333",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Click-to-set area */}
            <div style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
              Drag the frame to choose what stays inside the viewport:
            </div>
            <div
              ref={cropModalImageRef}
              onPointerDown={(e) => {
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                updateCropFromPointer(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if ((e.buttons & 1) !== 1) return;
                updateCropFromPointer(e.clientX, e.clientY);
              }}
              onPointerUp={(e) => {
                if ((e.currentTarget as HTMLDivElement).hasPointerCapture(e.pointerId)) {
                  (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
                }
              }}
              style={{
                width: editingCrop.mode === "desktop" ? 600 : 280,
                height: editingCrop.mode === "desktop" ? 480 : 500,
                position: "relative",
                cursor: "grab",
                overflow: "hidden",
                border: "1px solid #ddd",
                borderRadius: "0.375rem",
                background: "#111",
                touchAction: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/medium/${editingCrop.photoNumber}.webp`}
                alt={`Photo ${editingCrop.photoNumber}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              {cropFrameStyle ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      ...cropFrameStyle,
                      border: "2px solid #fff",
                      borderRadius: "0.5rem",
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "1px solid rgba(255,255,255,0.35)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 14,
                        height: 14,
                        borderRadius: "999px",
                        background: "#fff",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 0 3px rgba(59,130,246,0.35)",
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#666" }}>
              Position: {formatCropPosition(cropEditor)}
            </div>

            {/* Clear crop button */}
            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
              <button
                onClick={saveCropEditor}
                style={{
                  padding: "0.375rem 0.75rem",
                  border: "none",
                  borderRadius: "0.25rem",
                  background: "#3b82f6",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                Apply crop
              </button>
              <button
                onClick={() => {
                  const newCrops = { ...localCrops };
                  const numKey = String(editingCrop.photoNumber);
                  if (newCrops[numKey]) {
                    delete newCrops[numKey][editingCrop.mode];
                    if (Object.keys(newCrops[numKey]).length === 0) {
                      delete newCrops[numKey];
                    }
                  }
                  setLocalCrops(newCrops);
                  setEditingCrop(null);
                }}
                style={{
                  padding: "0.375rem 0.75rem",
                  border: "1px solid #ef4444",
                  borderRadius: "0.25rem",
                  background: "#fff",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                Clear crop for this mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1002,
          }}
          onClick={() => {
            if (!deleteLoading) {
              setDeletingPhoto(null);
              setCountdown(3);
            }
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              width: 380,
              maxWidth: "90vw",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.125rem" }}>
              🗑 Delete Photo {deletingPhoto.number}?
            </h3>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "#666" }}>
              Position #{deletingPhoto.index + 1} in order. This will delete the original file
              and all generated sizes (thumbnails, medium, large).
            </p>
            <p style={{ margin: "0 0 1.25rem", fontSize: "0.875rem", color: "#999" }}>
              Remaining files will be renumbered automatically.
            </p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => {
                  setDeletingPhoto(null);
                  setCountdown(3);
                }}
                disabled={deleteLoading}
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: deleteLoading ? "wait" : "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePhoto}
                disabled={countdown > 0 || deleteLoading}
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: countdown <= 0 ? "#ef4444" : "#f3f4f6",
                  color: countdown <= 0 ? "#fff" : "#9ca3af",
                  cursor: countdown <= 0 && !deleteLoading ? "pointer" : "not-allowed",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {deleteLoading
                  ? "Deleting..."
                  : countdown > 0
                  ? `Delete in ${countdown}...`
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
