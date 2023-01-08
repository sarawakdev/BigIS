import React, { FC, ReactNode } from 'react';

interface IVisibleProps {
	is: boolean;
	children: ReactNode;
}
const Visible: FC<IVisibleProps> = ({ is, children }) => {
	if (is) return <>{children}</>;
	return null;
};

export default Visible;
