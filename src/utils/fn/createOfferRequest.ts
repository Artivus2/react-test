import { CreateOfferRequest } from '../../types/B2b.types';

export const requestBody = (
  chartId?: number,
  amount?: number,
  currencyId?: number,
  minLimit?: number,
  maxLimit?: number
) => {
  let request = {};
  if (chartId) request = { ...request, chartId }; //ID криптовалюты
  if (amount) request = { ...request, amount }; //fix  Сумма ордера (в криптовалюте) до ~250
  if (1) request = { ...request, course: 2 }; //fix Курс
  if (currencyId) request = { ...request, currencyId }; //fix Валюта (по умолчанию рубль)
  if (minLimit) request = { ...request, minLimit }; //Минимальное количество должно быть больше 500 руб
  if (maxLimit) request = { ...request, maxLimit };
  if (1) request = { ...request, duration: 1 }; //Время действия (в минутах)
  if (1) request = { ...request, payments: 1 }; //Тип оплаты
  return request as CreateOfferRequest;
};
