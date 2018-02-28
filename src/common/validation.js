const isHHMMFormat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const rules = {
  title(title) {
    if (!title) {
      return {
        error: `Validation Error`,
        errorMessage: `Поле title - обязательное текстовое поле`,
        fieldName: `title`,
      };
    }
    if (title.length <= 30 || title.ßlength >= 140) {
      return {
        error: `Validation Error`,
        errorMessage: `Заголовок должен быть в переделах 30 ... 140 символов`,
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

    if (![`flat`, `house`, `bungalo`, `palace`].includes(type)) {
      return {
        error: `Validation Error`,
        fieldName: `type`,
        errorMessage: `Поле type - должно быть значением одно из flat, house, bungalo, palace`
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

    if (price < 0 || price > 100000) {
      return {
        error: `Validation Error`,
        fieldName: `price`,
        errorMessage: `Поле price - число в интервале от 1 до 100 000`
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

    if (address.length > 100) {
      return {
        error: `Validation Error`,
        fieldName: `address`,
        errorMessage: `Поле address должно быть размером до 100 символов`
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

    if (!isHHMMFormat.test(time)) {
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

    if (!isHHMMFormat.test(time)) {
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

    if (rooms < 0 || rooms > 1000) {
      return {
        error: `Validation Error`,
        fieldName: `rooms`,
        errorMessage: `Поле rooms должно находиться в интервале от 0 до 1000`
      };
    }

    return false;
  },
  features(features) {
    if (features && features.length !== new Set(features).size) {
      return {
        error: `Validation Error`,
        fieldName: `features`,
        errorMessage: `Поле features должно состоять из неповторяющиеся значений`
      };
    }

    return false;
  },
};

module.exports = (data) => {
  const errors = [];
  const keys = Object.keys(data);

  keys.forEach((key) => {
    const rule = rules[key] && rules[key](data[key]);
    if (rule && rule.error) {
      errors.push(rule);
    }
  });

  return errors;
};
