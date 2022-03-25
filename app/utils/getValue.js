import CreditIcon from '../assets/images/pay.png';
import VisaIcon from '../assets/images/visa.png';
import MastercardIcon from '../assets/images/mastercard.png';

export const getCreditIcon = type => {
  if (type === 'mastercard') {
    return MastercardIcon;
  } else if (type === 'visa') {
    return VisaIcon;
  } else if (type === 'jcb') {
    return CreditIcon;
  }
  return CreditIcon;
};
