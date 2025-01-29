// LocalStorage helper
export const loadState = (key) => {
    try {
        const serialized = localStorage.getItem(key);
        return serialized ? JSON.parse(serialized) : undefined;
    } catch (e) {
        return undefined;
    }
};

export const saveState = (key, state) => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(key, serialized);
    } catch (e) {
        console.error("LocalStorage save failed:", e);
    }
};

// CSV Generator
export const generateCSV = (players, course, scores) => {
    const headers = ['Player,Hole,Par,Score,Differential'];
    const rows = players.flatMap((player, pIdx) =>
        course.par.map((par, hIdx) =>
            `${player},${hIdx + 1},${par},${scores[pIdx][hIdx]},${scores[pIdx][hIdx] - par}`
        )
    );
    return [...headers, ...rows].join('\n');
};

export const calculateCourseHandicap = (handicapIndex, slope, rating, coursePar) => {
    return Math.round(
        (handicapIndex * (slope / 113)) +
        (rating - coursePar)
    );
};