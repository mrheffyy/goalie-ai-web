# GoalieAI Database Schema

## Tables

### users (Managed by Supabase Auth)
- id (uuid, primary key)
- email
- created_at

### saves
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| video_url | text | S3/Supabase storage URL |
| thumbnail_url | text | Preview image |
| scores | jsonb | { stance: 7, tracking: 8, ... } |
| strengths | jsonb | ["Good tracking", "Nice stance"] |
| improvements | jsonb | ["Five-hole", "Post recovery"] |
| drills | jsonb | ["Drill name 1", "Drill name 2"] |
| notes | text | User's personal notes |
| goal_areas | jsonb | ["topLeft", "botCenter"] - where goals went |
| save_type | text | "butterfly", "quick", "standup" |
| game_type | text | "game", "practice", "shuffle" |
| created_at | timestamp | When saved |
| updated_at | timestamp | Last update |

### subscriptions
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| stripe_subscription_id | text | Stripe sub ID |
| tier | text | "free", "pro", "unlimited", "team" |
| status | text | "active", "canceled", "past_due" |
| current_period_end | timestamp | When renewal happens |
| analyzes_remaining | int | For free tier tracking |

### monthly_recaps (Generated, not stored)
- Generated on-the-fly from saves table
- Aggregates last 30 days of data

## Row Level Security

```sql
-- Enable RLS
ALTER TABLE saves ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saves
CREATE POLICY "Users can view own saves" ON saves
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saves" ON saves
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saves" ON saves
  FOR UPDATE USING (auth.uid() = user_id);
```

## Storage Buckets

### clips
- Bucket for uploaded video clips
- Private (user only access)

### thumbnails
- Bucket for generated thumbnails
- Public read access
