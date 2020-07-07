new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: []
    }
  },
  created() {
    fetch('/api/todo', {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then((todos) => {
      this.todos = todos
    })
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) return null

      fetch('/api/todo', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      })
      .then(res => res.json())
      .then((todo) => {
        this.todos.push(todo)
        this.todoTitle = ''
      })
    },
    removeTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      })
      .then(res => res.json())
      .then((id) => {
        this.todos = this.todos.filter(t => t._id !== id)
      })
      
    },
    complateTodo(id) {
      fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      })
      .then(res => res.json())
      .then((todo) => {
        this.todos = this.todos.map(t => t._id === todo._id ? todo : t)
      })
    }
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value ,withTime) {
      const option = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }

      if(withTime) {
        option.hour = '2-digit',
        option.minute = '2-digit',
        option.second = '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', option)
        .format(new Date(value))
    }
  }
})