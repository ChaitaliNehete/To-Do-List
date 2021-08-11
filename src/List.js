import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
    return (
        <div>
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article key={id}>
                        <p>{title}</p>
                        <button type="submit" onClick={() => editItem(id)}>
                            <FaEdit />
                        </button>
                        <button type="submit" onClick={() => removeItem(id)}>
                            <FaTrash />
                        </button>
                    </article>
                )
            })}
        </div>
    );
};

export default List;