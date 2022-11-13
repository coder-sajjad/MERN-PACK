
/**
 * express createError 
 * @param {*} status 
 * @param {*} msg 
 * @returns err
 */
const createError = (status, msg) => {
    const err = new Error();
    err.status = status;
    err.message = msg;
    return err;
};

// export default
export default createError;