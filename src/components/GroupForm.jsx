import { useState } from "react";

const GroupForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);

  const handleAddMember = () => {
    if (memberInput.trim()) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, members });
    setName("");
    setDescription("");
    setMembers([]);
    setMemberInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 bg-light rounded shadow mt-4"
    >
      <h3 className="text-center mb-4 text-primary">Create a Group</h3>

      <div className="mb-3">
        <label className="form-label">Group Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add member (username or email)"
          value={memberInput}
          onChange={(e) => setMemberInput(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddMember}
        >
          Add
        </button>
      </div>

      {members.length > 0 && (
        <ul className="list-group mb-3">
          {members.map((member, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {member}
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleRemoveMember(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Create Group
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
