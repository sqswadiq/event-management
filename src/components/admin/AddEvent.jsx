import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addEventAPI } from '../../services/allAPI';
import { toast } from 'react-toastify';
import { addEventContext } from '../../context/ContextAPI';


function AddEvent() {
    // addresponse
    const { setShowEventResponse } = useContext(addEventContext)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setpreview("")
        setShow(false)
        setEventData({
            eventname: "",
            place: "",
            date: "",
            time: "",
            price: "",
            eventimage: "" 
        })
    };
    const handleShow = () => setShow(true);

    const [eventData, setEventData] = useState({
        eventname: "",
        place: "",
        date: "",
        time: "",
        price: "",
        eventimage: ""
    })
    console.log(eventData, "added event");



    //  preview on modal
    const [preview, setpreview] = useState("")

    useEffect(() => {
        if (eventData.eventimage) {
            setpreview(URL.createObjectURL(eventData.eventimage))

        }

    }, [eventData.eventimage])

    const handleAddEvent = async () => {
        const { eventname, place, date, time, price, eventimage } = eventData

        if (eventname && place && date && time && price && eventimage) {

            // reqbody

            const reqBody = new FormData()
            reqBody.append("eventname", eventname)
            reqBody.append("place", place)
            reqBody.append("date", date)
            reqBody.append("time", time)
            reqBody.append("price", price)
            reqBody.append("eventimage", eventimage)

            // reqheader
            const reqheader = { "Content-Type": "multipart/form-data" }

            // api call
            try {
                const result = await addEventAPI(reqBody, reqheader)
                console.log(result, "inside try result");
                if (result.status == 200) {
                    toast.success("Event Added Successfully")
                    setShowEventResponse(result.data)
                    handleClose()
                }
            } catch (error) {
                console.log(error);

            }
        } else {
            toast.warning("Please Complete All Fields")
        }
    }

    return (
        <>
            <Button className='bookingbutton' onClick={handleShow}>
                Add Events +
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='primarybg' closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body className='primarybg'>
                    <div className="row">
                        <div className="col-lg-5 d-flex align-items-center justify-content-center">
                            <div>
                                <label htmlFor='eventimage'>
                                    <img className='img-fluid w-75 rounded' src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/026/631/445/non_2x/add-photo-icon-symbol-design-illustration-vector.jpg"} />
                                </label>
                                <input onChange={(e) => setEventData({ ...eventData, eventimage: e.target.files[0] })} id='eventimage' type="file" className='d-none' />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <input onChange={(e) => setEventData({ ...eventData, eventname: e.target.value })} type="text" className='my-1 form-control' placeholder='Event name' />
                            <input onChange={(e) => setEventData({ ...eventData, place: e.target.value })} type="text" className='my-1 form-control' placeholder='Place' />
                            <input onChange={(e) => setEventData({ ...eventData, date: e.target.value })} type="date" className='my-1 form-control' />

                            <input onChange={(e) => setEventData({ ...eventData, time: e.target.value })} type="time" className='my-1 form-control' />

                            <input onChange={(e) => setEventData({ ...eventData, price: e.target.value })} type="text" className='my-1 form-control' placeholder='Price' />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='primarybg'>
                    <Button variant="secondary border border-0" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className='addbtn bookingbutton' onClick={handleAddEvent}>Add Events</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddEvent