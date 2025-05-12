import React, { useContext, useEffect, useState } from 'react';
import '../../pages/admin/Admin.css';
import Table from 'react-bootstrap/Table';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import AddEvent from './AddEvent';
import { deleteEventAPI, getEventAPI, editEventAPI } from '../../services/allAPI';
import ServerURL from '../../services/server_url';
import { addEventContext, allEventCountContext } from '../../context/ContextAPI';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AllEvents() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditData(null);
    setSelectedImage(null);
  };

  const { showEventResponse } = useContext(addEventContext);
  const { setAllEventCount } = useContext(allEventCountContext);

  const [allEvents, setAllEvents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    eventname: '',
    place: '',
    date: '',
    time: '',
    price: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllEvent();
  }, [showEventResponse]);

  const getAllEvent = async () => {
    try {
      const result = await getEventAPI();
      if (result.data) {
        setAllEvents(result.data);
        setAllEventCount(result.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteEventAPI(id);
      if (result.status === 200) {
        getAllEvent();
        toast.error("Event Deleted!");
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const handleEdit = (event) => {
    setEditData(event);
    setUpdatedData({
      eventname: event.eventname,
      place: event.place,
      date: event.date,
      time: event.time,
      price: event.price
    });
    handleShow();
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("eventname", updatedData.eventname);
      formData.append("place", updatedData.place);
      formData.append("date", updatedData.date);
      formData.append("time", updatedData.time);
      formData.append("price", updatedData.price);
      if (selectedImage) {
        formData.append("eventimage", selectedImage);
      }

      const result = await editEventAPI(editData._id, formData);
      if (result.status === 200) {
        toast.success("Event Updated!");
        getAllEvent();
        handleClose();
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <>
      <div className='w-100'>
        <h2 className='thirdbg rounded-top thirdcoloradmin ps-3 fs-2 py-2'>All Events</h2>
        <div className='d-flex align-items-center justify-content-end px-5 my-4'>
          <AddEvent />
        </div>
        
        <div className='overflowscroll'>
          {allEvents.length > 0 ?
            <Table striped bordered hover className='w-100'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Image</th>
                  <th>Event Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allEvents.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td><img className='img-thumbnail fixed-img' src={`${ServerURL}/upload/${item?.eventimage}`} alt="" /></td>
                    <td>{item?.eventname}</td>
                    <td>{item?.place}</td>
                    <td>{item?.date}</td>
                    <td>{item?.time}</td>
                    <td>{item?.price}</td>
                    <td className='fs-3 pt-0'>
                      <TbEdit onClick={() => handleEdit(item)} className='text-secondary zoom-effect me-3' />
                      <MdDeleteForever onClick={() => handleDelete(item._id)} className='text-danger-emphasis zoom-effect' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            :
            <div className='text-center text-danger-emphasis fs-1'>Please Add Some Events!</div>
          }
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header className='primarybg' closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className='primarybg'>
          {editData &&
            <div className="row">
              <div className="col-lg-5 d-flex align-items-center justify-content-center">
                <label htmlFor='updateEventImage'>
                  <img
                    className='img-fluid w-75 rounded'
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : `${ServerURL}/upload/${editData.eventimage}`
                    }
                    alt="Event"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <input
                  id='updateEventImage'
                  type='file'
                  className='d-none'
                  onChange={handleImageChange}
                />
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className='my-1 form-control'
                  placeholder='Event name'
                  name="eventname"
                  value={updatedData.eventname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className='my-1 form-control'
                  placeholder='Place'
                  name="place"
                  value={updatedData.place}
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  className='my-1 form-control'
                  name="date"
                  value={updatedData.date}
                  onChange={handleInputChange}
                />
                <input
                  type="time"
                  className='my-1 form-control'
                  name="time"
                  value={updatedData.time}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className='my-1 form-control'
                  placeholder='Price'
                  name="price"
                  value={updatedData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          }
        </Modal.Body>
        <Modal.Footer className='primarybg'>
          <Button variant="secondary border border-0" onClick={handleClose}>Close</Button>
          <Button className='addbtn bookingbutton' onClick={handleUpdate}>Update Event</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllEvents;
