import React from 'react';
import '../styles/ListItem.css';

class ListItem extends React.Component {
    render () {
        return (
            <div className="list-item" onClick={() => this.props.onClick(this.props.id)}>
                {this.createLogo()}
                <div className="list-item__text">
                    <h2 className="list-item__title">{this.props.title}</h2>
                    <p className="list-item__description">{this.props.description}</p>
                </div>
            </div>
        );
    }

    createLogo () {
        if (this.props.logo === undefined) {
            return (<iframe width="150" height="100" src={`https://www.youtube.com/embed/${this.props.id}`} frameborder="0" allowfullscreen/>);
        }
        else {
            return (<img className="list-item__logo" src={this.props.logo}/>);
        }
    }
}

export default ListItem;