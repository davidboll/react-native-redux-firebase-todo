import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, Button } from 'react-native'

import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import flatten from './shared/flatten'

@withFirebase
export default class AddTodo extends React.Component {
  state = {
    title: '',
  }

  render() {
    return (
      <View style={{ marginTop: 200 }}>
        <Text>Add ToDo</Text>
        <TextInput
          value={this.state.title}
          onChangeText={this._onChangeText}
          style={{ padding: 10, borderColor: 'grey', borderWidth: 1 }}
        />
        <Button title="Add ToDo" onPress={this._addTodo} />
      </View>
    )
  }

  _onChangeText = (title) => {
    this.setState({ title })
  }

  _addTodo = async () => {
    const { firebase } = this.props
    const { title } = this.state

    const todoId = firebase
      .database()
      .ref(`/todos/`)
      .push().key

    const databaseDiffObj = {
      todos: {
        [todoId]: {
          id: todoId,
          title: title,
          completed: false,
        },
      },
    }

    const databaseDiff = flatten(databaseDiffObj)

    console.info('databaseDiff: ', databaseDiff)

    try {
      await firebase.update('/', databaseDiff)

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }

    // this.setState({ text: '' })
  }
}
