import React from 'react';

const TimelinePageASCII = () => {
  return (
    <pre className="timeline-ascii">
{`
+----------------------------------------------------------------------------------+
|                              [ TimelinePage: Master View ]                      |
+----------------------------------------------------------------------------------+

[ Filters / Controls ]
+----------------------------------------------------------------------------------+
| [Search Timelines]  [Filter by Category ▼]  [Filter by Contradiction ▼]  [Zoom ▼] |
+----------------------------------------------------------------------------------+

[ Timeline Legend / Color Key ]
+----------------------------------------------------------------------------------+
| ■ Historical Arc   ■ Thematic Sequence   ■ Active   ■ Closed   ■ High Rupture    |
+----------------------------------------------------------------------------------+

[ Core Contradiction Summary Box ]
+----------------------------------------------------------------------------------+
| ┌──────────────────────────── Summary Box ─────────────────────────────┐         |
| │ "Casteism remains a core contradiction shaping Indian democracy..."  │         |
| └──────────────────────────────────────────────────────────────────────┘         |
+----------------------------------------------------------------------------------+

[ Timeline Canvas ]
+----------------------------------------------------------------------------------+
|  Time Range: 1900 -------------------------------------------- 2025              |
|                                                                                  |
|  |--------------------------------------------------------------------------------|
|  | Timeline 1: Caste vs Democracy (Historical Arc)                               |
|  |  ┌──────────────────────────────────────────────────────────────────────────┐  |
|  |  │ ■ [1947–77]  ■ [1977–90]  ■ [1990–2006]  ■ [2006–20]  ■ [2020–Now]       │  |
|  |  │  ○ 1990: Mandal Commission     ○ 1992: Babri Demolition                 │  |
|  |  └──────────────────────────────────────────────────────────────────────────┘  |
|  |                                                                                 |
|  |  For Phase [1990–2006]                                                         |
|  |  ┌────────────── Visual: Dialectical Flow / Heatmap (Optional) ─────────┐     |
|  |  │    [ Caste Hierarchy ] → clashes with → [ Democratic Citizenship ]   │     |
|  |  │    [ OBC Assertion ]   → disrupts →      [ Brahminical Supremacy ]   │     |
|  |  └──────────────────────────────────────────────────────────────────────┘     |
|  |                                                                                 |
|  |   Hover overlay:                                                                |
|  |   ┌────────────────────── Current Phase: [1990–2006] ───────────────────────┐  |
|  |   │ Summary: Rise of OBC assertion + Hindutva counter-offensive             │  |
|  |   │                                                                          │  |
|  |   │ 🔹 Events:                                                               │  |
|  |   │   - 1990: Mandal Commission implemented                                  │  |
|  |   │   - 1992: Babri Masjid Demolition                                        │  |
|  |   │                                                                          │  |
|  |   │ 🔹 Issues:                                                               │  |
|  |   │   - Reservation vs Merit Narrative                                       │  |
|  |   │   - Caste Violence in North India                                        │  |
|  |   │                                                                          │  |
|  |   │ 🔹 Linked Structures:                                                    │  |
|  |   │   - Reservation Policy (superstructure)                                  │  |
|  |   │   - VHP-RSS Network (ideological apparatus)                              │  |
|  |   │                                                                          │  |
|  |   │ 🔹 Linked Struggles:                                                     │  |
|  |   │   - Bahujan Assertion                                                    │  |
|  |   │   - Secular vs Hindutva Conflicts                                        │  |
|  |   └──────────────────────────────────────────────────────────────────────────┘  |
|                                                                                  |
|  | Timeline 2: Capital vs Labour (Thematic Sequence)                             |
|  |  ┌──────────────────────────────────────────────────────────────────────────┐  |
|  |  │ ■ [1947–77]  ■ [1977–90]  ■ [1990–2006]  ■ [2006–20]  ■ [2020–Now]       │  |
|  |  │  ○ 1991: Liberalisation Begins     ○ 2006: SEZ Protests                  │  |
|  |  └──────────────────────────────────────────────────────────────────────────┘  |
|                                                                                  |
|  | Timeline 3: Communism in India (Historical Arc)                               |
|  |  ┌──────────────────────────────────────────────────────────────────────────┐  |
|  |  │ ■ [1930–60]  ■ [1960–90]  ■ [1990–2020]  ■ [2020–Now]                    │  |
|  |  │  ○ 1967: Naxalbari Uprising       ○ 2004: CPI(M) in UPA-I               │  |
|  |  └──────────────────────────────────────────────────────────────────────────┘  |
|                                                                                  |
|  [Timeline Zoom Slider ▼]  [Timeline Scroll Bar]                                 |
+----------------------------------------------------------------------------------+

[ Hovered Event Overlay (example: 1990 Mandal Commission) ]
+----------------------------------------------------------------------------------+
| Title: Mandal Commission Implemented                                             |
| Multi-headline View: "OBC Reservations Change Indian Politics Forever"          |
| Date: 1990-08-07  | Reporting Date: 1990-08-07                                   |
| Location: India-Wide | Platform: Newspapers | Src Type: Report                  |
| Link: [https://example.com/article]                                             |
|                                                                                  |
| Description: The V.P. Singh government implemented the Mandal Commission...      |
|                                                                                  |
| Linked Structures: Reservation Policy (Superstructure)                          |
| Linked Contradictions: Caste vs Democracy                                       |
| Linked Struggles: Bahujan Assertion                                             |
| Linked Entities: V.P. Singh, Janata Dal                                         |
| Event Motion: Escalation   | Relevance: High     | Scale: Macro                 |
| Linked Phase ID: CVDEM-03 (1990–2006)                                           |
+----------------------------------------------------------------------------------+

[ Selected Timeline Details / Event List ]
+----------------------------------------------------------------------------------+
| Timeline: Caste vs Democracy                                                     |
| Period: 1947–Now                                                                 |
| Description: Evolution of caste-based assertion and state response.              |
|                                                                                  |
| Key Events:                                                                      |
|  • 1990 - Mandal Commission                                                      |
|  • 1992 - Babri Masjid Demolition                                                |
|  • 2006 - OBC Quota in Higher Education                                          |
|                                                                                  |
| [ View Full Timeline ]   [ Export Timeline ]   [ Add Event ]                    |
+----------------------------------------------------------------------------------+

[ Footer ]
+----------------------------------------------------------------------------------+
| © Zoomout Project — Dialectical Political Timelines                              |
+----------------------------------------------------------------------------------+
`}
    </pre>
  );
};

export default TimelinePageASCII; 