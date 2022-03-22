const address_input = document.getElementById('address_input');
const method_select = document.getElementById('method_select');
const send_button = document.getElementById('send_button');

var body_obj = {};

const methods = {
  GET: async () => {
    var response = await fetch(address_input.value);
    var data = await response.json();
    console.log(data);
  },

  POST: async () => {
    var response = await fetch(address_input.value, {
      method: 'POST',
      body: JSON.stringify(body_obj),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    var myJson = await response.json();
    console.log(myJson);
  },

  PUT: async () => {
    var response = await fetch(address_input.value, {
      method: 'PUT',
      body: JSON.stringify(body_obj),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    var myJson = await response.json();
    console.log(myJson);
  },

  DELETE: async () => {
    var response = await fetch(address_input.value, {method: 'DELETE'});
    var myJson = await response.json();
    console.log(myJson);
  }

};

send_button.addEventListener('click', (e) => {
  body_obj = generateObj();
  methods[method_select.value]();
});
