import React from "react";

export const AddAuthor = ({ onAdd }) => (
    <fieldset>
        <form onSubmit={onAdd}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" />
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input id="surname" name="surname" />
            </div>
            <button type="submit">Add</button>
        </form>
    </fieldset>
);

