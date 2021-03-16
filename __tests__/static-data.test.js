import StaticStorage from '../src/static-data';

const dataStorage = StaticStorage.getInstance();

describe('Static data storage tests', () => {
  it('Name list getting', () => {
    expect(dataStorage.getNames()).toEqual(['Igor', 'Oleg', 'Olga', 'Yaroslav', 'Anna']);
  });
  it('Name list getting is undefined', () => {
    expect(dataStorage.getNames()).not.toEqual(undefined);
  });
  it('Admins list data storage (Oleg, Olga)', () => {
    expect(dataStorage.getAdmins()).toEqual(['Oleg', 'Olga']);
  });
  it('Admins list data storage is not empty (Oleg, Olga)', () => {
    expect(dataStorage.getAdmins()).not.toEqual(undefined);
  });
  it('Is it singletone?', () => {
    class Reserve extends StaticStorage {
      getAdress() {
        return 'done';
      }
    }
    expect(Reserve.getInstance()).toEqual(StaticStorage.getInstance());
  });
});
