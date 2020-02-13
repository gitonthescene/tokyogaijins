// @flow
import React, { createContext, useContext, useRef, forwardRef } from 'react';
import type { Node, ComponentType, Ref } from 'react';

import MenuItem1 from '@material-ui/core/MenuItem';
const MenuItem0 = forwardRef<{children:Node,props?:PropertyDescriptor<any>},ComponentType<any>>(({children,...props}, ref: Ref<any>): Node => <option {...props}>{children}</option>);

export const NativeContext = createContext<boolean>(false);

// Ensure extra props don't contain these keys
type MenuItemProps = {
  ref: any
};
type MenuItemRest = $Rest<MenuItemProps,{}>;

var MenuItem = ({children,...props},ref: Ref<typeof MenuItem0|typeof MenuItem1>): Node => {
  const NATIVE = useContext( NativeContext );
  const mref= useRef();
  return NATIVE ? <MenuItem0 ref={mref} {...(props:MenuItemRest)}>{children}</MenuItem0> : <MenuItem1 ref={mref} {...(props:MenuItemRest)}>{children}</MenuItem1>;
}

MenuItem = forwardRef<{children:Node,props?:any},ComponentType<any>>(MenuItem)
export default MenuItem;
