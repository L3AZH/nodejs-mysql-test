exports.ErrorResponse = class ErrorResponse{
    constructor(code,data,success = false){
        this.code = code
        this.data = data
        this.success = success
    }
}