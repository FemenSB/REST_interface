const address_input = document.getElementById('address_input');
const method_select = document.getElementById('method_select');
const send_button = document.getElementById('send_button');
const res_div_area = document.getElementById('res_div_area');
var res_text = document.getElementById('res_div');

var body_obj = {};

function showData(data) {
  res_text.remove();
  res_text = document.createTextNode(JSON.stringify(data, undefined, 4));
  res_div_area.appendChild(res_text);
}

const methods = {
  GET: async () => {
    var response = await fetch(address_input.value);
    var data = await response.json();
    showData(data);
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
    showData(data);
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
    showData(data);
    console.log(myJson);
  },

  DELETE: async () => {
    var response = await fetch(address_input.value, {method: 'DELETE'});
    var myJson = await response.json();
    showData(data);
    console.log(myJson);
  }

};

send_button.addEventListener('click', (e) => {
  body_obj = generateObj();
  methods[method_select.value]();
});
