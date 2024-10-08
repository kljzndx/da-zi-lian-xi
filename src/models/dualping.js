/**
 * @param {object} mappings 
 * @param {string} mappings.[key] 
 * @param {string} fullPing 
 */
function parseDualPing(mappings, fullPing) {
    if (fullPing.length == 1) {
        return {
            left: { dualCode: fullPing, fullCode: "" },
            right: { dualCode: fullPing, fullCode: fullPing },
        };
    }

    if (fullPing.length == 2) {
        const pLeft = fullPing[0];
        const pRight = fullPing[1];
        return {
            left: { dualCode: pLeft, fullCode: pLeft },
            right: { dualCode: pRight, fullCode: pRight },
        };
    }

    let lDual = "";
    let lFull = "";

    let rDual = "";
    let rFull = "";

    for (const yingJie in mappings) {
        if (!mappings.hasOwnProperty(yingJie)) continue;

        /**
         * @type {string}
         */
        const key = mappings[yingJie];
        if (key == "" || key == "-") continue;

        if (['ch', 'sh', 'zh'].includes(yingJie)) {
            if (fullPing.startsWith(yingJie)) {
                lDual = key;
                lFull = yingJie;
            }
        } else {
            if (fullPing.endsWith(yingJie)) {
                rDual = key;
                rFull = yingJie;
            }
        }

        if (lDual != "" && rDual != "") break;
    }

    if (lDual == "") {
        lDual = fullPing[0];
        lFull = fullPing[0];
    }

    if (rDual == "") {
        const str = fullPing.replace(lFull, "");
        rDual = str;
        rFull = str;
    }

    return {
        left: { dualCode: lDual, fullCode: lFull },
        right: { dualCode: rDual, fullCode: rFull },
    };
}

export default { parseDualPing };