export const DOMCache = new Map();

export const DOMCacheGetOrSet = (id) => {
    const cachedID = DOMCache.get(id);
    if (cachedID) {
    return cachedID;
    }

    const ID = document.getElementById(id);

    if (!ID) {
    throw new TypeError(`Nothing with "${id}" was found.`);
    }

    DOMCache.set(id, ID);
    return ID;
};