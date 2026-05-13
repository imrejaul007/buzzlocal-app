# BuzzLocal

**Hyperlocal Social + Discovery App**

Part of REZ-Consumer. Users find all local information and earn ReZ Coins. Every action trains the AI.

---

## Overview

| Item | Details |
|------|---------|
| **Type** | React Native (Expo SDK 53) |
| **Platforms** | iOS, Android |
| **Company** | REZ-Consumer |
| **Screens** | 18 |
| **Services** | 9 backend microservices |

---

## Screens (18)

| # | Screen | File | Description |
|---|--------|------|-------------|
| 1 | Home Feed | `app/(main)/index.tsx` | Feed with AI cards |
| 2 | Explore | `app/(main)/explore.tsx` | Search & discover |
| 3 | Events | `app/(main)/events.tsx` | Event discovery |
| 4 | Event Detail | `app/event/[id].tsx` | Event info, RSVP |
| 5 | Create Event | `app/create-event.tsx` | Create event |
| 6 | Vibe Map | `app/(main)/vibe-map.tsx` | Crowd heatmap |
| 7 | Communities | `app/(main)/communities.tsx` | Groups |
| 8 | Community Detail | `app/community/[id].tsx` | Posts |
| 9 | Create Community | `app/create-community.tsx` | Create group |
| 10 | QR Check-in | `app/(main)/scan.tsx` | Ticket check-in |
| 11 | Weather | `app/(main)/weather.tsx` | Weather + alerts |
| 12 | Profile | `app/(main)/profile.tsx` | Badges, streaks |
| 13 | Creator Dashboard | `app/creator.tsx` | Analytics |
| 14 | Wallet | `app/wallet.tsx` | Coins |
| 15 | Notifications | `app/notifications.tsx` | Notifications |
| 16 | Create Post | `app/create.tsx` | 6 post types |
| 17 | Search | `app/search.tsx` | Global search |
| 18 | Settings | `app/settings.tsx` | Settings |

---

## Features

### Post Types (Coin Rewards)
| Type | Coins | Description |
|------|-------|-------------|
| General | 20 | Text, media, tags |
| Event | 50 | Event announcement |
| Alert | 40 | Local alerts |
| Place | 30 | Place discovery |
| Deal | 25 | Offers, discounts |
| Poll | 15 | Community polls |

### Weather
- Real-time weather
- Hourly & 7-day forecast
- Air quality index
- Weather alerts
- Post suggestions based on weather
- **Feeds REZ Mind**

---

## Services Integrated

### RABTUL Core
- Auth: `rez-auth-service.onrender.com`
- Wallet: `rez-wallet-service.onrender.com`

### BuzzLocal Services
- Feed (4000), Vibe (4003), Events (4008)
- Intelligence (4010), Notifications (4011)
- Realtime (4012), Payment (4013), Weather (4014)

### REZ Intelligence
- REZ Mind: AI training
- REZ Event Platform: Event tracking

---

## Data Flow (~106K events/day/city)

```
User Action → Service → REZ Mind
─────────────────────────────────
Post view   → Feed   → Content taste
Check-in    → Vibe   → Area popularity
Event RSVP  → Events → Event demand
Weather     → Weather → Commerce correlation
```

---

## Quick Start

```bash
npm install
npx expo prebuild
npx expo run:ios
```

---

## Related

| Repo | Purpose |
|------|---------|
| RABTUL-Technologies/buzzlocal-services | Backend (9 services) |
| REZ-Intelligence | AI platform |
| SOT.md | Source of Truth |
