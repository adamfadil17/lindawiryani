"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
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
  placeholder,
}: TipTapEditorProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        horizontalRule: false,
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Typography,
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-primary/30 before:pointer-events-none before:absolute before:top-5 before:left-5",
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
          "tiptap-content prose prose-sm max-w-none min-h-[420px] px-5 py-5 focus:outline-none",
      },
    },
  });

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
      editor.chain().focus().setLink({ href: url }).run();
    },
    [editor],
  );

  const removeLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
  }, [editor]);

  const applyImage = useCallback(
    (url: string, alt: string) => {
      setShowImageModal(false);
      editor?.chain().focus().setImage({ src: url, alt }).run();
    },
    [editor],
  );

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const e = ctx.editor;
      if (!e) return null;
      return {
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
        isH1: e.isActive("heading", { level: 1 }),
        isH2: e.isActive("heading", { level: 2 }),
        isH3: e.isActive("heading", { level: 3 }),
        isBold: e.isActive("bold"),
        isItalic: e.isActive("italic"),
        isUnderline: e.isActive("underline"),
        isStrike: e.isActive("strike"),
        isHighlight: e.isActive("highlight"),
        isCode: e.isActive("code"),
        isAlignLeft: e.isActive({ textAlign: "left" }),
        isAlignCenter: e.isActive({ textAlign: "center" }),
        isAlignRight: e.isActive({ textAlign: "right" }),
        isAlignJustify: e.isActive({ textAlign: "justify" }),
        isBulletList: e.isActive("bulletList"),
        isOrderedList: e.isActive("orderedList"),
        isBlockquote: e.isActive("blockquote"),
        isCodeBlock: e.isActive("codeBlock"),
        isLink: e.isActive("link"),
        linkHref: e.getAttributes("link").href ?? "",
        charCount: e.storage.characterCount?.characters?.() ?? 0,
        wordCount: e.storage.characterCount?.words?.() ?? 0,
      };
    },
  });

  if (!editor) return null;

  const s = editorState ?? {
    canUndo: false,
    canRedo: false,
    isH1: false,
    isH2: false,
    isH3: false,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrike: false,
    isHighlight: false,
    isCode: false,
    isAlignLeft: false,
    isAlignCenter: false,
    isAlignRight: false,
    isAlignJustify: false,
    isBulletList: false,
    isOrderedList: false,
    isBlockquote: false,
    isCodeBlock: false,
    isLink: false,
    linkHref: "",
    charCount: 0,
    wordCount: 0,
  };

  const currentLinkUrl = s.linkHref;
  const charCount = s.charCount;
  const wordCountFromEditor = s.wordCount;

  return (
    <>
      <div
        className={`border ${
          error ? "border-red-400" : "border-primary/20"
        } bg-white`}
      >
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-primary/15 bg-primary/[0.02]">
          <ToolbarBtn
            title="Undo (Ctrl+Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!s.canUndo}
          >
            <Undo className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Redo (Ctrl+Y)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!s.canRedo}
          >
            <Redo className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          <ToolbarBtn
            title="Heading 1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={s.isH1}
          >
            <Heading1 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={s.isH2}
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={s.isH3}
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          <ToolbarBtn
            title="Bold (Ctrl+B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={s.isBold}
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Italic (Ctrl+I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={s.isItalic}
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Underline (Ctrl+U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={s.isUnderline}
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={s.isStrike}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={s.isHighlight}
          >
            <Highlighter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Inline Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={s.isCode}
          >
            <Code className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          <ToolbarBtn
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={s.isAlignLeft}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Align Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={s.isAlignCenter}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={s.isAlignRight}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={s.isAlignJustify}
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          <ToolbarBtn
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={s.isBulletList}
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={s.isOrderedList}
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={s.isBlockquote}
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={s.isCodeBlock}
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

          <ToolbarBtn
            title="Insert / Edit Link"
            onClick={openLinkModal}
            active={s.isLink}
          >
            <Link2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          {s.isLink && (
            <ToolbarBtn title="Remove Link" onClick={removeLink}>
              <Link2Off className="w-3.5 h-3.5" />
            </ToolbarBtn>
          )}

          <ToolbarBtn
            title="Insert Image"
            onClick={() => setShowImageModal(true)}
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          <ToolbarBtn
            title="Clear Formatting"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

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

        <div className="relative">
          <EditorContent editor={editor} />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-primary/20 bg-primary/[0.02]">
          <span className="text-xs tracking-widest uppercase text-primary/80">
            Linda Wiryani Weddings Planner
          </span>
          <span className="text-xs text-primary/80">
            {wordCountFromEditor.toLocaleString()} words ·{" "}
            {charCount.toLocaleString()} chars
          </span>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

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
