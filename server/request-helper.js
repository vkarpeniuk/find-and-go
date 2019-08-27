class RequestHelper {
  getQueryParamsString(params) {
    let result = '';
    for (const key of Object.keys(params)) {
      const val = params[key];
      if (val) {
        result += `${key}=${val}&`;
      }
    }

    // delete last ampersand
    result = result.substring(0, result.length - 1);

    return result;
  }
}

module.exports = RequestHelper;
