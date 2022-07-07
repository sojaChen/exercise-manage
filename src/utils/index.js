/* 
    参数：obj 要判断是否有值
*/
function checkIsFull(obj) {
    let isFull = true;
    const keyArr = Object.keys(obj).filter((key) => key !== "id");
    try {
        keyArr.forEach((key) => {
            console.log();
            if (!obj[key] || /^[\s]*$/.test(obj[key])) {
                isFull = false;
                throw new Error('LoopInterrupt');
            }
        });
    } catch (e) {
        if (e.message !== "LoopInterrupt") throw e
    }
    return { keyArr, isFull };
}

export { checkIsFull }