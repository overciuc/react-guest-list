import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:5000';
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setList(allGuests);
    };

    getList();
  }, []);

  const handleSubmit = (event) => {
    newGuest();
    event.preventDefault();
  };

  async function newGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    //eslint-disable-next-line no-unused-vars
    const createdGuest = await response.json();

    window.location.reload();
  }

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      //eslint-disable-next-line no-unused-vars
      const deletedGuest = await response.json();

      window.location.reload();
    }
    deleteGuest();
  }

  function handleAttend(id) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      //eslint-disable-next-line no-unused-vars
      const updatedGuest = await response.json();

      window.location.reload();
    }
    editGuest();
  }

  function changeButtonColor() {
    document.getElementById(handleAttend).className = 'onClickChange';
  }

  return (
    <>
      <div>
        <h2>Enter guest name</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor={firstName}>First Name:</label>
          <input
            placeholder="enter first name"
            onChange={(event) => setFirstName(event.currentTarget.value)}
            type="text"
            id="firstName"
          ></input>
          <label htmlFor={lastName}>Last Name:</label>
          <input
            placeholder="enter last name"
            onChange={(event) => setLastName(event.currentTarget.value)}
            type="text"
            id="lastName"
          ></input>
          <button>Add guest</button>
        </form>
      </div>

      <div>
        <h2>List of Guests</h2>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Attending</th>
              <th>Remove Guest</th>
            </tr>

            {list.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>
                  <button
                    className="attendButton"
                    type="button"
                    onClick={() => {
                      handleAttend(guest.id);
                      changeButtonColor('green');
                    }}
                  >
                    &#10003;
                  </button>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    type="button"
                    onClick={() => handleDelete(guest.id)}
                    id="delete"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <label></label>
        </p>
      </div>
    </>
  );
}
