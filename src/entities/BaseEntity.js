export default class BaseEntity
{
  _entityFields = {};
  _entityArrayFields = {};

  _originalValues = {};

  get isNew() {
    return 'id' in this && !this.id;
  }

  updateWith(newValues) {
    if (Object.prototype.toString.call(newValues) !== '[object Object]') {
      return false;
    }

    for (const [key, value] of Object.entries(newValues)) {
      if (!(key in this)) {
        continue;
      }

      if (Array.isArray(value) && key in this._entityArrayFields) {
        const cls = this._entityArrayFields[key];
        this[key] = value.filter(item => !!item).map(itemDetails => new cls(itemDetails));
      }
      else if (key in this._entityFields && !!value) {
        const cls = this._entityFields[key];
        this[key] = new cls(value);
      }
      else if (['created_at', 'updated_at', 'deleted_at'].includes(key) && !!value) {
        this[key] = new Date(value);
      }
      else {
        this[key] = value;
      }
    }

    if (Object.keys(this._originalValues)) {
      this._originalValues = newValues;
    }

    return true;
  }

  isChanged(property) {
    return property in this._originalValues && this._originalValues[property] != this[property];
  }

  toObject() {
    let data = JSON.parse(JSON.stringify(this, (key, value) => {
      if (key[0] === '_') {
        return undefined;
      }

      return value;
    }));

    Object.keys(data).forEach(key => {
      if (key === '_entityFields' || key === '_entityArrayFields' || key === '_originalValues') {
        delete data[key];
        return;
      }

      let value = data[key];
      let currentValue = this[key];

      if (currentValue instanceof BaseEntity) {
        value = currentValue.toObject();
      }
      else if (Array.isArray(value)) {
        let newValue = [];
        for (let i = 0; i < value.length; ++i) {
          const item = currentValue[i];
          if (item instanceof BaseEntity) {
            newValue.push(item.toObject());
          }
          else {
            newValue.push(value[i]);
          }
        }
        value = newValue;
      }

      if (key[0] === '_') {
        delete data[key];
        key = key.substring(1);
      }

      data[key] = value;
    });

    return data;
  }
}
