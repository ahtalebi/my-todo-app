// app/page.js
// This is your main app page
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [user, setUser] = useState(null)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load todos when user logs in
  useEffect(() => {
    if (user) {
      loadTodos()
    }
  }, [user])

  // Load todos from database
  async function loadTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error loading todos:', error)
    else setTodos(data)
  }

  // Sign up new user
  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert('Check your email to confirm your account!')
  }

  // Log in existing user
  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
  }

  // Log out
  async function signOut() {
    await supabase.auth.signOut()
  }

  // Add new todo
  async function addTodo() {
    if (!newTodo.trim()) return

    const { error } = await supabase
      .from('todos')
      .insert([{ task: newTodo, user_id: user.id }])

    if (error) console.error('Error adding todo:', error)
    else {
      setNewTodo('')
      loadTodos()
    }
  }

  // Toggle todo complete
  async function toggleTodo(id, is_complete) {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !is_complete })
      .eq('id', id)

    if (error) console.error('Error updating todo:', error)
    else loadTodos()
  }

  // Delete todo
  async function deleteTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) console.error('Error deleting todo:', error)
    else loadTodos()
  }

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">
            My Todo App 🚀 DEPLOY TEST
          </h1>
          
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="flex gap-2">
              <button
                onClick={signIn}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Log In
              </button>
              
              <button
                onClick={signUp}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If logged in, show todos
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              📝 My Todos
            </h1>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No todos yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <input
                    type="checkbox"
                    checked={todo.is_complete}
                    onChange={() => toggleTodo(todo.id, todo.is_complete)}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className={`flex-1 ${todo.is_complete ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.task}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
