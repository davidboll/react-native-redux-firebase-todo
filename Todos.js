import React from 'react'
import { View, Text, Input, Button } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect(['todos', 'people'])
@connect((state) => {
  let todos = state.firebase.data.todos || {}
  let people = state.firebase.data.people || {}

  if (todos) {
    todos = Object.keys(todos)
  }

  if (people) {
    return { todos, people }
  }

  return { todos }
})
export default class Todos extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    names: PropTypes.object,
  }

  render() {
    return (
      <View style={{ marginTop: 50, padding: 25 }}>
        {this.props.todos.map((todo, index) => {
          return <Text key={index}>{todo}</Text>
        })}
      </View>
    )
  }
}
