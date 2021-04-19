import { initData } from '../utils';

export default function RentsDataReducer(rentsData, action) {
  switch (action.type) {
    case 'from-date': {
      const { id, date } = action.payload;
      return rentsData.map((record, index) =>
        index === id ? { ...record, from: date } : record
      );
    }

    case 'to-date': {
      const { id, date } = action.payload;
      return rentsData.map((record, index) =>
        index === id ? { ...record, to: date } : record
      );
    }

    case 'price-per-day': {
      const { id, price } = action.payload;
      return rentsData.map((record, index) =>
        index === id ? { ...record, price_per_day: Number(price) } : record
      );
    }

    case 'cancel-changes': {
      return initData();
    }

    default:
      return rentsData;
  }
}