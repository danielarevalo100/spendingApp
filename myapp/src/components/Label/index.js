import React, { Component } from 'react';

class Label extends Component {

  static defaultProps = {
    fontSize: 1,
    fontStyle: 'regular',
    textAlign: 'center',
    color: '#1e1e1e',
    uppercase: false
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {
      children,
      fontSize,
      fontStyle,
      textAlign,
      color,
      uppercase,
      nowrap,
      onClick,
      animation,
      animationDelay,
      id_reference,
      className,
      italic
    } = this.props;

    const style = Object.assign({
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      fontSize: fontSize+'rem',
      // fontFamily: fontStyle == 'regular' ? 'Webfont-Light'+(italic ? '-Italic' : '') : fontStyle == 'bold' ? 'Webfont-Bold'+(italic ? '-Italic' : '') : 'Webfont-Light'+(italic ? '-Italic' : ''),
      textAlign: textAlign,
      color: color,
      maxWidth: '100%'
    }, this.props.style);

    if( uppercase && children != null && typeof children == 'string' ) {
      children = children.toUpperCase();
    }
    if( onClick != null ) {
      style['cursor'] = 'pointer';
    }
    if( nowrap == true ) {
      style['whiteSpace'] = 'nowrap';
    }

    return (
      <span id={id_reference} style={style} className={className} onClick={onClick} ref={(label) => { this.label = label; }} data-aos={animation} data-aos-delay={animationDelay}>{children}</span>
    );
  }
}

export default Label;
