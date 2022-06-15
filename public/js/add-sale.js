async function newFormHandler(event) {
    event.preventDefault();
  
    const picture = document.querySelector('#picture').value;
    const item_name = document.querySelector('#item-name').value;
    const price = document.querySelector('#price').value;
    const quantity = document.querySelector('#quantity').value;
    const status = document.querySelector('#is_sold:checked') ? true : false;
    const description = document.querySelector('#description').value;
    
    const response = await fetch(`/api/profile/:id`, {
      method: 'POST',
      body: JSON.stringify({
        picture,
        item_name,
        price,
        quantity,
        status,
        description
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add item');
    }
  }
  
  document
    .querySelector('.new-item-form')
    .addEventListener('submit', newFormHandler);
  