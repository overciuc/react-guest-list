import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  //set state for guestList array
  const [list, setList] = useState([]);
  const baseUrl = 'http://localhost:5000';

  //fetch guest list from server, runs once
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setList(allGuests);
    };

    getList();
  }, []);

  // set state for input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  //when Submit button is clicked:
  const handleSubmit = (event) => {
    event.preventDefault();

    // create a new guest
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

    newGuest();
  };

  // set state for checkbox
  const [checkboxes, setCheckboxes] = useState({});

  const checkboxKeys = Object.keys(checkboxes);

  //when Delete button is clicked:
  function handleDelete() {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/1/${checkboxKeys}`, {
        method: 'DELETE',
      });
      //eslint-disable-next-line no-unused-vars
      const deletedGuest = await response.json();

      window.location.reload();
    }
    deleteGuest();
  }

  //when Edit button is clicked:
  function handleEdit(id) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/1/${checkboxKeys}`, {
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register the guest:</h1>
      </header>
      {/* Guest Name input fields */}
      <section className="bodyStyles">
        <form onSubmit={handleSubmit}>
          <label>
            <span>First name: </span>
          </label>
          <input
            type="text"
            id="firstName"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <br />
          <br />
          <label>Last name: </label>
          <input
            type="text"
            id="lastName"
            onChange={(event) => setLastName(event.target.value)}
          />
          <br />

          <p>
            <button>Submit</button>
          </p>
        </form>

        {/* Show the list of guests */}
        <h1 className="guestlist"> Guest list:</h1>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Attending</th>
            </tr>
            {list.map((item) => (
              <tr
                key={item.id}
                className={item.attending ? 'attending' : 'notAttending'}
              >
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={checkboxes[item.id]}
                    onChange={() => {
                      setCheckboxes({ ...checkboxes, [item.id]: true });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Confirm-Button */}
        <p>
          <label>
            <button
              type="button"
              onClick={(item) => handleEdit(item.id)}
              id="confirm"
            >
              Confirm guest attendance
            </button>
          </label>
        </p>

        {/* Delete-Button */}
        <p>
          <label>
            <button
              type="button"
              onClick={(item) => handleDelete(item.id)}
              id="delete"
            >
              Delete guest
            </button>
          </label>
        </p>
      </section>
    </div>
  );
}

export default App;
