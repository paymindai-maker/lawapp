"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapImage from "@tiptap/extension-image"
import TiptapLink from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useRef } from "react"
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Link2, Image as ImageIcon, Undo2, Redo2, Quote,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Write your article…" }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploading = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({ inline: false, allowBase64: false }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose-editor",
      },
    },
  })

  // Sync external value changes (e.g. edit form load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleImageUpload(file: File) {
    if (uploading.current) return
    uploading.current = true
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const { url } = await res.json()
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    } finally {
      uploading.current = false
    }
  }

  function setLink() {
    const prev = editor?.getAttributes("link").href ?? ""
    const url = window.prompt("URL", prev)
    if (url === null) return
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  if (!editor) return null

  const btn = (active: boolean) =>
    [
      "inline-flex h-7 w-7 items-center justify-center rounded transition-colors",
      active
        ? "bg-[var(--fw-blue)] text-white"
        : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
    ].join(" ")

  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-3 py-2"
        style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}
      >
        <ToolbarGroup>
          <button type="button" title="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="h-3.5 w-3.5" />
          </button>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <button type="button" title="Heading 2" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Heading 3" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3 className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Blockquote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote className="h-3.5 w-3.5" />
          </button>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <button type="button" title="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Numbered list" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="h-3.5 w-3.5" />
          </button>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <button type="button" title="Link" className={btn(editor.isActive("link"))} onClick={setLink}>
            <Link2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Insert image"
            className={btn(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
              e.target.value = ""
            }}
          />
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <button type="button" title="Undo" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Redo" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 className="h-3.5 w-3.5" />
          </button>
        </ToolbarGroup>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="rte-content"
      />
    </div>
  )
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>
}

function Divider() {
  return <div className="mx-1.5 h-4 w-px" style={{ background: "var(--border)" }} />
}
