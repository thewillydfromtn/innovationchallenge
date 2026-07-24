# Fortress AI Innovation Challenge

## Film Overview

This section is reserved for the film's authoritative overview, including its core premise, scope, and production intent once those details are formally defined.

## Visual Direction

This section is reserved for the film's approved visual language, style references, and aesthetic constraints once those choices are formally established.

## Office Layout

This section is reserved for the canonical office geography, spatial relationships, and location notes once the layout is formally specified.

## Camera Rules

This section is reserved for the production's camera grammar, framing guidelines, and movement rules once those standards are formally defined.

## Character Rules

This section is reserved for authoritative character guidance, including behavior, appearance, and continuity requirements once those details are formally approved.

## Prop Continuity

This section is reserved for canonical prop tracking, placement, usage, and continuity notes once the production props are formally defined.

## Lighting

This section is reserved for the approved lighting approach, continuity requirements, and scene-specific lighting notes once those standards are formally established.

## Monitor Behavior

This section is reserved for authoritative monitor, screen, and display behavior rules once the required on-screen content and interactions are formally specified.

## Scene Structure

This section is reserved for the film's canonical scene organization, sequence order, and structural notes once the scene plan is formally defined.

## Animation Rules

This section is reserved for animation principles, motion constraints, and continuity rules once those production standards are formally established.

## Technical Architecture

The approved production model is a self-playing GitHub Pages film made from a sequence of full-frame office still images and standalone full-screen HTML presentations. Office images are static cinematic frames that already contain William, the Kerri portrait, wall artwork, drink, candle, monitor previews, and all other office details. Runtime overlays, monitor geometry alignment, fake monitor screens, and layered HTML recreations of office objects are retired from active use.

The transition grammar is intentionally simple: show an office still for a configurable duration, apply only a subtle whole-image push when desired, fade to black, then fade into the next standalone presentation. Presentations own the entire browser viewport and are not embedded inside monitor artwork. When a presentation finishes, the player fades to black and advances to the next office still.

Historical overlay and monitor-alignment modules may remain in the repository while dependent prototype code is retired, but they must be treated as deprecated and must not be used for new production work.

## Asset Inventory

`assets/reference/master-office-reference.png` is the approved master office image and the canonical visual source for the permanent office background.

## Open Decisions

This section is reserved for tracking unresolved questions, pending approvals, and future decisions needed to complete the production specification.
