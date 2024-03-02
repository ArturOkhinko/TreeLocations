class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
    }
  
    static BedRequest(message, errors = []) {
      return new ApiError(400, message, errors);
    }
    static BDError(errors = []) {
      return new ApiError(500, "Ошибка подключения к базе данных", errors);
    }
  }
  
  module.exports = ApiError;
  