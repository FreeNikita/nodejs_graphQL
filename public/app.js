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
    const query = `
      query {
        getTodos {
          _id
          title
          done
          createdDate
          updateDate
        }
      }
    `

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({query})
    })
    .then(res => res.json())
    .then(({data : {getTodos}}) => {
      this.todos = getTodos
    })
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      console.log(title)
      if (!title) return null

    
      const query = `
        mutation {
          addTodo(todo: {title: "${title}"}){
            title
            _id
            done
            updateDate
            createdDate
          }
        }
      `

      fetch('/graphql', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(({data: {addTodo}}) => {
        this.todos.push(addTodo)
        this.todoTitle = ''
      })
    },
    removeTodo(id) {
      const query = `
        mutation {
          removeTodo(id: "${id}"){
            id
          }    
        }   
      `

      fetch('/graphql', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(({data: {removeTodo: {id}}}) => {
        this.todos = this.todos.filter(t => t._id !== id)
      })
    },
    complateTodo(id) {
      const query = `
        mutation {
          completeTodo(id: "${id}"){
            _id
            done
            title
            updateDate
            createdDate
          }
        }
      `

      fetch('/graphql', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(({data: {completeTodo: todo}}) => {
        console.log(todo)
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
        .format(new Date(+value))
    }
  }
})