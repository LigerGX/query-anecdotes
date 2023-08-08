import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: (data) => {
      queryClient.setQueryData('anecdotes', oldData => {
        return oldData.map(anecdote => {
          if (anecdote.id === data.id) {
            return data
          }
          return anecdote
        })
      })
    }
  })

  const [notification, dispatchNotification] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    voteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatchNotification({ type: 'SET', payload: `Voted for "${anecdote.content}"` })
  }

  const res = useQuery('anecdotes', getAnecdotes, {retry: 1})

  if (res.isLoading) {
    return <div>Loading data...</div>
  } else if (res.isError) {
    return <div>Anecdote service is not available due to problems with the server</div>
  }

  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {notification && <Notification />}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
