import {ResizableBox, ResizableBoxProps} from "react-resizable";
import "./resizable.css"
import {useEffect, useState} from "react";

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {

    let resizableProps: ResizableBoxProps;

    const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * 0.5);

    useEffect(() => {
        let timer: any;
        const listener = () => {

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                setWindowInnerWidth(window.innerWidth);
                setWindowInnerHeight(window.innerHeight);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width])

    if (direction==='horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width,
            resizeHandles: ['e'],
            maxConstraints: [windowInnerWidth*0.75, Infinity],
            minConstraints: [windowInnerWidth*0.2, Infinity],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        };
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, windowInnerHeight*0.9],
            minConstraints: [Infinity, windowInnerHeight*0.1]
        };
    }

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    );
};

export default Resizable;