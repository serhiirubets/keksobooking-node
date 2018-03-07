const {validateRules} = require(`../common/config`);

const rules = {
  title(title) {
    if (!title) {
      return {
        error: `Validation Error`,
        errorMessage: `Поле title - обязательное текстовое поле`,
        fieldName: `title`,
      };
    }
    if (title.length <= validateRules.title.min || title.length >= validateRules.title.max) {
      return {
        error: `Validation Error`,
        errorMessage: `Заголовок должен быть в переделах ${validateRules.title.min} ... ${validateRules.title.max} символов`,
        fieldName: `title`,
      };
    }

    return {
      error: false
    };
  },
  type(type) {
    if (!type) {
      return {
        error: `Validation Error`,
        fieldName: `type`,
        errorMessage: `Поле type - обязательное текстовое поле`
      };
    }

    if (!validateRules.types.includes(type)) {
      return {
        error: `Validation Error`,
        fieldName: `type`,
        errorMessage: `Поле type - должно быть значением одно из ${validateRules.types.toString()}`
      };
    }

    return false;
  },
  price(price) {
    if (!price) {
      return {
        error: `Validation Error`,
        fieldName: `price`,
        errorMessage: `Поле price - обязательное числовое поле`
      };
    }

    if (price < validateRules.price.min || price > validateRules.price.max) {
      return {
        error: `Validation Error`,
        fieldName: `price`,
        errorMessage: `Поле price - число в интервале от ${validateRules.price.min} до ${validateRules.price.max}`
      };
    }

    return false;
  },
  address(address) {
    if (!address) {
      return {
        error: `Validation Error`,
        fieldName: `address`,
        errorMessage: `Поле address - обязательное текстовое поле`
      };
    }

    if (address.length > validateRules.address.max) {
      return {
        error: `Validation Error`,
        fieldName: `address`,
        errorMessage: `Поле address должно быть размером до ${validateRules.address.max} символов`
      };
    }

    return false;
  },
  checkin(time) {
    if (!time) {
      return {
        error: `Validation Error`,
        fieldName: `checkin`,
        errorMessage: `Поле checkin - обязательное текстовое поле`
      };
    }

    if (!validateRules.HHMMFormat.test(time)) {
      return {
        error: `Validation Error`,
        fieldName: `checkin`,
        errorMessage: `Поле checkin должно быть в формате HH:mm`
      };
    }

    return false;
  },
  checkout(time) {
    if (!time) {
      return {
        error: `Validation Error`,
        fieldName: `checkout`,
        errorMessage: `Поле checkout - обязательное текстовое поле`
      };
    }

    if (!validateRules.HHMMFormat.test(time)) {
      return {
        error: `Validation Error`,
        fieldName: `checkout`,
        errorMessage: `Поле checkout должно быть в формате HH:mm`
      };
    }

    return false;
  },
  rooms(rooms) {
    if (!rooms) {
      return {
        error: `Validation Error`,
        fieldName: `rooms`,
        errorMessage: `Поле rooms - числовое поле`
      };
    }

    if (rooms < validateRules.rooms.min || rooms > validateRules.rooms.max) {
      return {
        error: `Validation Error`,
        fieldName: `rooms`,
        errorMessage: `Поле rooms должно находиться в интервале от ${validateRules.rooms.min} до ${validateRules.rooms.max}`
      };
    }

    return false;
  },
  features(features) {
    if (features instanceof Array && features.length !== new Set(features).size) {
      return {
        error: `Validation Error`,
        fieldName: `features`,
        errorMessage: `Поле features должно состоять из неповторяющиеся значений`
      };
    }

    return false;
  },
};

const validateOfferKeys = (offer) => {
  const errors = [];
  const offerKeys = Object.keys(offer);

  for (let key of offerKeys) {
    const rule = rules[key] && rules[key](offer[key]);
    if (rule && rule.error) {
      errors.push(rule);
    }
  }

  return errors;
};

const validateLocation = (location) => {
  const errors = [];
  const addressRule = rules.address(location.toString());

  if (addressRule && addressRule.error) {
    errors.push(addressRule);
  }

  return errors;
};

module.exports = ({offer, location}) => {
  return [
    ...validateOfferKeys(offer),
    ...validateLocation(location)
  ];
};
