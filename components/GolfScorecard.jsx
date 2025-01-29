'use client';
import { useState, useEffect } from 'react';
import { courses } from '@/data/courses';
import { loadState, saveState, generateCSV } from '@/utils/helpers';
import { MoonIcon, SunIcon, PlusIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const GolfScorecard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [selectedTee, setSelectedTee] = useState(selectedCourse.tees[0]);
    const [players, setPlayers] = useState([
        { name: "Player 1", handicapIndex: 12.4 },
        { name: "Player 2", handicapIndex: 8.2 }
    ]); const [scores, setScores] = useState(() =>
        Array(players.length).fill().map(() => Array(selectedCourse.holes).fill(''))
    );

    // LocalStorage persistence
    useEffect(() => {
        const saved = loadState('golfApp');
        if (saved) {
            setPlayers(saved.players);
            setScores(saved.scores);
            setSelectedCourse(saved.course);
        }
    }, []);

    useEffect(() => {
        saveState('golfApp', { players, scores, course: selectedCourse });
    }, [players, scores, selectedCourse]);

    // Player management
    const addPlayer = () => {
        setPlayers([...players, `Player ${players.length + 1}`]);
        setScores([...scores, Array(selectedCourse.holes).fill('')]);
    };

    const removePlayer = (index) => {
        setPlayers(players.filter((_, i) => i !== index));
        setScores(scores.filter((_, i) => i !== index));
    };

    // Course handling
    const handleCourseChange = (courseId) => {
        const newCourse = courses.find(c => c.id === courseId);
        setSelectedCourse(newCourse);
        setScores(Array(players.length).fill().map(() => Array(newCourse.holes).fill('')));
    };

    // Score calculations
    const calculateStats = (playerIndex) => {
        const totals = {
            gross: 0,
            net: 0,
            differentials: [],
            average: 0
        };

        selectedCourse.par.forEach((par, holeIndex) => {
            const grossScore = scores[playerIndex][holeIndex] || 0;
            const courseHandicap = calculateCourseHandicap(
                players[playerIndex].handicapIndex,
                selectedTee.slope,
                selectedTee.rating,
                selectedCourse.par
            );
            const strokesGiven = Math.floor(
                (selectedTee.handicap[holeIndex] / 18) * courseHandicap
            );

            totals.gross += grossScore;
            totals.net += Math.max(grossScore - strokesGiven, 0);
        });

        totals.average = (totals.gross / selectedCourse.holes).toFixed(1);
        return totals;
    };

    const calculateNetScore = (player, holeIndex) => {
        const courseHandicap = calculateCourseHandicap(
            player.handicapIndex,
            selectedTee.slope,
            selectedTee.rating,
            selectedCourse.par
        );

        const strokesGiven = Math.floor(
            (selectedTee.handicap[holeIndex] / 18) * courseHandicap
        );

        return (scores[playerIndex][holeIndex] || 0) - strokesGiven;
    };

    // Export handler
    const handleExport = () => {
        const csvData = generateCSV(players, selectedCourse, scores);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `golf-scores-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
    };



    return (
        <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Control Bar */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <select
                    value={selectedCourse.id}
                    onChange={(e) => handleCourseChange(Number(e.target.value))}
                    className="p-2 rounded border dark:bg-gray-800"
                >
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>

                <button
                    onClick={addPlayer}
                    className="flex items-center gap-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    <PlusIcon className="w-4 h-4" /> Add Player
                </button>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>

                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    <DocumentArrowDownIcon className="w-4 h-4" /> Export CSV
                </button>
            </div>


      // Add tee selection dropdown
            <select
                value={selectedTee.name}
                onChange={(e) => setSelectedTee(selectedCourse.tees.find(t => t.name === e.target.value))}
                className="p-2 rounded border dark:bg-gray-800"
            >
                {selectedCourse.tees.map(tee => (
                    <option key={tee.name} value={tee.name}>{tee.name} Tee</option>
                ))}
            </select>

// Player handicap input
            <input
                type="number"
                step="0.1"
                value={players.handicapIndex}
                onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[pIndex].handicapIndex = parseFloat(e.target.value);
                    setPlayers(newPlayers);
                }}
                className="w-20 bg-transparent border-b focus:outline-none"
            />

// Net score display
            <td className="p-2">
                <div className="font-bold">{gross}</div>
                <div className="text-sm text-gray-500">Net: {net}</div>
            </td>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {players.map((player, index) => {
                    const courseHandicap = calculateCourseHandicap(
                        player.handicapIndex,
                        selectedTee.slope,
                        selectedTee.rating,
                        selectedCourse.par
                    );

                    return (
                        <div key={index} className="p-3 rounded bg-gray-100 dark:bg-gray-800">
                            <h3 className="font-bold">{player.name}</h3>
                            <p>Index: {player.handicapIndex}</p>
                            <p>Course HCP: {courseHandicap}</p>
                        </div>
                    );
                })}
            </div>

            {/* Scorecard Table */}
            <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
                <table className="min-w-[800px] w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="p-3 w-32 text-left">Players</th>
                            {selectedCourse.par.map((_, index) => (
                                <th key={index} className="w-12 text-center p-2">
                                    <div className="text-xs">{index + 1}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {selectedCourse.yardage[index]}yd
                                    </div>
                                </th>
                            ))}
                            <th className="w-32 p-2">Total</th>
                            <th className="w-32 p-2">Avg/Hole</th>
                        </tr>
                        <tr>
                            <td className="p-3">Par</td>
                            {selectedCourse.par.map((par, index) => (
                                <td key={index} className="text-center p-2">{par}</td>
                            ))}
                            <td className="font-bold">{selectedCourse.par.reduce((a, b) => a + b, 0)}</td>
                            <td>—</td>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player, pIndex) => (
                            <tr key={pIndex} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={players[pIndex].name}
                                            onChange={(e) => {
                                                const newPlayers = [...players];
                                                newPlayers[pIndex].name = e.target.value;
                                                setPlayers(newPlayers);
                                            }}
                                            className="bg-transparent border-b focus:outline-none"
                                        />
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={players[pIndex].handicapIndex}
                                            onChange={(e) => {
                                                const newPlayers = [...players];
                                                newPlayers[pIndex].handicapIndex = parseFloat(e.target.value) || 0;
                                                setPlayers(newPlayers);
                                            }}
                                            className="w-20 bg-transparent border-b focus:outline-none"
                                        />
                                        <button
                                            onClick={() => removePlayer(pIndex)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>

                                {selectedCourse.par.map((par, hIndex) => (
                                    <td key={hIndex} className="p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            max="15"
                                            value={scores[pIndex][hIndex] || ''}
                                            onChange={(e) => {
                                                const newScores = [...scores];
                                                newScores[pIndex][hIndex] = e.target.value === '' ? '' : Math.min(15, Math.max(1, Number(e.target.value)));
                                                setScores(newScores);
                                            }}
                                            className={`w-full text-center rounded border ${(scores[pIndex][hIndex] || 0) < par ? 'bg-green-100 dark:bg-green-900' :
                                                (scores[pIndex][hIndex] || 0) > par ? 'bg-red-100 dark:bg-red-900' : ''
                                                }`}
                                        />
                                    </td>
                                ))}

                                <td className="p-2 font-bold">
                                    {calculateStats(pIndex).gross}
                                    <span className="block text-sm text-gray-500">
                                        ({calculateStats(pIndex).gross - selectedCourse.par.reduce((a, b) => a + b, 0)})
                                    </span>
                                </td>
                                <td className="p-2">
                                    <div className="font-bold">{calculateStats(pIndex).gross}</div>
                                    <div className="text-sm text-gray-500">
                                        Net: {calculateStats(pIndex).net}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stats Summary */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedCourse.par.map((_, hIndex) => (
                    <div key={hIndex} className="p-4 rounded bg-gray-100 dark:bg-gray-800">
                        <h3 className="font-bold mb-2">Hole {hIndex + 1}</h3>
                        <p>Avg: {(
                            players.reduce((sum, _, pIndex) => sum + (scores[pIndex][hIndex] || 0), 0) / players.length
                        ).toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GolfScorecard;