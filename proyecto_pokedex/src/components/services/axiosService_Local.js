const STORAGE_KEY = "trainerAccounts";

const getRawData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const localCRUD = {
  getAccount: async () => {
    const data = getRawData();
    return Promise.resolve(data);
  },

  addAccount: async (newData) => {
    const db = getRawData();

    const lastId = db.length > 0 ? Math.max(...db.map(item => item.id)) : 0;
    const entity = { ...newData, id: lastId + 1 };

    db.push(entity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return Promise.resolve({ status: 201, data: entity });
  },

  updateAccount: async (id, updatedData) => {
    let db = getRawData();
    db = db.map(item => item.id === id ? { ...item, ...updatedData } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return Promise.resolve({ status: 200, data: updatedData });
  },

  deleteAccount: async (id) => {
    let db = getRawData();
    db = db.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return Promise.resolve({ status: 200 });
  }
};