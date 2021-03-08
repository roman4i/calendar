// This module is a singletone (as I understand it)
export default class StaticStorage {
  static getInstance() {
    if (!StaticStorage.instance) {
      StaticStorage.instance = new StaticStorage();
    }
    return StaticStorage.instance;
  }

  getNames() {
    this._names = ['Igor', 'Oleg', 'Olga', 'Yaroslav', 'Anna'];
    return this._names;
  }

  getAdmins() {
    this._admins = ['Oleg', 'Olga'];
    return this._admins;
  }
}
