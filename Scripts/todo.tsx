/// <reference path="../typings/global.d.ts" />

// https://facebook.github.io/react/

class Item {
    text: string;
}

interface IListProps {
    items: Item[];
}

interface ITodoState {
    text: string;
    items: Item[];
}

class TodoList extends React.Component<IListProps, {}> {
    createItem(item) {
        return (
            <li key={item.key}>{item.text}</li>
        );
    }
    render() {
        return (
            <ul>
                {this.props.items.map(this.createItem)}
            </ul>
        );
    }
}

class TodoApp extends React.Component<any, ITodoState> {

    public state = {
         text: "",
         items: [ { text: "Hello, world 1" }, { text: "Hello, world 2"} ]
    }

    constructor(props : any) {
       super(props);
     }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        var newItem = [{ text: this.state.text, id: Date.now() }];
        var nextItems = this.state.items.concat(newItem);
        var nextText = "";
        this.setState({ items: nextItems, text: nextText});
    }

    onChange(e: any) {
        this.setState({ text: e.target.value , items: this.state.items });
    }

    getStyle() {
        return {
            marging: "20px;",
            background : "lightgrey",
            padding: "5px"
        }
    }

    getPreviewStyle() {
        return {
            marginLeft: "10px"
        };
    }

    render() {
        return(
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items}/>
                <form onSubmit={ e => this.handleSubmit(e) } style={ this.getStyle() }>
                    <input onChange={ e => this.onChange(e) } value={this.state.text} />
                    <button>{ "Add #" + (this.state.items.length + 1)}</button>
                    <span style={ this.getPreviewStyle() }>{ this.state.text }</span>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById("react"));
