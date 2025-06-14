# Subdirectory CLAUDE.md Evolution Plan

## Vision

Evolve from monorepo with single CLAUDE.md to federated repository architecture where each component becomes autonomous with its own AI guidance.

## Discovery Mechanism

- Check for `./CLAUDE.md` in current working directory first
- If found, it **completely overrides** the root CLAUDE.md  
- Fallback to root CLAUDE.md if no local one exists
- Each subdirectory CLAUDE.md should be completely self-contained

## Evolution Path

### Current State
- Monorepo with single root CLAUDE.md
- All operational guidance centralized

### Transition State  
- Step-by-step creation of subdirectory CLAUDE.md files
- Each area becomes progressively more autonomous
- Continuous improvement toward self-containment

### Target State
- Separate repositories, each with their own complete CLAUDE.md
- Each component fully autonomous for AI-assisted development
- No dependencies on external guidance files

## Implementation Strategy

### Starting Point: `/spl/apps/boot/CLAUDE.md`
**Rationale**: Boot app has complex release workflows, deployment procedures, and packaging operations that are well-defined and isolated.

**Content Scope**:
- Release management commands and workflows
- Deployment procedures (deploy_install, deploy_modules, deploy_apps)
- Archive creation and testing
- Boot-specific debugging and troubleshooting

### Next Areas (Priority Order)
1. **`/modules/tools/7zip/CLAUDE.md`** - Archive operations, external tool integration
2. **`/modules/tools/git/CLAUDE.md`** - Version control operations, repository management  
3. **`/modules/spl/CLAUDE.md`** - Core SPL APIs, pipeline system
4. **`/docs/CLAUDE.md`** - Documentation maintenance, housekeeping rules
5. **`/release/CLAUDE.md`** - Release packaging and distribution

### Design Principles

#### 1. Complete Self-Containment
Each subdirectory CLAUDE.md must include:
- All commands needed for that component
- Essential debugging and troubleshooting
- Component-specific operational rules
- Required tools and dependencies
- Relevant file locations and patterns

#### 2. Format Consistency
Maintain similar sections across all CLAUDE.md files:
- Essential Commands
- Critical Operational Rules  
- Quick Debugging
- Key Files for Understanding
- Component-specific sections as needed

#### 3. Learning Transfer Process
- Regular reviews to identify learnings that should be included in other areas
- Cross-pollination of best practices and patterns
- Systematic evaluation of whether insights apply broadly or specifically

#### 4. Autonomy Maximization
- Each CLAUDE.md should enable completely independent work in that area
- Minimal references to external files or dependencies
- Self-sufficient operational guidance

## Implementation Process

### Phase 1: Prototype with Boot App
1. Create `/spl/apps/boot/CLAUDE.md` as complete standalone guide
2. Test discovery mechanism and override behavior
3. Iterate on format and content based on actual usage
4. Establish patterns for self-containment

### Phase 2: Expand to Tools
1. Create tool-specific CLAUDE.md files
2. Refine cross-component learning transfer process
3. Develop templates and patterns for new areas

### Phase 3: Core Systems
1. Break down core SPL components
2. Address interdependencies between components
3. Prepare for eventual repository separation

### Phase 4: Repository Separation
1. Each component becomes independent repository
2. Each maintains its own complete CLAUDE.md
3. Federated development model achieved

## Questions and Considerations

### Technical Implementation
- How does Claude Code detect and choose between CLAUDE.md files?
- What's the exact discovery algorithm?
- How to handle conflicts or overlaps between areas?

### Content Management
- How to maintain consistency while allowing autonomy?
- What belongs in root vs. subdirectory guidance?
- How to handle shared concepts or cross-cutting concerns?

### Evolution Management
- How to migrate from centralized to distributed guidance?
- What triggers moving an area to its own CLAUDE.md?
- How to maintain coherence during transition?

## Success Criteria

- Each subdirectory can be worked on independently with just its CLAUDE.md
- Minimal duplication while maintaining complete self-containment
- Clear, consistent format across all areas
- Smooth transition path toward repository separation
- Maximum autonomy for AI-assisted development in each area

## Status

**Current Phase**: Planning and discussion
**Next Action**: Begin prototype with `/spl/apps/boot/CLAUDE.md`