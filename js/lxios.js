const extractor = type => url => {
  let index = type === "resource" ? 3 : 4;
  return url.split("/")[index];
};

const logger = type => msg => {
  let t = ["warn", "error", "log"].includes(type) ? type : "log";
  console[t](msg);
};

const cerr = logger("error");

const resourceExtractor = extractor("resource");
const idExtractor = extractor("id");

const match = items => (id = null) => {
  if (!id) return [];
  if (!items || !items.length) return [];
  const matchingItem = items.find(item => item.id == id);
  return matchingItem || [];
};

const getResource = url => (id = null) => {
  const resource = resourceExtractor(url);
  const items = JSON.parse(localStorage.getItem(resource) || "[]");
  if (!id) return items;
  else {
    return match(items)(id);
  }
};

const storeResource = url => data => {
  const resource = resourceExtractor(url);
  return localStorage.setItem(resource, JSON.stringify(data));
};

const randomID = () => {
  return Math.ceil(Math.random() * 1000000 + 12);
};

class API {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  get(url) {
    const URL = this.baseURL + url;
    return getResource(URL)(idExtractor(URL));
  }

  post(url, { data }) {
    const URL = this.baseURL + url;
    const resources = getResource(URL)();
    const newData = {
      ...data,
      timestamp: new Date(),
      id: randomID()
    };
    const newResources = resources.concat(newData);
    try {
      storeResource(URL)(newResources);
      return newData;
    } catch (e) {
      cerr(e);
      return false;
    }
  }

  put(url, { data }) {
    const URL = this.baseURL + url;
    const getter = getResource(URL);
    const resource = getter(idExtractor(URL));
    if (!resource || !resource.id) {
      cerr("no resource found");
      return false;
    }
    const modifiedResource = { ...resource, ...data, modified: new Date() };
    const resources = getter();
    const newResources = resources.map(res => {
      if (res.id === modifiedResource.id) {
        return { ...modifiedResource };
      } else {
        return { ...res };
      }
    });
    try {
      storeResource(URL)(newResources);
      return modifiedResource;
    } catch (e) {
      cerr(e);
      return false;
    }
  }

  delete(url) {
    const URL = this.baseURL + url;
    const id = idExtractor(URL);
    const resources = getResource(URL)();
    const newResources = resources.filter(res => res.id != id);

    console.log({ id, resources, newResources });
    try {
      storeResource(URL)(newResources);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default API;
