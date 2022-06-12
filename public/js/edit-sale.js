async function editFormHandler(event) {
  event.preventDefault();
  const picture = document.querySelector('#picture').value;
  const item_name = document.querySelector('#item_name').value;
  const price = document.querySelector('#price').value;
  const quantity = document.querySelector('#quantity').value;
  const status = document.querySelector('#is_sold:checked') ? true : false;
  const description = document.querySelector('#description').value;

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/profile/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      picture,
      item_name,
      price,
      quantity,
      status,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the dish was updated successfully.
  if (response.ok) {
    document.location.replace(`/api/profile/${id}`);
  } else {
    alert('Failed to edit Item');
  }

  const responseDelete = await fetch(`/api/profile/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      picture,
      item_name,
      price,
      quantity,
      status,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (responseDelete.ok) {
    document.location.delete(`/api/profile/${id}`);
  } else {
    alert('Failed to Delete Item');
  }
}


document
  .querySelector('.edit-item-form')
  .addEventListener('submit', editFormHandler);
