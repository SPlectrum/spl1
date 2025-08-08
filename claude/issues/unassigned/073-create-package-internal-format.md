---
type: feature
github_id: 7
title: "Create Package Internal Format"
short_summary: ""  # One-line summary (max 80 chars) for collaboration lists
state: "open"
milestone: "unassigned"
labels: "["enhancement"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-07-10T11:15:40Z"
local_updated_at: "2025-08-07T18:20:03.451Z"
---

Module and data packages feature a map external format suitable for deployment management.
This data has to be broken down in an internal avro format - the native internal data structure.

I think it is possible to cover both functional and data (template) packages with the same avro schema.

Design the data and folder structures for both and put assets into place.
The Package API needs import and export methods into the internal native structure.
I don't think another specific interface is needed - the internal format can be dealt with using the Record API.
