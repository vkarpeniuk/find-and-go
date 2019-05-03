class FoursquareRequestHelper {
  getRequestUrl(requestParams) {
    let url = `${requestParams.requestPath}?v=20190430&`;
    delete requestParams.requestPath;

    for (const key of Object.keys(requestParams)) {
      const val = requestParams[key];
      if (val) {
        url += `${key}=${val}&`;
      }
    }

    // delete last ampersand
    url = url.substring(0, url.length - 1);

    return url;
  }
}

module.exports = FoursquareRequestHelper;
