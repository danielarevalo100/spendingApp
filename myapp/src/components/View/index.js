import React, { Component } from 'react';

class View extends Component {

  static defaultProps = {
    hidden: false,
  }

  render() {
    const {
      hidden,
      backgroundImage,
      onClick,
      reference,
      id_reference,
      onscroll_reference
    } = this.props;

    if( hidden ) { return null; }

    const style = Object.assign({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }, this.props.style);

    if( backgroundImage ) {
      style['backgroundSize'] = 'cover'
      style['backgroundPosition'] = 'bottom';
      style['backgroundImage'] = 'url('+backgroundImage+')';
    }
    if( onClick != null ) {
      style['cursor'] = 'pointer';
    }
    return (
      <div className={this.props.className} style={style} onClick={onClick} ref={reference} id={id_reference} onScroll={onscroll_reference}>
        {this.props.children}
      </div>
    );
  }
}

export default View;
