---
layout: project.njk
title: Goibibo flights seat selection
description: If you'd like to learn more, please get in touch.
role: Product Designer & Frontend Architect
timeline: August 2024 — Present
year: 2024
tags:
  - UX Architecture
  - Design Systems
  - Performance
link: https://example.com/seat-selection
github: https://github.com/rounaksaha
permalink: /projects/flight-seat-selection/index.html
---

## Context

Seat selection in flights has existed for a long time. We didn't realise the need to look into it until the numbers started to decline because users simply stopped selecting them while booking flight tickets. Also, a good amount of traffic comes from meta platforms (websites like Skyscanner, Google Flights) and from there, users don't usually select add-ons (like seats, meals, etc).

Our challenge was to overhaul the entire seat selection journey: make it intuitive, blazing fast on mobile 3G/4G connections, and transparently convey seat privileges without cluttering the screen.

## Problem and opportunity

The major problem was that users weren't able to decide which seats to select. In case of multiple flights in a single booking, a large percentage of users selected seats for the first flight leg and accidentally abandoned the rest.

As we inspected the flow, we discovered several critical usability issues:

1. **Unclear Legroom and Extra Space Indications**: Users couldn't differentiate between standard, extra legroom, and exit row restrictions.
2. **Multi-Sector Friction**: Booking connecting journeys forced users to navigate back and forth between flight tabs.
3. **Heavy DOM Renders**: Rendering a 180-seat SVG layout on low-end Android devices resulted in significant frame drops (300ms+ input latency).

## Goal

We set three primary objectives:

- **Increase Complete Selection Rate**: Lift end-to-end seat selection completion for connecting flights by **+18%**.
- **Reduce Cognitive Overhead**: Enable users to complete seat selection in under **45 seconds**.
- **Optimize Client Performance**: Achieve **60 FPS smooth panning** and sub-50ms interaction response times across all devices.

## Scope

The redesign covered:

- Full seat map visualization (Narrow-body Airbus A320 & Boeing 737 aircraft families).
- Multi-passenger coordinated selection for families and traveling companions.
- Dynamic price chips that adapt to seat tier and meal bundle incentives.
- Micro-interactions for seat hover, tap, confirmation, and quick-undo states.

## Explorations

During the exploration phase, we tested three distinct design patterns:

### 1. Horizontal Carousel vs. Continuous Vertical Scroll
We benchmarked horizontal swiping across aircraft sections against a continuous fluid vertical canvas with sticky aircraft wings. Users demonstrated a 34% faster comprehension rate on the vertical fluid canvas.

### 2. Intelligent Auto-Assignment with 1-Tap Confirmation
For solo business travelers in a rush, we introduced an algorithmically pre-selected best seat (aisle/window matching preference) with an immediate single-tap approval.

## Solution

The final delivered architecture integrated:

- **Canvas-Accelerated Layout**: Replaced heavy SVG node trees with lightweight HTML canvas rendering for instantaneous rendering on low-tier mobile devices.
- **Persistent Flight Summary Bar**: Clearly indicated which legs of the journey had seats confirmed and which still needed attention.
- **Accessible Color Indicators**: Strict WCAG AAA color contrast ratios across occupied, free, selected, and premium categories.

## Conclusion

Following launch to 100% of production traffic:

- **+24.6% increase** in overall seat selection adoption across both direct and meta-search traffic channels.
- **-38% reduction** in booking abandonment at the add-ons checkout step.
- **100/100 Lighthouse Performance** rating maintained across all mobile viewports.

