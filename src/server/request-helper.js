class RequestHelper {
  getFoursquareRequestUrl(params) {
    params.v = '20190430';
    return this.getRequestUrl(params);
  }

  getGoogleRequestUrl(params, apiKey) {
    params.key = apiKey;
    return this.getRequestUrl(params);
  }

  getGoogleMapsScriptUrl(params, apiKey) {
    return `${params.requestPath}&key=${apiKey}`;
  }

  getRequestUrl(params) {
    let url = params.requestPath;
    delete params.requestPath;

    for (const key of Object.keys(params)) {
      const val = params[key];
      if (val) {
        url += `${key}=${val}&`;
      }
    }

    // delete last ampersand
    url = url.substring(0, url.length - 1);

    return url;
  }
}

module.exports = RequestHelper;
