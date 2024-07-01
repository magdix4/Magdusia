import React, { useState, useEffect } from 'react';

export const AuthorsList = ({ authors = [], onDelete, onUpdate, onRefresh }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState({});
    const [newName, setNewName] = useState('');
    const [newSurname, setNewSurname] = useState('');

    const handleUpdateClick = (author) => {
        setSelectedAuthor(author);
        setNewName(author.name);
        setNewSurname(author.surname);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedAuthor({});
        setNewName('');
        setNewSurname('');
    };

    const handleUpdateSubmit = () => {
        if (newName && newSurname) {
            onUpdate(selectedAuthor.id, newName, newSurname);
            handleModalClose();
        }
    };

    useEffect(() => {
        console.log('Fetching authors...');
    }, [onRefresh]);

    return (
        <div>
            <div>
                <button className="refresh-btn" onClick={onRefresh}>Refresh Authors</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>{author.surname}</td>
                            <td className="actions">
                                <button onClick={() => onDelete(author.id)}>Delete</button>
                                <button onClick={() => handleUpdateClick(author)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>&times;</span>
                        <h2>Update Author</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <label>
                                Surname:
                                <input
                                    type="text"
                                    value={newSurname}
                                    onChange={(e) => setNewSurname(e.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <button type="submit" className="update-btn">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

