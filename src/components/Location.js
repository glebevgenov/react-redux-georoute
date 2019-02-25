import React, { Component } from 'react';
import { connect } from 'react-redux';
import Octicon, { Grabber, X } from '@githubprimer/octicons-react';
import { removeLocation, moveLocation } from '../redux/actions';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import './Location.css';

class Location extends Component {
    render = () => {
        const { id, name, onRemove, connectDropTarget, connectDragSource, connectDragPreview } = this.props;

        return connectDropTarget(connectDragPreview(
            <li className="d-flex flex-row list-group-item">
                {connectDragSource(<span className="Location__grabber align-self-center mr-3">
                    <Octicon verticalAlign='middle' icon={Grabber} />
                </span>)}
                <div className="flex-grow-1 mr-3">{name}</div>
                <button type="button" className="close" aria-label="Close" onClick={() => onRemove(id)}>
                    <span><Octicon verticalAlign='middle' icon={X} /></span>
                </button>
            </li>
        ));

    }

}

const DRAG_TYPE = 'location';

const dragSource = {
    beginDrag(props) {
        return {
            id: props.id,
            onMove: props.onMove,
        };
    }
};

const dropTarget = {
	hover(props, monitor, component) {
        const { id: dragId, onMove } = monitor.getItem();
        const { id: hoverId } = props;

		if (dragId === hoverId) {
			return;
        }

        const dragTop = monitor.getInitialSourceClientOffset();
		const { top: hoverTop, bottom: hoverBottom } = findDOMNode(component).getBoundingClientRect();

		const hoverMiddleY = (hoverBottom - hoverTop) / 2;
		const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverTop;

		// Dragging downwards
		if (dragTop < hoverTop && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragTop > hoverTop && hoverClientY > hoverMiddleY) {
			return;
        }

        onMove(dragId, hoverId);
	},
}

const mapStateToProps = (state, ownProps) => state.route.locationList[ownProps.id];
const mapDispatchToProps = dispatch => ({
    onRemove: (id) => { 
        dispatch(removeLocation(id)); 
    },
    onMove: (dragId, hoverId) => { 
        dispatch(moveLocation(dragId, hoverId));
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget(DRAG_TYPE, dropTarget, connect => ({ 
        connectDropTarget: connect.dropTarget()
    })),
    DragSource(DRAG_TYPE, dragSource, connect => ({ 
        connectDragSource: connect.dragSource(), 
        connectDragPreview: connect.dragPreview(),
    }))
)(Location);