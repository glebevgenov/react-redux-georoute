import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNewLocationName, appendLocation } from '../redux/actions';

class LocationName extends Component {

    handleKeyPress = (event) => {
        const { onEnter } = this.props;
        if (event.key === 'Enter') {
            onEnter();
        } 
    }

    render() {
        const { onInput,  name } = this.props;
        return (
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="название новой точки" 
                    onChange={onInput} 
                    onKeyPress={this.handleKeyPress}
                    value={name}
                />
            </div>
        );
    }
}

const mapStateToProps = state => state.route.newLocation;
const mapDispatchToProps = dispatch => ({
    onInput: (event) => { dispatch(setNewLocationName(event.target.value)) },
    onEnter: () => { dispatch(appendLocation()) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationName);