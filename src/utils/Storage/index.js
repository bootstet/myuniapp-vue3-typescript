/**
 * @name: localstorage 本地储存设置过期时间
 */
class Storage {
  constructor (express) {
    this.express = express;
  }
  set(key, value, express) {
    let obj = {
      data: value,
      cTime: Date.now(),
      express: express || this.express
    };
    localStorage.setItem(key, JSON.stringify(obj));
  }
  get(key) {
    let item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    item = JSON.parse(item);
    let nowTime = Date.now();
    if (item.express && item.express < (nowTime - item.cTime)) {
      this.remove(key);
      return null;
    } else {
      return item.data;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear(){
    localStorage.clear();
  }
}

export default Storage;
