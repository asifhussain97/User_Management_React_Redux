import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed and configured
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { user } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  
  useEffect(() => {
    console.log("User data:", user);

    if (!user) {
      navigate('/login');
    }else if (user && user.nonAdminUsers) {
      // Filter users immediately on component mount or when user changes
      // image: user.image || "",

      filterUsers(searchTerm);
    }
  }, [user, navigate, searchTerm, showModal]);

  const filterUsers = (term) => {
    if (!term || term.trim() === "") {
      setFilteredUsers(user.nonAdminUsers);
    } else {
      const lowerCaseTerm = term.toLowerCase();
      console.log(lowerCaseTerm,'term');
      const filtered = user.nonAdminUsers.filter(u => {
        const nameMatch = u.name.toLowerCase().includes(lowerCaseTerm);
        const emailMatch = u.email.toLowerCase().includes(lowerCaseTerm);
        const mobileMatch = u.mobile.toString().includes(lowerCaseTerm)
        
        return nameMatch || emailMatch || mobileMatch;
      });
      setFilteredUsers(filtered);
    }
  };
  
  // Handle search term changes
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    filterUsers(value);
  };

  const handleEdit = (userId, name, email,mobile) => {
    console.log("Edit button clicked", userId);

    setEditableUser({ userId, name, email,mobile });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, name, email,mobile }= editableUser
    // Dispatch the editUser action with the current editableUser state
    dispatch(editUser({ userId, name, email,mobile })).then(() => {
      toast.success("Update successful");
      setShowModal(false); // Close the modal on successful update
    }).catch(error => {
      // Handle errors if needed
      toast.error("Update failed: " + error.message);
    });
  };

  return (
    <div className="container mt-4">
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <h3>Email: {user.email}</h3>
          <h3>Mobile: {user.mobile}</h3>
          {user.admin && (
            <div className="mt-5">
              <h3>Users:</h3>
              <div className="table-responsive">
                <input
                type="text"
                className="form-control mb-3"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers && filteredUsers.length > 0 ? (
                      filteredUsers.map((naUser, index) => (
                        <tr key={index}>
                          <td>{naUser.name}</td>
                          <td>{naUser.email}</td>
                          <td>{naUser.mobile}</td>
                          <td className="action-buttons">
                            <div className="table-button">
                              <button
                                // onClick={() => handleBlock(user._id, user.is_blocked)}
                                className="btn"
                              >
                                {naUser.is_blocked ? " Block" : "Unblock"}
                              </button>
                              <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                onClick={() =>
                                  handleEdit(naUser._id, naUser.name, naUser.email,naUser.mobile)
                                }
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={editableUser.name} onChange={e => setEditableUser({ ...editableUser, name: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label>Email:</label>
                        <input type="email" className="form-control" value={editableUser.email} onChange={e => setEditableUser({ ...editableUser, email: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label>Mobile:</label>
                        <input type="mobile" className="form-control" value={editableUser.mobile} onChange={e => setEditableUser({ ...editableUser, mobile: e.target.value })} />
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}

            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

         
    </div>
  );
}

export default Dashboard;
