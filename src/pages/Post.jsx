import {useParams} from 'react-router-dom'

function Post() {
    const { id, name} = useParams()

  return (
    <>
      <div>Post {id}</div>
      <div>Name {name}</div>
    </>
  )
}

export default Post