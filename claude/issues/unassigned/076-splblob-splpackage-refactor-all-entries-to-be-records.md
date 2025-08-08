---
type: feature
github_id: 4
title: "spl/blob spl/package Refactor - All entries to be records"
short_summary: ""  # One-line summary (max 80 chars) for collaboration lists
state: "open"
milestone: "unassigned"
labels: "["enhancement"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-07-10T11:15:39Z"
local_updated_at: "2025-08-07T18:20:03.454Z"
---

spl/blob and spl/package still have workspace entries that are strings, not records ( { headers: {}, value: {} } )
This is inconsistent and causes issues with spl_wsRef where a string value is seen as a reference to a value elsewhere.
(spl_wsGet does not have reference implementation for the moment)

Moreover, the record format is necessary to include metadata when implementing binary operations alongside text operations.
It also allows to keep parsed JSON data in spl/blob.

However, this requires test suites to be present for the core package because of its impact.
