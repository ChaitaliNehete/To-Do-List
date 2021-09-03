import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
    return (
        <div className='item-list'>
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article key={id} className='item'>
                        <p className='title'>{title}</p>
                        <div>
                            <button className='edit-btn' type="button" onClick={() => editItem(id)}>
                                <FaEdit />
                            </button>
                            <button className='delete-btn' type="submit" onClick={() => removeItem(id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    );
};

export default List;