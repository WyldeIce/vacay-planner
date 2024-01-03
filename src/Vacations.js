import React from 'react'

const Vacations = ({vacations, places, cancelVacation}) => {
    return (
        <div>
            <h2>Vacations ({vacations.length})</h2>
            <ul>
                {
                    vacations.map((vacay) => {
                        const place = places.find((_place) => {return _place.id === vacay.place_id})
                        return (
                            <li key={vacay.id}>
                                {new Date(vacay.created_at).toLocaleString()} to {place.name}
                                <button onClick={() => {cancelVacation(vacay)}}>Cancel</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Vacations