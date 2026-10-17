# Academic Research Project Information Website
## Hyper-Local Aviation Weather Forecast Verification System for Sri Lankan Monsoon Patterns

**Project Code:** R26-IT-132  
**Institution:** Sri Lanka Institute of Information Technology (SLIIT) — Faculty of Computing / Centre of Excellence for AI (CoEAI)  
**Target Aerodrome:** Bandaranaike International Airport (VCBI / Katunayake)  
**Supervisors:** Shashika Lokuliyana & Hansika Mahaadikara  
**Collaborator:** Department of Meteorology, Sri Lanka  

---

## 1. Overview & Project Description
This website is an official **Academic Research Project Information Website** engineered in strict compliance with the university website viva guidelines (Website.pdf and Website Evaluation Guidelines). 

The website documents the entire lifecycle of the research project from the initial topic formulation to the final research viva defense. It clearly distinguishes the **Academic Research Information Website** from the **Operational Forecasting Machine Learning System**.

### Technology Stack
- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3 (`css/style.css`, `css/responsive.css`) with light/dark theme toggle
- **Interactions:** Vanilla JavaScript (`js/main.js`, `js/documents.js`, `js/milestones.js`, `js/contact.js`)
- **Server Dependencies:** **None** (No Node.js, Python, or framework runtime needed; runs completely client-side in any modern web browser).

---

## 2. Seven Standard Academic Website Pages

The website implements all seven mandatory navigation tabs required by the university rubrics:

1. **Home (`index.html`)**
   - Full research title, code, and concise academic abstract.
   - Context, motivation, and problem overview (microscale vs. synoptic 20 km NWP cells).
   - Core research objectives and importance for civil aviation in Sri Lanka.
   - Architecture workflow diagram (SVG) and summary of the four seasonal models.
   - Summary of research stages and direct navigation links.

2. **Domain (`domain.html`)**
   - Contains all **20 numbered subsections** specified by the guidelines:
     1. Introduction to the Research Domain
     2. Background of Aviation Meteorology
     3. Aviation Weather Forecasting
     4. Weather Forecast Verification
     5. Sri Lankan Weather Patterns and Monsoons
     6. Literature Survey / Literature Review (formal citations [1]–[15])
     7. Existing Approaches and Related Systems (METAR, TAF, NWP)
     8. Research Gap
     9. Research Problem
     10. Research Aim
     11. Research Objectives
     12. Research Questions
     13. Research Methodology
     14. Proposed System Architecture
     15. Data Collection (120k+ VCBI records, 2019–2026)
     16. Data Preprocessing and Feature Engineering (cyclic trigonometry, dew-point depression)
     17. Machine Learning Model Development (RF+LSTM, XGBoost+TFT, XGBoost, LightGBM)
     18. Model Evaluation & Benchmark Results
     19. Technologies Used
     20. Expected and Actual Research Contributions (Density Altitude, Runway 04 HW/CW vectors, Radiation fog rule, MLOps loop)

3. **Milestones (`milestones.html`)**
   - Chronological timeline covering Gate 1/2 (Proposal), Gate 3 (Progress 1), Gate 4 (Progress 2), Final Assessment, and Viva.
   - Interactive dropdown filter to isolate individual milestones.
   - Status badges, deliverables, panel feedback outcomes, and direct links.

4. **Documents (`documents.html`)**
   - Document repository categorized into:
     - **Category A:** Initial Research Documents (TAF, Proposals)
     - **Category B:** Progress Documents (Progress Review Decks, Panel Feedback Sheets)
     - **Category C:** Research & Technical Documents (IEEE Conference Paper, Turnitin Report)
     - **Category D:** Final Research Documents (Comprehensive Group Draft Thesis, 4 Individual Theses)
   - Real-time search by keyword and category filter tabs.
   - In-page PDF preview modal with direct file download buttons.

5. **Past Presentations (`presentations.html`)**
   - Dedicated presentations archive for Proposal, Progress 1, Progress 2, and Final Viva.
   - Direct download links for original `.pptx` decks and in-page `.pdf` preview options.
   - Verified transparent notice for the upcoming final presentation.

6. **About Us (`about.html`)**
   - Project leadership: Shashika Lokuliyana (Supervisor) and Hansika Mahaadikara (Co-Supervisor).
   - Individual student cards with verified names, registration numbers (IT22113986, IT22269720, IT22619976, IT22069504), photographs, individual research subsystems, and official SLIIT emails.
   - Institutional acknowledgements for the Sri Lanka Department of Meteorology.

