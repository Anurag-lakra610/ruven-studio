"use client";

import React, { useState, useEffect } from "react";
import { getDevotionals, getProducts, MockDevotional, MockProduct } from "@/lib/db";
import { Plus, Trash2, Eye, Save, Book, FileText, ShoppingBag, ArrowUp, ArrowDown, ChevronRight, Check } from "lucide-react";

interface EditorialBlock {
  id: string;
  type: "paragraph" | "heading" | "scripture" | "product";
  content: string;
  reference?: string; // for scripture
  productId?: string; // for product embed
}

export default function AdminContentStudioPage() {
  const [devotionals, setDevotionals] = useState<MockDevotional[]>([]);
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [selectedDevotional, setSelectedDevotional] = useState<MockDevotional | null>(null);

  // Editor form state
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("/hero_lifestyle.png");
  const [status, setStatus] = useState("Draft");
  const [blocks, setBlocks] = useState<EditorialBlock[]>([]);

  // Seeded scriptures database list
  const scripturesDB = [
    { ref: "Romans 13:12", text: "The night is far gone; the day is at hand. So then let us cast off the works of darkness and put on the armor of light." },
    { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect." }
  ];

  useEffect(() => {
    getDevotionals().then(res => {
      setDevotionals(res);
      if (res.length > 0) {
        handleLoadDevotional(res[0]);
      }
    });
    getProducts().then(res => setProducts(res));
  }, []);

  const handleLoadDevotional = (dev: MockDevotional) => {
    setSelectedDevotional(dev);
    setTitle(dev.title);
    setSummary(dev.summary);
    setCoverImage(dev.cover_image_url);
    setStatus(dev.published_at ? "Published" : "Draft");

    // Map body blocks
    const mapped = dev.body_json.map((b: any, idx: number) => ({
      id: `${idx}-${Date.now()}`,
      type: b.type,
      content: b.content,
      reference: b.reference,
      productId: b.productId
    }));
    setBlocks(mapped);
  };

  const handleAddBlock = (type: "paragraph" | "heading" | "scripture" | "product") => {
    const newBlock: EditorialBlock = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content:
        type === "heading"
          ? "New Section Header"
          : type === "scripture"
          ? scripturesDB[0].text
          : type === "product"
          ? "Shop the Armor Tee drop below"
          : "Write your devotional paragraph content here...",
      reference: type === "scripture" ? scripturesDB[0].ref : undefined,
      productId: type === "product" ? products[0]?.id : undefined
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleUpdateBlockContent = (id: string, text: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content: text } : b));
  };

  const handleUpdateBlockMeta = (id: string, key: string, value: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, [key]: value } : b));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleMoveBlock = (idx: number, dir: "up" | "down") => {
    const updated = [...blocks];
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    // Swap
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setBlocks(updated);
  };

  const handleSaveDevotional = () => {
    // Mock save back to devotionals list
    setDevotionals(prev =>
      prev.map(d =>
        d.id === selectedDevotional?.id
          ? {
              ...d,
              title,
              summary,
              cover_image_url: coverImage,
              body_json: blocks.map(b => ({
                type: b.type,
                content: b.content,
                reference: b.reference,
                productId: b.productId
              }))
            }
          : d
      )
    );
    alert("Devotional article draft saved in database successfully!");
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT SIDE: ARTICLES LIST */}
      <aside className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-border-warm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Devotional Articles</h3>
          <span className="text-[10px] font-bold text-brand-burgundy uppercase">{devotionals.length} Drafts</span>
        </div>

        <div className="space-y-3">
          {devotionals.map((dev) => {
            const isSelected = selectedDevotional?.id === dev.id;
            return (
              <button
                key={dev.id}
                onClick={() => handleLoadDevotional(dev)}
                className={`w-full p-4 rounded-lg border text-left space-y-2 transition-all ${
                  isSelected
                    ? "border-brand-burgundy bg-bg-card"
                    : "border-border-warm hover:border-text-primary bg-white dark:bg-zinc-950"
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wide text-text-primary line-clamp-1">
                  {dev.title}
                </h4>
                <p className="text-[10px] text-text-muted line-clamp-2 leading-relaxed">
                  {dev.summary}
                </p>
                <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-text-muted pt-2 border-t border-border-warm/50">
                  <span>Author: {dev.author}</span>
                  <span className="text-green-600">Published</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT SIDE: RICH BLOCK-EDITOR */}
      <section className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-border-warm rounded-xl p-6 md:p-8 space-y-8 shadow-sm text-left">
        {/* Editor Toolbar Header */}
        <div className="flex justify-between items-center pb-4 border-b border-border-warm">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold">Notion block-composer</span>
            <h3 className="text-sm font-bold uppercase text-text-primary tracking-wide">Weekly Journal Editor</h3>
          </div>
          <button
            onClick={handleSaveDevotional}
            className="px-5 py-2 bg-brand-burgundy hover:bg-brand-gold text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
        </div>

        {/* Article Metadata Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Devotional Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary font-bold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">Cover Image Path</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-text-primary block">SEO Summary (Meta description)</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy text-text-primary"
            />
          </div>
        </div>

        {/* Interactive Blocks list */}
        <div className="space-y-6 pt-6 border-t border-border-warm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted block">Article Blocks</span>

          <div className="space-y-4">
            {blocks.map((block, idx) => (
              <div
                key={block.id}
                className="group flex gap-3 p-4 bg-bg-warm dark:bg-zinc-950 border border-border-warm rounded-lg relative hover:border-text-primary transition-all"
              >
                {/* Block type badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveBlock(idx, "up")}
                    className="p-1 border border-border-warm hover:bg-white rounded transition-colors text-text-muted disabled:opacity-30"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    disabled={idx === blocks.length - 1}
                    onClick={() => handleMoveBlock(idx, "down")}
                    className="p-1 border border-border-warm hover:bg-white rounded transition-colors text-text-muted disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteBlock(block.id)}
                    className="p-1 border border-red-200 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-border-warm flex items-center justify-center text-brand-gold text-xs font-bold flex-shrink-0 mt-1">
                  {block.type === "paragraph" && <FileText className="w-4 h-4 text-brand-sage" />}
                  {block.type === "heading" && "H"}
                  {block.type === "scripture" && <Book className="w-4 h-4 text-brand-burgundy" />}
                  {block.type === "product" && <ShoppingBag className="w-4 h-4 text-text-primary" />}
                </div>

                <div className="flex-1 space-y-3">
                  {/* Block Title/Context */}
                  <span className="text-[8px] font-bold uppercase tracking-widest text-text-muted block">
                    {block.type === "paragraph" && "Paragraph Block"}
                    {block.type === "heading" && "Heading Block"}
                    {block.type === "scripture" && "Scripture Block Embed"}
                    {block.type === "product" && "Commerce Buy Card Embed"}
                  </span>

                  {/* Block Editor Content */}
                  {block.type === "scripture" ? (
                    <div className="space-y-3 text-xs">
                      <select
                        value={block.reference}
                        onChange={(e) => {
                          const script = scripturesDB.find(s => s.ref === e.target.value);
                          if (script) {
                            handleUpdateBlockMeta(block.id, "reference", script.ref);
                            handleUpdateBlockContent(block.id, script.text);
                          }
                        }}
                        className="border border-border-warm rounded p-1.5 bg-white text-text-primary font-bold focus:outline-none"
                      >
                        {scripturesDB.map(s => (
                          <option key={s.ref} value={s.ref}>{s.ref}</option>
                        ))}
                      </select>
                      <blockquote className="border-l-2 border-brand-burgundy pl-4 italic text-brand-burgundy bg-white dark:bg-zinc-900 p-3 rounded">
                        "{block.content}"
                      </blockquote>
                    </div>
                  ) : block.type === "product" ? (
                    <div className="space-y-3 text-xs">
                      <div className="flex gap-2">
                        <select
                          value={block.productId}
                          onChange={(e) => handleUpdateBlockMeta(block.id, "productId", e.target.value)}
                          className="border border-border-warm rounded p-1.5 bg-white text-text-primary font-bold focus:outline-none"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                        className="w-full border border-border-warm rounded p-2 focus:outline-none focus:border-brand-burgundy font-medium"
                      />
                    </div>
                  ) : (
                    <textarea
                      rows={block.type === "heading" ? 1 : 3}
                      value={block.content}
                      onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                      className={`w-full border border-border-warm bg-white dark:bg-zinc-900 rounded p-2 text-xs focus:outline-none focus:border-brand-burgundy text-text-primary ${
                        block.type === "heading" ? "font-bold uppercase tracking-wider" : "leading-relaxed"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Block Composer Toolbar Actions */}
          <div className="flex justify-center gap-3 pt-6 border-t border-border-warm flex-wrap">
            <button
              onClick={() => handleAddBlock("paragraph")}
              className="px-4 py-2 border border-border-warm hover:bg-bg-card rounded text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Paragraph</span>
            </button>
            <button
              onClick={() => handleAddBlock("heading")}
              className="px-4 py-2 border border-border-warm hover:bg-bg-card rounded text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Heading</span>
            </button>
            <button
              onClick={() => handleAddBlock("scripture")}
              className="px-4 py-2 border border-border-warm hover:bg-bg-card rounded text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Scripture Embed</span>
            </button>
            <button
              onClick={() => handleAddBlock("product")}
              className="px-4 py-2 border border-border-warm hover:bg-bg-card rounded text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Product Embed</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
