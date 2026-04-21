# 🚀 GoalieAI - Prototype Setup

Your AI-powered hockey goalie analysis platform is ready!

## Quick Start (Recommended)

### Option 1: Docker (Easiest)
```bash
cd goalie-ai-web/docker
docker-compose up --build
```

Then open http://localhost:3000

### Option 2: Run Locally

#### 1. Install Python dependencies
```bash
pip install opencv-python mediapipe numpy
```

#### 2. Install Node dependencies
```bash
cd goalie-ai-web
npm install
```

#### 3. Start the app
```bash
npm run dev
```

Open http://localhost:3000

---

## Using Your Videos

Once running:
1. Go to the upload page
2. Drag & drop your video clips (up to 1 min each)
3. Click "Analyze"
4. Get instant feedback on:
   - Puck tracking
   - Stance & positioning  
   - Save quality
   - Angles & coverage
   - Rebound control

---

## Demo Mode

The analyzer includes a fallback demo mode - if video processing fails, it returns sample feedback so you can test the UI flow without processing actual videos.

---

## File Structure

```
goalie-ai-web/
├── app/
│   ├── page.js           # Landing page
│   ├── dashboard/        # User dashboard
│   ├── pricing/          # Pricing tiers
│   └── api/
│       ├── upload/       # Video upload
│       ├── analyze/      # AI analysis
│       └── checkout/     # Stripe payments
├── goalie-ai/
│   └── analyzer.py       # Python AI (OpenCV + MediaPipe)
└── docker/               # Docker configs
```

---

## Features Ready for Demo

- ✅ Video upload (drag & drop)
- ✅ AI analysis engine (puck tracking, pose detection)
- ✅ Feedback system (scores, drills, improvements)
- ✅ User dashboard with history
- ✅ Pricing page with Stripe integration
- ✅ Responsive design

## What's Next

1. **Add your 101 videos** - Drop them in `/data` folder or upload via UI
2. **Connect Supabase** - Set up auth & database (see SUPABASE_SCHEMA.md)
3. **Stripe config** - Add your API keys for payments
4. **Deploy** - Push to Vercel for public access

---

## Need Help?

The analyzer uses:
- **OpenCV** - Puck detection via color/shape
- **MediaPipe** - Goalie pose estimation
- **Python** - All AI processing

Check `goalie-ai/analyzer.py` to tweak detection logic.

---

*Let's get those goalies better! 🦦*