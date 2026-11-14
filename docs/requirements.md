# IndigenousCraft — Requirements v1 (Draft)

> SWE573 Cultural Crafts Portal · Requirements elicitation record · 14 November 2026
> Status: Working draft based on agreed decisions; features are not yet implemented.

## Purpose and scope

IndigenousCraft is a **product-centered cultural crafts information management system**. It focuses on documenting, exploring, and finding cultural craft products through structured information and photography. Start with a few options and expand later.

**Initial sample Product Types:** Kilim, Bowl, Bag, Necklace. These are examples, not an exhaustive taxonomy. Each Product has exactly **one** Product Type.

## Functional requirements

### Registration, access, and profiles

| ID | Requirement |
| --- | --- |
| FR-01 | Visitors can view published products and public profiles and use basic and advanced search without logging in. |
| FR-02 | Users can sign up with a unique username, unique email, and password; log in via email/password; and log out. |
| FR-03 | A user can request a time-limited, single-use password-reset link by email. |
| FR-04 | The public profile shows username, optional profile picture, optional bio, and published products. Missing pictures use a default avatar. |
| FR-05 | An account owner can edit their profile and manage products privately in **My Products**, with separate Drafts and Published tabs. |

### Product content and creation

| ID | Requirement |
| --- | --- |
| FR-06 | A registered user can create a Product via a **single-page form** with **Photos First**. |
| FR-07 | Each Product has exactly one Product Type, a user-written **Product Name**, selected Materials, Techniques, Production Process, one geographic origin, at least one Image, and one **Cultural Story**. |
| FR-08 | **Cultural Story is the only free-form long text box**. Product Name is a separate single-line text input. All other product characteristics are structured selections; location is chosen on a map; images are uploaded. There is no separate free-text Description field. |
| FR-09 | Materials, Techniques, and Production Process permit multiple selected options. Materials and Techniques display options relevant to the selected Product Type. Production Process is **not ordered**. |
| FR-10 | Type-specific attributes (e.g., Kilim → Pattern) have small predefined option lists. The last choice is **Other / Add New**, revealing a field for a missing option. This proposed value is saved on that Product only; it does not become available to others automatically. |
| FR-11 | Product location represents **cultural/geographical origin**. Exactly one location is selected via an interactive map or explicit place search. Initial approach: Leaflet + OpenStreetMap + Nominatim, subject to provider use policies. |
| FR-12 | Each Product contains **1–10 images**. Users choose files for upload, select a cover image, reorder images after upload, remove/replace images, and optionally attach a caption, source name, and source URL to each image. |
| FR-13 | A Product's nine initially discussed core concepts have been refined to **eight inputs**: Product Name, Product Type, Materials, Techniques, Production Process, Location, Images, Cultural Story. All eight are required for both Draft and Publish. **Description was removed** after deciding Cultural Story is the only long-form product text. |
| FR-14 | Users can **Save as Draft** or **Publish**. Both require complete fields; Publish occurs immediately without confirmation or admin approval. Drafts remain private and are retained indefinitely until the user deletes them. |
| FR-15 | Users can edit their own Draft or Published Products. Changes to published products become immediately public; no Published → Draft (unpublish) action. |
| FR-16 | Users can delete their own products after a confirmation dialog. Deletion is **soft delete**: the product remains in storage but disappears from public and active user views. Self-service restore is outside v1. |
| FR-17 | Product forms save **only on explicit Save as Draft / Publish**. Unsaved edits trigger a warning when leaving. There is no autosave and no special Draft preview page. |

### Browsing, search, and sharing

| ID | Requirement |
| --- | --- |
| FR-18 | Homepage shows a Pinterest-like **masonry** gallery of published Products with a randomized **Explore** order, clickable cards, and **infinite scroll**, without repeating items within a browsing session. |
| FR-19 | Normal search accepts arbitrary text and searches across product names and structured attributes (including Product Type, Materials, Techniques, Production Process, location, and type-specific values). |
| FR-20 | Advanced Search supports multiple selected criteria and displays products matching **all specified criteria**; blank criteria do not restrict results. Users are not shown AND/OR controls. |
| FR-21 | Search results default to **Most Relevant**, with a compact **Sort By** menu offering Newest First and Oldest First. |
| FR-22 | Product Detail has a large image with horizontal carousel controls/swiping, clickable thumbnails below, and a click-to-enlarge **lightbox**. Available captions/source details appear beneath the image in the detail view and lightbox. |
| FR-23 | **Related Crafts** shows up to **six** other published Products of the **same Product Type**, with View More if additional results exist; hide the section if no matches exist. |
| FR-24 | Registered users can privately bookmark published products, view **Saved Crafts**, and remove saved items. For a visitor, Save triggers an in-page login modal; after successful login the Save action completes. |
| FR-25 | Published Product Detail includes **Copy Link**. Draft and soft-deleted Product links are not public. |

### Explicitly deferred / out of scope

- **Admin approval of newly proposed attribute options:** later. If implemented, approval affects only the same attribute within the same Product Type (e.g., Kilim → Pattern), not every Product Type.
- **Report Product / moderation workflow:** later.
- **Compare Crafts:** conceptual direction recorded as up to **two** products of any types; detailed flow/implementation is deferred.
- **Comments:** intentionally **not supported**.
- No dedicated social sharing menu; Copy Link only.
- No extensive taxonomy enumeration in v1.

## Initial implementation defaults (proposed, not yet client-confirmed)

| Topic | Initial choice |
| --- | --- |
| Accepted image formats | JPG, PNG, WebP |
| Maximum image file size | 5 MB |
| Default cover photo | First uploaded, changeable |
| Product Name length | 100 characters max |
| Cultural Story length | 5,000 characters max |
| Bio length | 300 characters max |
| Username | 3–30 characters |
| Password | Minimum 8 characters (additional security checks during implementation) |
| Homepage loading batch | 20 products per batch |
| Search comparison | Case-insensitive |
| Form errors | Field-specific English error text |
| Post-save feedback | Brief success message |

These defaults may be revised after initial implementation/testing.

## User interface outline

- **Home**: search, Advanced Search, randomized masonry gallery, infinite scroll, account entry.
- **Add / Edit Product**: select-file images first; Product Name, Product Type, product-specific multi-selections and Other/Add New; map selection; one Cultural Story text area; Save as Draft/Publish.
- **Product Detail**: large gallery + thumbnails + lightbox; structured fields, cultural story, visible available source credits, related products, bookmark, copy link.
- **Public Profile**: username, optional picture/bio, published products.
- **My Products**: Draft and Published tabs.
- **Saved Crafts**: private bookmarks.
- **Authentication**: sign up, login modal where appropriate, password reset.

## Open design/implementation questions

- Storage provider and validation of uploaded image files.
- Specific initial selectable values for each Product Type and field.
- Detailed ordering and presentation of structured attributes.
- Whether and how to index Cultural Story text in standard search (arbitrary text search across structured fields is confirmed).
- Database choice and backend validation/security strategy.
- How to handle location precision for historical or broad cultural origins.

## Related work

- [Initial conceptual data model](data-model.md) — should be updated to reflect removal of Description and structured Production Process.
- GitHub Issue #6 — Functional Requirements
- GitHub Issue #9 — Initial Data Model
