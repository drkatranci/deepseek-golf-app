app/
├── api/
│   ├── auth/                        # Authentication routes
│   │   └── route.ts
│   ├── courses/                     # Courses API
│   │   └── route.ts
│   ├── players/                     # Players API
│   │   ├── [id]/
│   │   │   └── route.ts
│   │   └── route.ts
│   ├── games/                       # Game-related API endpoints
│   │   ├── [gameId]/
│   │   │   ├── scorecards/
│   │   │   │   ├── [scorecardId]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── route.ts
│   ├── tournaments/                 # Tournaments API endpoints
│   │   ├── strokeplay/              # Individual-Based Strokeplay Tournaments (gross, net, stableford)
│   │   │    └── [tournamentId]/
│   │   │       ├── rounds/                     # Each round of the tournament
│   │   │       │   ├── [roundId]/
│   │   │       │   │   ├── flights/            # Flights for this specific round
│   │   │       │   │   │   └── [flightId]/
│   │   │       │   │   │       └── scorecards/  # Scorecards within the flight
│   │   │       │   │   │           └── [scorecardId]/
│   │   │       │   │   └── route.ts            # Details/summary for the round
│   │   │       │   └── route.ts                # Overview/listing of all rounds
│   │   │       └── route.ts                   # Tournament overview/details
│   │   │
│   │   ├── team_matchplay/
│   │   │   └── [tournamentId]/
│   │   │       ├── rosters/                # Details on teams, players, captains, etc.
│   │   │       │   └── route.ts
│   │   │       ├── phases/                 # Different phases of the event
│   │   │       │   ├── singles/            # Singles matches phase
│   │   │       │   │   └── route.ts
│   │   │       │   ├── foursomes/          # Foursomes matches phase
│   │   │       │   │   └── route.ts
│   │   │       │   └── fourball/          # Four-ball matches phase
│   │   │       │       └── route.ts
│   │   │       ├── matches/                # Individual match details
│   │   │       │   └── [matchId]/
│   │   │       │       └── route.ts
│   │   │       ├── scheduling/             # Match scheduling and timing details
│   │   │       │   └── route.ts
│   │   │       └── route.ts                # Overview/details of the team matchplay tournament
│   │   └── route.ts    
│   │
│   └── leagues/                     # Leagues API (Reorganized by type)
│       ├── individual/              # Individual-Based Leagues
│       │   └── [leagueId]/
│       │       ├── rounds/          # Each round (stroke play/stableford)
│       │       │   └── [roundId]/
│       │       │       └── route.ts
│       │       ├── leaderboard/
│       │       │   └── route.ts
│       │       ├── players/         # Players competing in the league
│       │       │   └── [playerId]/
│       │       │       └── route.ts
│       │       ├── scheduling/             # Match scheduling and timing details
│       │       │   └── route.ts
│       │       └── route.ts         # League details
│       ├── team/                    # Team-Based Leagues
│       │   └── [leagueId]/
│       │       ├── rounds/          # Rounds for team competition
│       │       │   └── [roundId]/
│       │       │       └── route.ts
│       │       ├── leaderboard/
│       │       │   └── route.ts
│       │       ├── teams/           # Teams competing in the league
│       │       │   └── [teamId]/
│       │       │       └── route.ts
│       │       ├── scheduling/             # Match scheduling and timing details
│       │       │   └── route.ts
│       │       └── route.ts
│       └── matchplay/               # Matchplay-Based Leagues
│           └── [leagueId]/
│               ├── matches/         # Head-to-head match routes
│               │   └── [matchId]/
│               │       └── route.ts
│               ├── leaderboard/
│               │   └── route.ts
│               ├── format/          # To distinguish the tournament style
│               │   ├── league/      # Pure league matchplay format
│               │   │   └── route.ts
│               │   ├── bracket/     # Pure bracket-based matchplay
│               │   │   └── route.ts
│               │   └── hybrid/      # League format then bracket-based
│               │       └── route.ts
│               ├── scheduling/             # Match scheduling and timing details
│               │   └── route.ts
│               └── route.ts
├── components/                      # React components
│   ├── EventCreation/
│   │   ├── EventTypeSelection.tsx
│   │   ├── GameDetailsForm.tsx
│   │   ├── TournamentDetailsForm.tsx
│   │   ├── LeagueDetailsForm.tsx    # Can be enhanced to handle type-specific fields
│   │   └── EventCreationForm.tsx
│   ├── Leaderboard/
│   │   ├── Leaderboard.tsx
│   │   ├── TournamentLeaderboard.tsx
│   │   ├── LeagueLeaderboard.tsx
│   │   └── CasualGameLeaderboard.tsx
│   ├── ScoreEntry/
│   │   └── ScoreEntry.tsx
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── … 
│   └── Layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── contexts/                        # React contexts (state management)
│   └── AuthContext.tsx
│
├── _app.tsx
├── _document.tsx
├── auth/
│   └── login.tsx
├── courses/
│   └── index.tsx
├── players/
│   ├── [id]/
│   │   └── index.tsx
│   └── index.tsx
├── games/
│   ├── [gameId]/
│   │   ├── scorecards/
│   │   │   └── [scorecardId]/
│   │   │       └── page.tsx
│   │   └── page.tsx
│   ├── new/
│   │   └── page.tsx
│   └── page.tsx
├── tournaments/
│   ├── strokeplay
│   │   └── [tournamentId]/
│   │       ├── rounds/                     # Each round of the tournament
│   │       │   ├── [roundId]/
│   │       │   │   ├── flights/            # Flights for this specific round
│   │       │   │   │   └── [flightId]/
│   │       │   │   │       └── scorecards/  # Scorecards within the flight
│   │       │   │   │           └── [scorecardId]/
│   │       │   │   └── page.tsx            # Details/summary for the round
│   │       │   └── page.tsx                # Overview/listing of all rounds
│   │       └── page.tsx                    # Tournament overview/details
│   ├── team_matchplay/
│   │   └── [tournamentId]/
│   │       ├── rosters/                # Details on teams, players, captains, etc.
│   │       │   └── page.tsx
│   │       ├── phases/                 # Different phases of the event
│   │       │   ├── singles/            # Singles matches phase
│   │       │   │   └── page.tsx
│   │       │   ├── foursomes/          # Foursomes matches phase
│   │       │   │   └── page.tsx
│   │       │   └── fourball/          # Four-ball matches phase
│   │       │       └── page.tsx
│   │       ├── matches/                # Individual match details
│   │       │   └── [matchId]/
│   │       │       └── page.tsx
│   │       ├── scheduling/             # Match scheduling and timing details
│   │       │   └── page.tsx
│   │       └── page.tsx                # Overview/details of the team matchplay tournament
│   └── page.tsx                      # General tournament listing page
│
│
├── leagues/                     # Leagues pages (organized by type)
│   ├── individual/
│   │   ├── [leagueId]/
│   │   │   ├── rounds/
│   │   │   │   └── [roundId]/
│   │   │   │       └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── players/
│   │   │   │   └── [playerId]/
│   │   │   │       └── page.tsx
│   │   │   ├── scheduling/             # Match scheduling and timing details
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   ├── team/
│   │   ├── [leagueId]/
│   │   │   ├── rounds/
│   │   │   │   └── [roundId]/
│   │   │   │       └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── teams/
│   │   │   │   └── [teamId]/
│   │   │   │       └── page.tsx
│   │   │   ├── scheduling/             # Match scheduling and timing details
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   ├── matchplay/
│   │   ├── [leagueId]/
│   │   │   ├── matches/
│   │   │   │   └── [matchId]/
│   │   │   │       └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── format/
│   │   │   │   ├── league/    # League format
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── bracket/   # Bracket-based
│   │   │   │   │   └── page.tsx
│   │   │   │   └── hybrid/    # Hybrid (league → bracket)
│   │   │   │       └── page.tsx
│   │   │   ├── scheduling/             # Match scheduling and timing details
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   └── page.tsx                # Optional: listing or redirect for leagues
├── lib/                             # Utilities and helpers
│   ├── db/
│   │   └── prisma.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── leagueUtils.ts          # League-specific calculations
│   ├── types/
│   │   └── types.ts
│   ├── game-logic/
│   │   ├── scoreCalculation.ts
│   │   └── leaderboardUtils.ts
│   └── auth/
│       └── auth.ts
├── middleware.ts                    # Middleware configuration
├── next.config.js                   # Next.js configuration
├── public/                          # Static assets
│   ├── images/
│   └── favicon.ico
├── prisma/                          # Prisma schema and migrations
│   ├── migrations/
│   └── schema.prisma
└── tailwind.config.js               # Tailwind CSS configuration
