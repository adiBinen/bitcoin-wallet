import React from 'react';
import PropTypes from 'prop-types';
import './MovesList.css'

const MovesList = ({moves, title, isDetailsPage}) => {
    var movesList = moves.map(move => (
        <li key={move.at} className="move-item">
            <hr/>
            {!isDetailsPage && <p>To: {move.to}</p>}
            <p>At: {new Date(move.at).toLocaleString()}</p>
            <p>Amount: {move.amount} coins</p>
        </li>
    ))
    return (
        <section className="moves-list">
            <h3>{title}</h3>
            <ul>
                {movesList}
            </ul>
        </section>
    )
}

export default MovesList;

MovesList.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string
}
MovesList.defaultProps = {
    title: 'Your moves:'
}