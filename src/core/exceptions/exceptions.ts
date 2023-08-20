class BaseException{

    constructor(
        private message?: string,
        private stackTrace?: unknown
    ){}
}

export {BaseException}