# GoalieAI Platform Specification

## Product Overview
- **Name:** GoalieAI
- **Type:** AI-powered hockey goalie video analysis platform
- **Core Function:** Users upload 60-second goalie clips → AI analyzes puck, players, goalie → provides feedback on stance, angles, positioning
- **Target Users:** Youth goalies (parents pay), beer league goalies, aspiring players

## Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/mo | 3 analyses/month, basic feedback |
| Pro | $19.99/mo | 5 analyses/week, detailed feedback, progress tracking |
| Unlimited | $99/mo | Unlimited analyses, real-time, video overlay |
| Team | $199/mo | Team dashboard, player comparisons, coach portal |

## Tech Stack

### Frontend
- Next.js 14 (React)
- TailwindCSS (styling)
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- Next.js API Routes
- Stripe (payments)
- Supabase (database + auth)

### AI/ML
- Python analyzer (this repo)
- MediaPipe (pose estimation)
- OpenCV (video processing)

## Key Features

### 1. Video Upload
- Drag-and-drop interface
- Accepts MP4, MOV
- Max 1 minute / 500MB
- Progress indicator

### 2. AI Analysis Engine
- Puck tracking (position in each frame)
- Player detection (teammates, opponents)
- Goalie pose estimation
- Save selection classification
- Angle play evaluation
- Rebound analysis

### 3. Feedback System
- 1-10 scoring on: stance, tracking, positioning, angles, rebound control
- Text recommendations
- Drill suggestions
- Visual overlay (draws on video showing issues)

### 4. User Dashboard
- Analysis history
- Progress tracking over time
- Export reports

### 5. Payment System
- Stripe subscriptions
- Usage tracking (monthly limits)
- Upgrade/downgrade flows

## File Structure

```
goalie-ai-web/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Landing page
│   ├── dashboard/         # User dashboard
│   ├── pricing/           # Pricing page
│   └── api/
│       ├── upload/        # File upload
│       ├── analyze/       # Run AI analysis
│       └── checkout/      # Stripe checkout
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── SPEC.md               # This file
└── package.json
```

## API Endpoints

### POST /api/upload
- Input: FormData with video file
- Output: { fileId, success }

### POST /api/analyze
- Input: FormData with file, fileId
- Output: { analysis, feedback }

### POST /api/checkout
- Input: { tier, userId }
- Output: { url } (Stripe checkout URL)

## Development Status

- [x] Landing page (UI done)
- [x] Upload flow (UI done)
- [x] Pricing page (UI done)
- [x] Upload API (stub)
- [x] Analyze API (calls Python)
- [x] Checkout API (Stripe integration)
- [ ] Dashboard (in progress)
- [ ] Database setup
- [ ] Auth flow
- [ ] Production deployment

## Next Steps

1. Deploy to Vercel
2. Set up Supabase project
3. Configure Stripe products
4. Test with real video clips
5. Launch beta to Heffyy's audience
