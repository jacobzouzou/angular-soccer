import { iSchedule } from '../interfaces/schedule';
import { iTeam } from '../interfaces/teams';

export const SEASON_SCHEDULE: iSchedule[] = [
    {
        id: 1,
        playingDate: new Date(2016, 8, 23),
        homeTeam: 'Old Men United',
        awayTeam: 'Kellie Kickers',
        homeScore: 4,
        awayScore: 3,
        refName: 'Joanne',
        notes: 'Overtime game'
    },
    {
        id: 2,
        playingDate: new Date(2016, 8, 26),
        homeTeam: 'Torn Achilles',
        awayTeam: '422 Nomads',
        homeScore: 7,
        awayScore: 2,
        refName: 'Colin',
        notes: ''
    },
    {
        id: 3,
        playingDate: new Date(2016, 8, 28),
        homeTeam: 'Blue devils',
        awayTeam: 'FC Dauntlesss',
        homeScore: 4,
        awayScore: 6,
        refName: 'Gene',
        notes: ''
    },

]

export
    const TEAMS: iTeam[] =
        [
            { id: 1, name: "Old Menu United", type: "Over 30" },
            { id: 2, name: "422 Nomads", type: "Over 30" },
            { id: 3, name: "FC Dauntless", type: "Over 30" },
            { id: 4, name: "Kellie's Kickers", type: "Over 30" },
            { id: 5, name: "Blue Devils", type: "Over 30" },
            { id: 6, name: "Torn Achilles", type: "Over 30" }
        ]
