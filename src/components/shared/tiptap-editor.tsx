"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useCallback, useState } from "react";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Link2Off,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Undo,
  Redo,
  RemoveFormatting,
  CodeSquare,
} from "lucide-react";

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded transition-colors hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
        active
          ? "bg-primary text-white"
          : "text-primary/60 hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-primary/15 mx-0.5" />;
}

// ─── Link Modal ───────────────────────────────────────────────────────────────

function LinkModal({
  initialUrl,
  onConfirm,
  onCancel,
}: {
  initialUrl: string;
  onConfirm: (url: string) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState(initialUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-sm mx-4 p-6 shadow-2xl">
        <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-3">
          Insert Link
        </p>
        <input
          autoFocus
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onConfirm(url);
            if (e.key === "Escape") onCancel();
          }}
          placeholder="https://example.com"
          className="w-full px-3 py-2.5 text-sm text-primary border border-primary/20 focus:outline-none focus:border-primary/50 mb-4"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-primary/20 text-primary text-xs uppercase tracking-widest py-2.5 hover:cursor-pointer hover:bg-primary/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(url)}
            className="flex-1 bg-primary text-white text-xs uppercase tracking-widest py-2.5 hover:cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image URL Modal ──────────────────────────────────────────────────────────

function ImageModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: (url: string, alt: string) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white w-full max-w-sm mx-4 p-6 shadow-2xl">
        <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-3">
          Insert Image
        </p>
        <div className="space-y-3 mb-4">
          <input
            autoFocus
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Image URL (https://…)"
            className="w-full px-3 py-2.5 text-sm text-primary border border-primary/20 focus:outline-none focus:border-primary/50"
          />
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Alt text (optional)"
            className="w-full px-3 py-2.5 text-sm text-primary border border-primary/20 focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-primary/20 text-primary text-xs uppercase tracking-widest py-2.5 hover:cursor-pointer hover:bg-primary/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => url && onConfirm(url, alt)}
            disabled={!url}
            className="flex-1 bg-primary text-white text-xs uppercase tracking-widest py-2.5 hover:cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main TipTap Editor Component ────────────────────────────────────────────

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  error?: string;
  placeholder?: string;
}

