import './App.css';
import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

const useLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <LoadingIndicator /> : null,
    () => setLoading(true), // Show the loading indicator
    () => setLoading(false), // Hide the loading indicator
  ];
};

export default function App() {
  const baseUrl = 'https://olgas-react-guest-list.herokuapp.com';
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
    const getList = async () => {
      showLoader();
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();

      setList(allGuests);
      setDisabled(false);
    };

    getList();
    hideLoader();
  });

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
    const createdGuest = await response.json();
    return createdGuest;
  }

  const handleSubmit = (event) => {
    newGuest();
    event.preventDefault();
  };

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      return deletedGuest;
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

      const updatedGuest = await response.json();
      return updatedGuest;
    }
    editGuest();
  }

  return (
    <>
      <section>
        <div>
          <h1>Enter guest name</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor={firstName}>
              First Name:
              <input
                placeholder="enter first name"
                onChange={(event) => setFirstName(event.currentTarget.value)}
                type="text"
                id="firstName"
                disabled={disabled ? true : false}
              />
            </label>
            <label htmlFor={lastName}>
              Last Name:
              <input
                placeholder="enter last name"
                onChange={(event) => setLastName(event.currentTarget.value)}
                type="text"
                id="lastName"
                disabled={disabled ? true : false}
              />
            </label>
            <button
              className="addGuestButton"
              disabled={disabled ? true : false}
            >
              Add guest
            </button>
          </form>
          {loader}
        </div>
      </section>

      <section className="listBackground">
        <div>
          <div>
            <h2 className="listHeader">List of Guests</h2>
            <hr className="hr3" />
            <table>
              <tbody>
                <tr className="extraMarginBottom">
                  <th className="thAlign">First Name</th>
                  <th className="thAlign">Last Name</th>
                  <th>Attending</th>
                  <th>Remove</th>
                </tr>

                {list.map((guest) => (
                  <tr key={guest.id}>
                    <td className="tdName">{guest.firstName}</td>
                    <td className="tdName">{guest.lastName}</td>
                    <td>
                      <button
                        className={
                          guest.attending
                            ? 'attendButtonConfirmed'
                            : 'attendButton'
                        }
                        type="button"
                        onClick={() => {
                          handleAttend(guest.id);
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
          </div>
        </div>
      </section>
    </>
  );
}
