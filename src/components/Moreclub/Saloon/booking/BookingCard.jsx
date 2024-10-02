import React from 'react'
import { Badge } from 'react-bootstrap'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

const BookingCard = ({ item }) => {
    const {id , slug}= useParams()
    const navigate = useNavigate()
  return (
      <tr
          className="text-dynamic-white clickable-row"
          onClick={() =>
              navigate(`/saloon/${id}/booking/${slug}/${item.id}/${item.appointment_id}`)
          }
      >
          <td className="text-white">#{item.appointment_id}</td>
          <td className="text-white">
              {moment(item.date).format("DD MMM YY")}<br />
              <span>
                  
                  {moment(item.start_time, 'HH:mm:ss').format('hh:mm A')} - {moment(item.end_time, 'HH:mm:ss').format('hh:mm A')}
              </span>
          </td>
          <td className="text-white">{item.fullname}</td>
          <td className="text-white text-center">{item.phone_number}</td>
      </tr>
  )
}

export default BookingCard