export default function TipTapEditor({
  value,
  onChange,
  error,
  placeholder = "Write your article content here…",
}: TipTapEditorProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        horizontalRule: false, // use standalone extension below
        code: {
          HTMLAttributes: {
            class:
              "bg-primary/8 text-primary font-mono text-[0.875em] px-1.5 py-0.5 rounded",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-primary/8 text-primary font-mono text-sm p-4 rounded-sm overflow-x-auto",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-primary/30 pl-4 italic text-primary/70",
          },
        },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Typography,
      HorizontalRule.configure({
        HTMLAttributes: { class: "border-t border-primary/20 my-6" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-2 hover:opacity-70 transition-opacity",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-sm my-4 mx-auto block",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-primary/30 before:pointer-events-none before:absolute before:top-0 before:left-0",
      }),
      CharacterCount,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-5 py-5 text-sm text-primary leading-relaxed focus:outline-none prose-headings:font-semibold",
      },
    },
  });

  // ── Link helpers ──
  const openLinkModal = useCallback(() => {
    setShowLinkModal(true);
  }, []);

  const applyLink = useCallback(
    (url: string) => {
      setShowLinkModal(false);
      if (!editor) return;
      if (!url) {
        editor.chain().focus().unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run();
    },
    [editor],
  );

  const removeLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
  }, [editor]);

  // ── Image helpers ──
  const applyImage = useCallback(
    (url: string, alt: string) => {
      setShowImageModal(false);
      editor?.chain().focus().setImage({ src: url, alt }).run();
    },
    [editor],
  );

  if (!editor) return null;

  const currentLinkUrl = editor.getAttributes("link").href ?? "";
  const charCount = editor.storage.characterCount?.characters?.() ?? 0;
  const wordCountFromEditor = editor.storage.characterCount?.words?.() ?? 0;

  return (
    <>
      <div
        className={`border ${
          error ? "border-red-400" : "border-primary/20"
        } bg-white`}
      >
        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-primary/15 bg-primary/[0.02]">
          {/* History */}
          <ToolbarBtn
            title="Undo (Ctrl+Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Redo (Ctrl+Y)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Headings */}
          <ToolbarBtn
            title="Heading 1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Inline marks */}
          <ToolbarBtn
            title="Bold (Ctrl+B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Italic (Ctrl+I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Underline (Ctrl+U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
          >
            <Highlighter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Inline Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
          >
            <Code className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Alignment */}
          <ToolbarBtn
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Align Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Lists & blocks */}
          <ToolbarBtn
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            <CodeSquare className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Link */}
          <ToolbarBtn
            title="Insert / Edit Link"
            onClick={openLinkModal}
            active={editor.isActive("link")}
          >
            <Link2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          {editor.isActive("link") && (
            <ToolbarBtn title="Remove Link" onClick={removeLink}>
              <Link2Off className="w-3.5 h-3.5" />
            </ToolbarBtn>
          )}

          {/* Image */}
          <ToolbarBtn
            title="Insert Image"
            onClick={() => setShowImageModal(true)}
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Clear formatting */}
          <ToolbarBtn
            title="Clear Formatting"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

        {/* ── Bubble Menu (appears on text selection) ── */}
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, state }) => {
            const { selection } = state;
            const { empty } = selection;
            return !empty && editor.isEditable;
          }}
          className="flex items-center gap-0.5 bg-primary shadow-xl px-2 py-1.5"
        >
          {[
            {
              title: "Bold",
              icon: <Bold className="w-3 h-3" />,
              action: () => editor.chain().focus().toggleBold().run(),
              active: editor.isActive("bold"),
            },
            {
              title: "Italic",
              icon: <Italic className="w-3 h-3" />,
              action: () => editor.chain().focus().toggleItalic().run(),
              active: editor.isActive("italic"),
            },
            {
              title: "Underline",
              icon: <UnderlineIcon className="w-3 h-3" />,
              action: () => editor.chain().focus().toggleUnderline().run(),
              active: editor.isActive("underline"),
            },
            {
              title: "Link",
              icon: <Link2 className="w-3 h-3" />,
              action: openLinkModal,
              active: editor.isActive("link"),
            },
            {
              title: "Highlight",
              icon: <Highlighter className="w-3 h-3" />,
              action: () => editor.chain().focus().toggleHighlight().run(),
              active: editor.isActive("highlight"),
            },
          ].map((btn) => (
            <button
              key={btn.title}
              type="button"
              title={btn.title}
              onClick={btn.action}
              className={`p-1.5 transition-colors hover:cursor-pointer ${
                btn.active
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {btn.icon}
            </button>
          ))}
        </BubbleMenu>

        {/* ── Floating Menu (appears on empty line) ── */}
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from, empty } = state.selection;
            const isRootDepth = $from.depth === 1;
            const isEmptyTextBlock =
              $from.parent.isTextblock &&
              !$from.parent.type.spec.code &&
              !$from.parent.textContent;
            return empty && isRootDepth && isEmptyTextBlock;
          }}
          className="flex items-center gap-0.5 bg-white border border-primary/20 shadow-lg px-2 py-1.5"
        >
          {[
            {
              label: "H1",
              action: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            },
            {
              label: "H2",
              action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            },
            {
              label: "H3",
              action: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            },
            {
              label: "Quote",
              action: () => editor.chain().focus().toggleBlockquote().run(),
            },
            {
              label: "• List",
              action: () => editor.chain().focus().toggleBulletList().run(),
            },
            {
              label: "1. List",
              action: () => editor.chain().focus().toggleOrderedList().run(),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className="px-2 py-0.5 text-[10px] tracking-wider uppercase text-primary/60 hover:text-primary hover:cursor-pointer hover:bg-primary/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </FloatingMenu>

        {/* ── Editor area ── */}
        <div className="relative">
          <EditorContent editor={editor} />
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-primary/10 bg-primary/[0.02]">
          <span className="text-[10px] tracking-widest uppercase text-primary/30">
            Rich Text · TipTap
          </span>
          <span className="text-[10px] text-primary/40">
            {wordCountFromEditor.toLocaleString()} words ·{" "}
            {charCount.toLocaleString()} chars
          </span>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* ── Modals ── */}
      {showLinkModal && (
        <LinkModal
          initialUrl={currentLinkUrl}
          onConfirm={applyLink}
          onCancel={() => setShowLinkModal(false)}
        />
      )}
      {showImageModal && (
        <ImageModal
          onConfirm={applyImage}
          onCancel={() => setShowImageModal(false)}
        />
      )}
    </>
  );
}
