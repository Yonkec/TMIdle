let lastFrameTime = performance.now();

export function computeDeltaTime() {
    const now = performance.now();
    const dt = (now - lastFrameTime) / 1000; // Keep DT in seconds
    lastFrameTime = now;
    return dt;
}

export function swapElementsInArray(array, indexA, indexB) {
    const newArray = [...array];
    [newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]];
    return newArray;
}

export async function loadJSONFile(filename) {
    try {
        const response = await fetch(filename);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}