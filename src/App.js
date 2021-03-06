import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {
    id = 3

    state = {
        input: '',
        todos: [
            { id: 0, text: 'react', checked: false },
            { id: 1, text: 'react', checked: true},
            { id: 2, text: 'react', checked: false }
        ],
        color: '#343a40'
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value /*input의 다음 바뀔 값 */
        });
    }

    handleCreate = () => {
        const { input, todos, color } = this.state;
        this.setState({
            input: '', /*input 비우기*/
            /*concat 사용해 배열에 추가*/
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false,
                color
            })
        });
    }

    handleKeyPress = (e) => {
    /*눌려진 키가 enter이면 handleCreate 호출*/
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const { todos } = this.state;
    /*파라미터로 받은 id를 통해 몇 번째 아이템인지 찾기*/
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; /*선택한 객체*/
        const nextTodos = [...todos]; /*배열을 복사*/

    /*기존의 값들 복사, checked 값 덮어쓰기*/
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    handleSelectColor = (color) => {
        this.setState({
            color
        })
    }

    render() {
        const { input, todos, color } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleSelectColor
        } = this;

        return (
                <TodoListTemplate form={(
                    <Form
                        value={input}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        onCreate={handleCreate}
                        color={color}
                    />
                )}
                    palette={(
                        <Palette colors={colors} selected={color} onSelect={handleSelectColor} />
                    )}>
                    <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                    </TodoListTemplate>
        );
    }
}

export default App;