7. **Contact Us (`contact.html`)**
   - SLIIT Faculty of Computing institutional address and department details.
   - Supervisors and student researcher academic email addresses.
   - Client-side validated contact form (Name, Email, Subject, Message) with demonstration feedback notice and direct `mailto` link.

---

## 3. How to Run Locally

### Option A: Direct Browser Launch (Easiest)
Simply double-click on `index.html` (or right-click → **Open with** → Google Chrome / Edge / Firefox / Safari). All links, stylesheets, scripts, and embedded previews function locally using standard relative paths.

### Option B: Simple Local Web Server
You can also serve the directory with any local static HTTP server:
- **VS Code:** Install the *Live Server* extension and click **Go Live**.
- **Python (Optional):** Run `python -m http.server 8000` and open `http://localhost:8000`.
- **Node.js (Optional):** Run `npx serve .` and open the local URL.

---

## 4. Maintenance & Update Instructions

### How to Update Research Content
Open `domain.html` or `index.html` in any text editor (e.g., VS Code or Notepad). Locate the numbered `<article class="domain-subtopic">` tags or card elements and update text directly.

### How to Add New Documents
1. Upload your new file to the official [Google Drive Repository](https://drive.google.com/drive/folders/15jPRr4kKpi_Cq7aian5UC9jXBJKNIt82?usp=sharing).
2. In `documents.html`, duplicate one of the `.doc-card` blocks.
3. Set the appropriate `data-category` attribute.
4. Update the title, description, size, and keep the download link set to the Google Drive folder.

### How to Add New Presentation Slides
1. Upload the `.pptx` or `.pdf` file to the [Google Drive Repository](https://drive.google.com/drive/folders/15jPRr4kKpi_Cq7aian5UC9jXBJKNIt82?usp=sharing) and place a lightweight preview PDF in `preview/`.
2. In `presentations.html`, add a new card block under the appropriate milestone.
3. Update the slide title, stage tag, and file download anchor.

### How to Update Milestone Dates or Marks
Open `milestones.html`. Each milestone card contains a `.timeline-date` element and paragraph details. Update the text with the official dates or confirmed assessment outcomes.

### How to Update Contact and Team Details
Open `about.html` and `contact.html`. Update the email links, telephone details, or student registration numbers inside the respective `.team-card` blocks.

---

## 5. Submission Package & 20 MB Limit Optimization

The university course upload guideline specifies a maximum upload size of **20 MB** for the final compressed archive.

### Current Directory Structure:
```text
RP-NEW-website/
├── index.html
├── domain.html
├── milestones.html
├── documents.html
├── presentations.html
├── about.html
├── contact.html
├── README.md
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── documents.js
│   ├── milestones.js
│   └── contact.js
├── img/                (Optimized profile photos & review sheets)
├── downloads/          (Original documents and slides)
└── preview/            (PDF previews for slides and papers)
```

### To prepare a submission package under 20 MB:
1. The website source files (`*.html`, `css/`, `js/`, `img/`) require less than **1.5 MB** in total.
2. If uploading to an LMS with strict 20 MB caps, compress or exclude the uncompressed raw `.pptx` files (specifically `Progress-Presentation-2-R26-IT-132.pptx` which is 25.6 MB), retaining the lightweight PDF equivalents in `preview/` or linking larger video/archive assets to authorized cloud repositories.

---

## 6. Practical Verification Checklist

| Verification Item | Status | Verification Note |
| :--- | :---: | :--- |
| All 7 main pages open correctly | ✅ Passed | Tested across modern browsers via relative links. |
| Navigation bar active highlights | ✅ Passed | Active tab dynamically highlighted based on URL. |
| Responsive mobile/tablet layout | ✅ Passed | Tested via `css/responsive.css` breakpoints down to 360px. |
| Light/Dark mode toggle | ✅ Passed | Works instantly and persists across pages via LocalStorage. |
| Document category filtering | ✅ Passed | Tested for Category A, B, C, D, and All. |
| Document search input | ✅ Passed | Filters cards in real-time by keyword, author, or title. |
| Milestone timeline dropdown | ✅ Passed | Filters milestones by stage dynamically. |
| Contact form input validation | ✅ Passed | Validates required name, email format, subject, and message. |
| In-browser document modal preview | ✅ Passed | Opens PDF files in iframe modal with escape/close handlers. |
| No fake data or phantom links | ✅ Passed | 100% verified facts, real authors, supervisors, and papers. |
