import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This item is from context 2',
            rating: 5
        },
        {
            id: 3,
            text: 'This item is from context 3',
            rating: 8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const updateFeedback = (id, uptItem) => {
        setFeedback(
            feedback.map((item) => (
            item.id === id 
                ? {...item, ...uptItem } 
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

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((itm) => itm.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext