**FormsPage** — `C:\local\SOFTWARE_DEV\current\zoomout\zoomout_v1\src\pages\FormsPage.js`

---

## **2. Primary Role**

Allows the user to manually add new entries to **any Zoomout sheet** using structured, schema-accurate forms — handling strings, long text, tags, dropdowns, booleans, date ranges, and linked fields (single + multi).

---

## **3. Sheets Used**

- **Structures**
- **Contradictions**
- **Struggles**
- **Events**
- **Issues**
- **Entities**
- **Theory Object**
- **Theory Instance**
- **Relationships**
- **Timeline Registry**
- **Timeline Grid**

---

## **4. Data Relationships**

- Each sheet form should supvaport:
    - **Linked Fields** (dropdown or typeahead from other sheets)
    - **Dropdowns** (populated from static enums, e.g., `form`, `scale`, `event_motion`, etc.)
    - **Tag Lists** (free-form or pre-defined)
    - **Date Ranges + Booleans**
- Form submission should:
    - Persist to DB (e.g., Supabase)
    - Trigger frontend cache refresh
    - Enable smooth linking across nodes from the moment of entry

---

## **5. Layout**

- **Sidebar or top tabs**: Select sheet to create new entry
- **Main area**:
    - Grouped form fields by type (metadata, descriptions, linked items)
    - Sticky Submit button
    - Optional preview of linked item summaries

---

## **6. Component Breakdown**

- `<SheetSelector />`: Dropdown or tab UI to choose sheet
- `<DynamicForm />`: Renders schema-driven form based on selected sheet
- `<FormField />`: Atomic field types
    - `TextField`, `TextArea`, `MarkdownField`, `TagSelector`, `Dropdown`, `DateRangePicker`, `RelationSelector`
- `<SubmitButton />`: Form validator + submission trigger
- `<StatusToast />`: Success / Error / Loading feedback

---

## **7. Component Behavior**

- `SheetSelector` sets selected sheet in local state
- `DynamicForm`:
    - Pulls schema (can be hardcoded v1, dynamic v2)
    - Renders each field by type
    - Linked fields use typeahead search + prefetch caching
- `SubmitButton`:
    - Validates required fields
    - Disables during submission
    - Triggers toast + clears form on success

---

## **8. Interaction Flows**

1. User selects sheet (e.g. “Contradictions”)
2. DynamicForm renders all fields
3. User fills out input fields and selects related entries via dropdowns
4. Submits → backend save → toast → form resets (or remains populated, per user config)
5. Entry appears on linked view pages automatically

---

## **9. Key UI Behavior**

- Live validation (required, format, max-lengths)
- Debounced search in relation fields
- Markdown preview toggle for long text
- Relation fields should display human-readable names (not IDs)
- State preserved on accidental navigation if possible (bonus)

---

## **10. Visual Design Guidelines**

- Use Tailwind:
    - Clean spacing: `p-6`, `gap-4`, `rounded-2xl`, `shadow-md`
    - Text hierarchy: `text-lg`, `text-sm text-muted`
    - Colored tags, clear field borders
- Sticky bottom submit button on mobile
- Toasts: minimal and non-intrusive

---

## **11. Empty States**

- Sheet not selected → “Select a sheet to begin”
- Form not rendered → Loading spinner
- No existing linked items → Show “+ Add new” option (future enhancement)

---

## **12. Performance Considerations**

- Debounced fetch for linked fields
- Prefetch schema on sheet hover (bonus)
- Validate locally before submit
- Handle slow connections with loading indicators

---

## **13. Versioning & Iteration Plans**

- **v1**: Static schemas in code
- **v2**: Centralized schema file or backend schema API
- **v3**: Reusable field library (`<FieldRenderer />`)
- **v4**: Bulk upload, AI-assisted input, duplicate from existing

---

## **14. Test Criteria**

- ✅ Each form renders all relevant fields
- ✅ Relation fields load and link properly
- ✅ Required validation works
- ✅ Submission returns success toast and saves data
- ✅ Fields clear (or persist) after submit as expected
- ✅ Edge cases: empty links, dropdown fallback, multiline markdown

---

## **15. Mobile-First Design Considerations**

- Tabs collapse into dropdown
- Fields stacked vertically
- Submit button pinned bottom
- Large touch targets
- Reduce form fatigue via field grouping

---

## **16. Integration Points**

- **Reads/Writes from Supabase or backend DB**
- **Dropdowns** and **linked fields** pull from existing entries
- Entries immediately usable by:
    - `StructuresPage`
    - `ContradictionsPage`
    - `TimelineView`, etc.
- Reuses components across all pages (centralized field types encouraged)

---

You’re now holding the **fully schema-aware, spec-complete FormsPage blueprint**.
