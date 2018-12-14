import React from 'react'
import { View, Text, Input, Button, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import flatten from './shared/flatten'

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
          return (
            <TouchableHighlight
              key={index}
              onPress={() => this._removeTodo(todo)}
              underlayColor="transparent"
            >
              <Text key={index}>{todo}</Text>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }

  _removeTodo = async (todoId) => {
    const { firebase } = this.props

    const databaseDiffObj = {
      todos: {
        [todoId]: null,
      },
    }

    const databaseDiff = flatten(databaseDiffObj)

    // console.info('databaseDiff: ', databaseDiff)

    try {
      await firebase.update('/', databaseDiff)

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
