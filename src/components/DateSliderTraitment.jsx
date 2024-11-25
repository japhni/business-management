import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import DateSlider from '../common/DateSlider';

const DateSliderTraitment = ({ customerEmployeeInfos}) => {

    const [filteredHistoricalUser, setFilteredHistoricalUser] = useState(customerEmployeeInfos);

    const filterHistoricalUser = (startDate, endDate) => {
        let filtered = customerEmployeeInfos
        if (startDate && endDate) {
            filtered = customerEmployeeInfos.filter((user) => {
                /*const bookingStartDate = parseISO(user.createdAt)
                const bookingEndDate = parseISO(user.checkOutDate)

                return bookingStartDate >= startDate
                    && bookingEndDate <= endDate
                    && bookingEndDate > startDate*/

                    const historyStartDate = parseISO(user.createdAt)
    
                    return historyStartDate >= startDate
            })
        }

        setFilteredHistoricalUser(filtered)
    }

    useEffect(() => {
        setFilteredHistoricalUser(customerEmployeeInfos)
    }, [customerEmployeeInfos])

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterHistoricalUser} onFilterChange={filterHistoricalUser} />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Price</th> 
                        <th>Payed</th>
                        <th>Temps</th>
                        <th>Employee_ID</th>
                        <th>Customer_ID</th>
                    </tr>
                </thead>

                <tbody className='text-center'>
                    {filteredHistoricalUser.map((userHistory, index)=>(
                        <tr key={userHistory.id}>
                            <td>{index + 1}</td>
                            <td>{userHistory.price}</td>
                            <td>{userHistory.payed}</td>
                            <td>{userHistory.createdAt}</td>
                            <td>{userHistory.employee_id}</td>
                            <td>{userHistory.customer_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterHistoricalUser.length === 0 && <p>Vous n'avez pas aucune historique</p>}
        </section>
    )
}

export default DateSliderTraitment