const obj_div = document.getElementById('obj_div');
const new_prop_button = document.getElementById('new_prop_button');
var properties = [];

function property(name, value, checker, label, separator, button, index) { // Object for the body's properties input
  // DOM elements:
  this.name = name;
  this.value = value;
  this.checker = checker;
  this.label = label;
  this.separator = separator;
  this.button = button;
  this.br = document.createElement('br');
  // This object's index in the properties[] array:
  this.index = index;
  // Reference to self so the button's callback can access the object's functions outside of its scope:
  const self = this;

  this.setAttributes = () => { // Set DOM elements
    this.name.type = 'text';
    this.name.placeholder = 'Attribute name';
    this.value.type = 'text';
    this.value.placeholder = 'Attribute value';
    this.checker.id = 'check_' + this.index;
    this.checker.type = 'checkbox';
    this.label.for = 'check_' + this.index;
    this.label.innerHTML = 'array';
    this.separator.id = 'separator_' + this.index;
    this.separator.style.visibility = 'collapse';
    this.separator.size = 1;
    this.separator.value = ',';
    this.button.innerHTML = 'remove';

    this.button.addEventListener('click', this.remove_prop);
    this.checker.addEventListener('change', () => {
      if(this.checker.checked) {
        this.separator.style.visibility = 'visible';}
      else {
        this.separator.style.visibility = 'collapse';
      }
    });
  };

  this.addToDocument = () => { // Append all its DOM elements to the document
    obj_div.appendChild(this.name);
    obj_div.appendChild(this.value);
    obj_div.appendChild(this.checker);
    obj_div.appendChild(this.label);
    obj_div.appendChild(this.separator);
    obj_div.appendChild(this.button);
    obj_div.appendChild(this.br);
  };

  this.removeFromDocument = () => { // Remove all its DOM elements from the document
    this.name.remove();
    this.value.remove();
    this.checker.remove();
    this.label.remove();
    this.button.remove();
    this.br.remove();
  };

  this.updateIndex = (index) => { // Set its own index
    this.index = index;
    this.checker.id = 'check_' + this.index;
    this.label.for = 'check_' + this.index;
  };

  this.remove_prop = () => { // Delete itself, removing DOM elements and references to this object
    self.removeFromDocument();
    for(let i = this.index + 1; i < properties.length; i++) {
      properties[i].updateIndex(properties[i].index - 1); // Update the index of every object after this in the properties[] array
    }
    properties.splice(this.index, 1); // Remove itself from properties[]
  };

}

function new_prop() {
  // Instantiate a new property object and add it to properties[]
  properties.push(new property(document.createElement('input'), document.createElement('input'),
                               document.createElement('input'), document.createElement('label'),
                               document.createElement('input'), document.createElement('button'),
                               properties.length));

  properties[properties.length - 1].setAttributes(); // Set DOM elements
  properties[properties.length - 1].addToDocument(); // Add DOM elements to document
}

new_prop_button.addEventListener('click', new_prop);

function generateObj() { // Create and return the object defined by this interface
  obj = {};

  properties.forEach((prop) => {
    if(prop.checker.checked) { // If this property is an array
      obj[prop.name.value] = prop.value.value.split(prop.separator.value); // Split the array values by given separator
    } else { // If this property is not an array
      obj[prop.name.value] = prop.value.value; // Just set property value
    }

  });

  return obj;
}

new_prop();
