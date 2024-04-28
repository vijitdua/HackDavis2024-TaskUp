export function arrayToString(array, delimiter = ',') {
    return array.join(delimiter);
}

export function stringToArray(string, delimiter = ',') {
    return string.split(delimiter);
}
