export function cumsum(arr) {
    return arr.reduce(function (r, a) {
        if (r.length > 0)
            a += r[r.length - 1];
        r.push(a);
        return r;
    }, []);
}

export function sum(arr) {
    return arr.reduce((a,b) => a+b, 0);
}

export function mult(arr1, arr2) {
    const results = [];
    for (let i = 0; i < arr1.length; i++) {
        results.push(arr1[i] * arr2[i]);
    } 
    return results;
}

// function diff(arr1, arr2) {

// }
