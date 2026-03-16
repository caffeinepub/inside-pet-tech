# Inside Pet Tech

## Current State
The admin article editor (`ArticleEditor.tsx`) uses:
- A plain `<Textarea>` for article body (raw HTML)
- A URL text input for thumbnail image
- A single "Save" button that saves with the current status (draft by default)
- No distinct "Save as Draft" vs "Publish" actions

## Requested Changes (Diff)

### Add
- Rich text WYSIWYG editor for the article body (using Tiptap) with toolbar: Bold, Italic, Underline, Strikethrough, Headings (H1/H2/H3), Bullet list, Ordered list, Blockquote, Link insertion, Image insertion from URL, Horizontal rule, Undo/Redo
- Direct image upload for the article thumbnail using blob-storage (file picker → upload → URL stored in form)
- "Save as Draft" button (saves with status=draft) and "Publish" button (saves with status=published) replacing the single "Save" button
- Word count / character count display below the editor
- Auto-save indicator (shows "Unsaved changes" when form is dirty)

### Modify
- Replace the plain textarea body field with the Tiptap rich text editor
- Replace the thumbnail URL input with an upload button + preview (still accepts URL as fallback)
- Replace single Save button with "Save Draft" and "Publish" split-action buttons
- The body field stores HTML output from Tiptap (compatible with existing article.body field)

### Remove
- Plain `<Textarea>` for body
- Raw HTML placeholder text in body field

## Implementation Plan
1. Install Tiptap packages: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-character-count`
2. Create `src/frontend/src/components/editor/RichTextEditor.tsx` with Tiptap editor + toolbar
3. Update `ArticleEditor.tsx`:
   - Replace textarea body with `<RichTextEditor>`
   - Replace thumbnail URL input with upload button using blob-storage `useUploadBlob` hook + URL fallback input
   - Replace single Save button with "Save Draft" and "Publish" buttons, each calling handleSubmit with the appropriate status override
   - Show unsaved changes indicator
4. No backend changes needed (body field is already HTML text)
