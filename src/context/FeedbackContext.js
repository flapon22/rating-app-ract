// import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsloading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsloading(false)
    }


    // Update feedback
    const updateFeedback = async (id, uptItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uptItem)
        })

        const data = await response.json()

        // ? {...item, ...uptItem } 
        setFeedback(
            feedback.map((item) => (
            item.id === id 
                ? {...item, ...data } 
                : item
            ))
        )
    }

    // Set item to be updated
    const editFeedback = (item, edit=true) => {
        setFeedbackEdit ({
            item,
            edit
        })
    }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            await fetch(`http://localhost:5000/feedback/${id}`, {
                method: 'DELETE'
            })

            setFeedback(feedback.filter((itm) => itm.id !== id))
        }
    }

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()
        setFeedback([data, ...feedback])


        // newFeedback.id = uuidv4()
        // setFeedback([newFeedback, ...feedback])
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        isLoading,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext