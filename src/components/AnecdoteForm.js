import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useContext(NotificationContext)[1]
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.setQueryData('anecdotes', oldData => oldData.concat(data))
      notificationDispatch({ type: 'SET', payload: `"${data.content}" has been added`})
    },
    onError: (err) => {
      console.log(err.response.data.error)
      notificationDispatch({ type: 'SET', payload: err.response.data.error})
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    anecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
