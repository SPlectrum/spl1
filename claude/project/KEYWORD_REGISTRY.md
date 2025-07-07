# PROJECT KEYWORD_REGISTRY

This file maintains project-specific workflow trigger keywords that extend the base WoW KEYWORD_REGISTRY.

## spl1 Epic Labels (GitHub Issue Classification)

The following epic labels are used for issue classification on GitHub:

| Epic Label | Description | Color |
|------------|-------------|-------|
| **RR** | Repository Restructure Epic | #FF6B6B |
| **SE** | SPlectrum Engines Epic | #4ECDC4 |
| **CAE** | Core API Enhancement Epic | #45B7D1 |
| **TDD** | Test-Driven Development Epic | #96CEB4 |
| **BARE** | Minimal Dependencies Epic | #DDA0DD |
| **NFD** | New Functionality Development Epic | #0366d6 |
| **AVRO** | AVRO Integration Epic | #FFEAA7 |

**Note**: These are GitHub issue labels for classification, not workflow keywords. See [spl1 Epics Overview](../../docs/management/spl1-epics-overview.md) for detailed epic descriptions.

## Project-Specific Customizations

### ESSENTIAL_COMMANDS Customization
- **spl1 Operations**: Epic phase management, external install workflows, and core API commands

## Registry Inheritance

This project registry extends the base WoW registry located at `../wow/KEYWORD_REGISTRY.md`. All base workflow keywords are inherited and available in this project context.

## Usage Pattern

For project-specific workflows:
```markdown
**EPIC_KEYWORD** → See [../wow/workflows/EPIC_FILENAME.md](../wow/workflows/EPIC_FILENAME.md)
```

For inherited WoW workflows, refer to the base registry at `../wow/KEYWORD_REGISTRY.md`.